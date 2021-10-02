package org.acasictf.ctf.operator.service

import com.google.protobuf.Empty
import com.google.protobuf.Timestamp
import io.fabric8.kubernetes.client.KubernetesClient
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.withContext
import org.acasictf.ctf.operator.*
import org.acasictf.ctf.operator.abstractions.PersistenceLayer
import org.acasictf.ctf.operator.model.Kubernetes
import org.acasictf.ctf.operator.model.kubernetes.v1alpha1.EnvTemplate
import org.acasictf.ctf.operator.model.kubernetes.v1alpha1.EnvTemplateList
import org.acasictf.ctf.operator.persistence.EnvironmentDao
import org.acasictf.ctf.operator.persistence.ZipChallengeTemplate
import org.acasictf.ctf.operator.provisioner.kubernetes.KubernetesProvisioner
import org.acasictf.ctf.proto.Common
import org.acasictf.ctf.proto.Ctfoperator.*
import org.acasictf.ctf.proto.CtfoperatorInternal.ProvisionerType
import org.acasictf.ctf.proto.EnvironmentProvisioningServiceGrpcKt
import java.io.File
import java.io.File.createTempFile
import java.time.Instant
import java.util.*
import org.acasictf.ctf.proto.CtfoperatorInternal.Environment as EnvironmentProto

class ProvisioningService(
    private val kube: KubernetesClient,
    private val persistenceLayer: PersistenceLayer
) : EnvironmentProvisioningServiceGrpcKt.
EnvironmentProvisioningServiceCoroutineImplBase() {
    private val envDao = EnvironmentDao(persistenceLayer.database())
    private val envTemplateClient = kube.resources(EnvTemplate::class.java, EnvTemplateList::class.java)

    override suspend fun startEnvironment(request: StartEnvironmentRequest):
            StartEnvironmentResponse = managed {
        val envIdStr = UUID.randomUUID().toString()
        val envId = Common.UUID.newBuilder().apply {
            contents = envIdStr
        }.build()
        val now = Instant.now()
        val ts = Timestamp.newBuilder().apply {
            seconds = now.epochSecond
            nanos = now.nano
        }.build()

        val env = EnvironmentProto.newBuilder().apply {
            createdTime = ts
            lastPingTime = ts
            provisionerDone = false
            provisionerType = ProvisionerType.KUBERNETES
            ownerId = request.challengeOwner
            challengeSetId = request.challengeSetId
            challengeId = request.challengeId
        }.build()

        envDao.set(envId, env)

        val failureResponse = StartEnvironmentResponse
            .newBuilder().apply {
                // TODO: Add reason.
                failureBuilder.apply {}
            }.build()

        val ct = try {
            persistenceLayer.createChallengeTemplate(
                request.challengeSetId.contents
            ).apply {
                init()
            }
        } catch (e: Exception) {
            return@managed failureResponse
        }

        // Check whether we have the correct challenge, if not throw a failure response.
        val c = ct.challenges.firstOrNull {
            it.id == request.challengeId.contents
        } ?: return@managed failureResponse

        val prov = KubernetesProvisioner(envIdStr, kube)
        try {
            prov.provision(c)
        } catch (e: Exception) {
            logger.error("Failed to provision resources for $envIdStr", e)
            return@managed failureResponse
        }

        return@managed StartEnvironmentResponse.newBuilder().apply {
            successBuilder.apply {
                environmentIdBuilder.apply {
                    contents = envIdStr
                }
            }
        }.build()
    }

    override suspend fun stopEnvironment(request: StopEnvironmentRequest)
            : StopEnvironmentResponse = managed {
        TODO("Not implemented")
    }

    override suspend fun uploadEnvironmentTemplate(request: UploadEnvironmentTemplateRequest)
            : Empty = managed {
        val (tempFile, challengeTemplate) = withContext(Dispatchers.IO) {
            val tempFile = createTempFile("ctf", ".zip")
            tempFile.writeBytes(request.envZip.toByteArray())
            Pair(tempFile, ZipChallengeTemplate(tempFile))
        }
        challengeTemplate.init()

        val id = challengeTemplate.challengeSet.id

        tempFile.delete()

        val challengeZipFile = File(getChallengesDir(), "$id.zip")
        challengeZipFile.createNewFile()
        challengeZipFile.writeBytes(request.envZip.toByteArray())

        val templates = challengeTemplate.challenges.map {
            val kubernetesJson = challengeTemplate.readChallengeJson(
                it.slug,
                "kubernetes.json",
                Kubernetes.serializer()
            )!!
            if (kubernetesJson.templateCRDVersion != "v1alpha1") {
                throw Exception("Unsupported CRD version")
            }

            val templateYamlIs = challengeTemplate.readChallengeFile(
                it.slug,
                kubernetesJson.templatePath
            ).getInputStream()

            envTemplateClient.load(templateYamlIs).get().apply {
                metadata.name = it.id
                metadata.namespace = kubeNamespace
            }
        }
        templates.forEach { envTemplateClient.dryRun(true).create(it) }
        templates.forEach { envTemplateClient.dryRun(false).create(it) }

        logger.info("New challenge template uploaded: $challengeZipFile")

        empty()
    }
}

package org.acasictf.ctf.operator.service

import com.google.protobuf.Empty
import com.google.protobuf.Timestamp
import io.fabric8.kubernetes.api.model.*
import io.fabric8.kubernetes.client.KubernetesClient
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.withContext
import kotlinx.serialization.json.Json
import org.acasictf.ctf.operator.*
import org.acasictf.ctf.operator.model.Kubernetes
import org.acasictf.ctf.operator.persistence.ChallengeTemplate
import org.acasictf.ctf.operator.persistence.EnvironmentDao
import org.acasictf.ctf.proto.Common
import org.acasictf.ctf.proto.Ctfoperator
import org.acasictf.ctf.proto.CtfoperatorInternal
import org.acasictf.ctf.proto.EnvironmentProvisioningServiceGrpcKt
import java.io.File
import java.io.File.createTempFile
import java.time.Instant
import java.util.*

class ProvisioningService(private val envDao: EnvironmentDao, private val kube: KubernetesClient)
    : EnvironmentProvisioningServiceGrpcKt.
EnvironmentProvisioningServiceCoroutineImplBase() {
    private val json = Json {
        ignoreUnknownKeys = true
    }

    override suspend fun startEnvironment(request: Ctfoperator.StartEnvironmentRequest): Ctfoperator.StartEnvironmentResponse = managed {
        val envIdStr = UUID.randomUUID().toString()
        val envId = Common.UUID.newBuilder().apply {
            contents = envIdStr
        }.build()
        val now = Instant.now()
        val ts = Timestamp.newBuilder().apply {
            seconds = now.epochSecond
            nanos = now.nano
        }.build()

        val env = CtfoperatorInternal.Environment.newBuilder().apply {
            createdTime = ts
            lastPingTime = ts
            provisionerDone = false
            provisionerType = CtfoperatorInternal.ProvisionerType.KUBERNETES
            ownerId = request.challengeOwner
            challengeSetId = request.challengeSetId
            challengeId = request.challengeId
        }.build()

        envDao.set(envId, env)

        val failureResponse = Ctfoperator.StartEnvironmentResponse
                .newBuilder().apply {
                    // TODO: Add reason.
                    failureBuilder.apply {}
                }.build()

        val ctFile = File(getChallengesDir()).resolve("${request.challengeSetId.contents}.zip")
        if (!ctFile.exists()) {
            return@managed failureResponse
        }

        val ct = ChallengeTemplate(json, ctFile)

        // Check whether we have the correct challenge, if not throw a failure response.
        val c = ct.challenges.firstOrNull {
            it.id == request.challengeId.contents
        } ?: return@managed failureResponse

        // TODO: Assuming it's Kubernetes... Pull this out into reconcile loop.
        val provisioner = ct.readChallengeJson(c, "kubernetes.json", Kubernetes.serializer())
                ?: return@managed failureResponse

        // TODO: Validate all manifests prior to creation.

        provisioner.manifests.pods.forEachIndexed { i, it ->
            val podFile = ct.readChallengeFile(c, it)
            val pod = kube.pods().inNamespace(kubeNamespace).load(podFile.getInputStream()).get()
            val isPenimage = pod.metadata?.name == "penimage"
            if (pod.metadata == null) {
                pod.metadata = ObjectMeta()
            }
            if (pod.metadata.labels == null) {
                pod.metadata.labels = mutableMapOf()
            }
            pod.metadata.name = "ctf-$envIdStr-$i"
            pod.metadata.namespace = kubeNamespace
            pod.metadata.labels["ctf-env-id"] = envIdStr

            // TODO: Inject public key for penimage
            if (isPenimage) {
                if (pod.spec != null && pod.spec.containers != null) {
                    val publicKeyFile = File("/secrets/auth-key-public/id_rsa.pub")
                    val publicKey = if (publicKeyFile.exists()) {
                        publicKeyFile.readText()
                    } else {
                        logger.warn("Failed to find public key secret")
                        ""
                    }
                    val envVar = EnvVar().apply {
                        name = "PUBLIC_KEY"
                        value = publicKey
                    }
                    pod.spec.containers.forEach {
                        if (it.env == null) {
                            it.env = mutableListOf()
                        }
                        it.env.add(envVar)
                    }
                }
            }

            kube.pods().inNamespace(kubeNamespace).create(pod)
        }

        return@managed Ctfoperator.StartEnvironmentResponse.newBuilder().apply {
            successBuilder.apply {
                environmentIdBuilder.apply {
                    contents = envIdStr
                }
            }
        }.build()
    }

    override suspend fun stopEnvironment(request: Ctfoperator.StopEnvironmentRequest): Ctfoperator.StopEnvironmentResponse = managed {
        envDao.get(request.environmentId)
                ?: throw Exception("Missing environment")
        val envIdStr = request.environmentId.contents

        val listOptions = ListOptions().apply {
            labelSelector = "ctf-env-id=$envIdStr"
        }
        val pods = kube.pods().inNamespace(kubeNamespace).list(listOptions)

        logger.info("Deleting ${pods.items.size} pods for environment $envIdStr")
        kube.pods().inNamespace(kubeNamespace).delete(pods.items)

        logger.info("Deleting persistent environment $envIdStr")
        envDao.remove(request.environmentId)

        return@managed Ctfoperator.StopEnvironmentResponse.newBuilder().apply {
        }.build()
    }

    override suspend fun uploadEnvironmentTemplate(request: Ctfoperator.UploadEnvironmentTemplateRequest): Empty = managed {
        val (tempFile, challengeTemplate) = withContext(Dispatchers.IO) {
            val tempFile = createTempFile("ctf", ".zip")
            tempFile.writeBytes(request.envZip.toByteArray())
            Pair(tempFile, ChallengeTemplate(json, tempFile))
        }

        val id = challengeTemplate.challengeSet.id

        tempFile.delete()

        val challengeZipFile = File(getChallengesDir(), "$id.zip")
        challengeZipFile.createNewFile()
        challengeZipFile.writeBytes(request.envZip.toByteArray())

        logger.info("New challenge template uploaded: $challengeZipFile")

        empty()
    }
}

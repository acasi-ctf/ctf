package org.acasictf.ctf.operator.service

import com.google.protobuf.Empty
import com.google.protobuf.Timestamp
import io.fabric8.kubernetes.api.model.*
import io.fabric8.kubernetes.client.KubernetesClient
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.withContext
import kotlinx.serialization.json.Json
import org.acasictf.ctf.operator.*
import org.acasictf.ctf.operator.model.ChallengeSet
import org.acasictf.ctf.operator.persistence.ChallengeTemplate
import org.acasictf.ctf.operator.persistence.EnvironmentDao
import org.acasictf.ctf.proto.Common
import org.acasictf.ctf.proto.Ctfoperator
import org.acasictf.ctf.proto.CtfoperatorInternal
import org.acasictf.ctf.proto.EnvironmentProvisioningServiceGrpcKt
import java.io.File
import java.io.File.createTempFile
import java.nio.charset.StandardCharsets
import java.time.Instant
import java.util.*
import java.util.zip.ZipFile

class ProvisioningService(private val envDao: EnvironmentDao, private val kube: KubernetesClient)
    : EnvironmentProvisioningServiceGrpcKt.
EnvironmentProvisioningServiceCoroutineImplBase() {
    private val json = Json {
        ignoreUnknownKeys = true
    }

    override suspend fun startEnvironment(request: Ctfoperator.StartEnvironmentRequest): Ctfoperator.StartEnvironmentResponse {
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
        }.build()

        envDao.set(envId, env)

        val publicKey = File("/secrets/auth-key-public/id_rsa.pub").readText()

        val pod = Pod()
        pod.apply {
            metadata = ObjectMeta()
            metadata.name = "ctf-penimage-$envIdStr"

            metadata.labels = mutableMapOf()
            metadata.labels["ctf-env-id"] = envIdStr
            metadata.labels["ctf-env-label"] = "penimage"

            val container = Container().apply {
                name = "penimage"
                image = "ghcr.io/acasi-ctf/ctf/penimage:latest"
                imagePullPolicy = "Always"

                setEnv(mutableListOf())
                getEnv().add(EnvVar().apply {
                    name = "PUBLIC_KEY"
                    value = publicKey
                })
            }

            spec = PodSpec()
            spec.containers.add(container)
        }

        kube.pods().create(pod)

        return Ctfoperator.StartEnvironmentResponse.newBuilder().apply {
            successBuilder.apply {
                environmentIdBuilder.apply {
                    contents = envIdStr
                }
            }
        }.build()
    }

    override suspend fun uploadEnvironmentTemplate(request: Ctfoperator.UploadEnvironmentTemplateRequest): Empty = managed {
        val (tempFile, challengeTemplate) = withContext(Dispatchers.IO) {
            val tempFile = createTempFile("ctf", ".zip")
            tempFile.writeBytes(request.envZip.toByteArray())
            Pair(tempFile, ChallengeTemplate(json, tempFile))
        }

        val slug = challengeTemplate.challengeSet.slug

        tempFile.delete()

        val challengeZipFile = File(createDir("${getDataDir()}/challenges"), "$slug.zip")
        challengeZipFile.createNewFile()
        challengeZipFile.writeBytes(request.envZip.toByteArray())

        logger.info("New challenge template uploaded: $challengeZipFile")

        empty()
    }
}

package org.acasictf.ctf.operator.service

import io.fabric8.kubernetes.api.model.ListOptions
import io.fabric8.kubernetes.client.KubernetesClient
import org.acasictf.ctf.operator.kubeNamespace
import org.acasictf.ctf.operator.persistence.EnvironmentDao
import org.acasictf.ctf.proto.Ctfoperator
import org.acasictf.ctf.proto.EnvironmentLookupServiceGrpcKt

class LookupService(
    private val envDao: EnvironmentDao,
    private val kube: KubernetesClient
) : EnvironmentLookupServiceGrpcKt.
EnvironmentLookupServiceCoroutineImplBase() {
    override suspend fun getEnvironmentInfo(request: Ctfoperator.GetEnvironmentInfoRequest): Ctfoperator.GetEnvironmentInfoResponse {
        val envIdStr = request.environmentId.contents

        val listOptions = ListOptions().apply {
            // TODO: labelSelector assumes penimage env label
            labelSelector = "ctf-env-id=$envIdStr,ctf-env-label=penimage"
        }
        val pods = kube.pods().inNamespace(kubeNamespace).list(listOptions)

        if (pods.items.size == 0) {
            // TODO: Improve error handling
            throw Exception("Could not get info")
        }
        val pod = pods.items[0]

        return Ctfoperator.GetEnvironmentInfoResponse.newBuilder().apply {
            sshHost = pod.status.podIP
            sshPort = 22
        }.build()
    }

    override suspend fun listUserEnvironments(request: Ctfoperator.ListUserEnvironmentsRequest): Ctfoperator.ListUserEnvironmentsResponse {
        val environments = envDao.list().filterValues {
            it.ownerId.contents == request.userId.contents
        }.map {
            Ctfoperator.UserEnvironmentInfo.newBuilder().apply {
                val key = it.key
                val env = it.value
                envId = key
                challengeSetId = env.challengeSetId
                challengeId = env.challengeId
            }.build()
        }

        return Ctfoperator.ListUserEnvironmentsResponse.newBuilder().apply {
            addAllEnvironments(environments)
        }.build()
    }
}

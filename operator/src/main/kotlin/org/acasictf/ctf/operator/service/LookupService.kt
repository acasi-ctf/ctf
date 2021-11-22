package org.acasictf.ctf.operator.service

import io.fabric8.kubernetes.api.model.ListOptions
import io.fabric8.kubernetes.client.KubernetesClient
import org.acasictf.ctf.operator.ctfEnvIdKey
import org.acasictf.ctf.operator.ctfExposeKey
import org.acasictf.ctf.operator.kubeNamespace
import org.acasictf.ctf.operator.managed
import org.acasictf.ctf.operator.persistence.EnvironmentDao
import org.acasictf.ctf.proto.Ctfoperator.*
import org.acasictf.ctf.proto.EnvironmentLookupServiceGrpcKt.EnvironmentLookupServiceCoroutineImplBase

class LookupService(
    private val envDao: EnvironmentDao,
    private val kube: KubernetesClient
) : EnvironmentLookupServiceCoroutineImplBase() {
    override suspend fun getEnvironmentInfo(
        request: GetEnvironmentInfoRequest
    ): GetEnvironmentInfoResponse = managed {
        val envIdStr = request.environmentId.contents

        val listOptions = ListOptions().apply {
            labelSelector = "$ctfEnvIdKey=$envIdStr,$ctfExposeKey=Termproxy"
        }
        val services = kube.services().inNamespace(kubeNamespace).list(listOptions)

        if (services.items.isEmpty()) {
            throw Exception("Could not get info")
        }
        val service = services.items[0]

        // TODO: Assuming only one port per service.
        if (service.spec.ports.size != 1) {
            throw Exception("Invalid number of ports")
        }

        return GetEnvironmentInfoResponse.newBuilder().apply {
            sshHost = service.spec.clusterIP
            sshPort = service.spec.ports[0].port
        }.build()
    }

    override suspend fun listUserEnvironments(
        request: ListUserEnvironmentsRequest
    ): ListUserEnvironmentsResponse = managed {
        val environments = envDao.list().filterValues {
            it.ownerId.contents == request.userId.contents
        }.map {
            UserEnvironmentInfo.newBuilder().apply {
                val key = it.key
                val env = it.value
                envId = key
                challengeSetId = env.challengeSetId
                challengeId = env.challengeId
            }.build()
        }

        return ListUserEnvironmentsResponse.newBuilder().apply {
            addAllEnvironments(environments)
        }.build()
    }

    override suspend fun listEnvironmentServices(
        request: ListEnvironmentServicesRequest
    ): ListEnvironmentServicesResponse = managed {
        return ListEnvironmentServicesResponse.newBuilder().apply {
            addAllTermproxyServices(listEnvironmentTermproxyServices(request.environmentId.contents))
            addAllWebServices(listEnvironmentWebServices(request.environmentId.contents))
        }.build()
    }

    private fun listEnvironmentTermproxyServices(envId: String): List<TermproxyService> {
        val listOptions = ListOptions().apply {
            labelSelector = "$ctfEnvIdKey=$envId,$ctfExposeKey=Termproxy"
        }
        val services = kube.services().inNamespace(kubeNamespace).list(listOptions)
            ?: return emptyList()

        return services.items.map {
            TermproxyService.newBuilder().apply {
                host = it.spec.clusterIP
                port = it.spec.ports[0].port
            }.build()
        }
    }

    private fun listEnvironmentWebServices(envId: String): List<WebService> {
        val listOptions = ListOptions().apply {
            labelSelector = "$ctfEnvIdKey=$envId,$ctfExposeKey=Web"
        }
        val ingresses = kube.network().v1().ingresses().inNamespace(kubeNamespace).list(listOptions)
            ?: return emptyList()

        return ingresses.items.map {
            WebService.newBuilder().apply {
                url = "http://${it.spec.rules[0].host}"
            }.build()
        }
    }
}

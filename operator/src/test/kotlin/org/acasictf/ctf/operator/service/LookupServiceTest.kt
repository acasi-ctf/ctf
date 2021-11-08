package org.acasictf.ctf.operator.service

import io.fabric8.kubernetes.api.model.PodBuilder
import io.fabric8.kubernetes.api.model.PodListBuilder
import io.fabric8.kubernetes.api.model.PodStatus
import io.fabric8.kubernetes.api.model.ServiceBuilder
import io.fabric8.kubernetes.api.model.ServiceListBuilder
import io.fabric8.kubernetes.api.model.ServiceSpec
import io.fabric8.kubernetes.api.model.ServiceStatus
import io.fabric8.kubernetes.client.utils.Utils
import io.mockk.every
import io.mockk.impl.annotations.MockK
import io.mockk.mockk
import kotlinx.coroutines.runBlocking
import org.acasictf.ctf.operator.ctfEnvIdKey
import org.acasictf.ctf.operator.ctfExposeKey
import org.acasictf.ctf.operator.generateProtoUuid
import org.acasictf.ctf.operator.kubeNamespace
import org.acasictf.ctf.operator.meta
import org.acasictf.ctf.operator.persistence.EnvironmentDao
import org.acasictf.ctf.operator.port
import org.acasictf.ctf.operator.serviceSpec
import org.acasictf.ctf.operator.testutil.assertFailsBlocking
import org.acasictf.ctf.operator.testutil.k8sExpect
import org.acasictf.ctf.proto.Ctfoperator.GetEnvironmentInfoRequest
import org.acasictf.ctf.proto.Ctfoperator.ListUserEnvironmentsRequest
import org.acasictf.ctf.proto.CtfoperatorInternal.Environment
import kotlin.test.Test
import kotlin.test.assertEquals

private fun getTermproxyService(envId: String) =
    "/api/v1/namespaces/ctf/services?labelSelector=" + Utils.toUrlEncoded(
        "$ctfEnvIdKey=$envId,$ctfExposeKey=Termproxy"
    )

class LookupServiceTest {
    @MockK
    private val environmentDao = mockk<EnvironmentDao>()

    /**
     * Gets the environment info, which is only used for Termproxy right now.
     * Ensures that the gRPC response contains the correct SSH host and SSH
     * port.
     */
    @Test
    fun `get environment info`() = k8sExpect { server ->
        val sshHost = "10.10.10.10"
        val sshPort = 22
        val envId = generateProtoUuid()

        val svc = ServiceBuilder()
            .withMetadata(meta {
                namespace = kubeNamespace
            })
            .withSpec(serviceSpec {
                clusterIP = sshHost
                ports = listOf(
                    port {
                        port = 22
                    }
                )
            })
            .build()

        server.expect()
            .get()
            .withPath(getTermproxyService(envId.contents))
            .andReturn(200, ServiceListBuilder().withItems(svc).build())
            .once()

        val service = LookupService(environmentDao, server.client)

        val response = runBlocking {
            service.getEnvironmentInfo(
                GetEnvironmentInfoRequest.newBuilder().apply {
                    environmentId = envId
                }.build()
            )
        }

        assertEquals(sshHost, response.sshHost)
        assertEquals(sshPort, response.sshPort)
    }

    /**
     * Gets the environment info, which is only used for Termproxy right now.
     * Ensures that the gRPC response contains the correct SSH host and SSH
     * port.
     */
    @Test
    fun `get environment info with missing pod`() = k8sExpect { server ->
        val envId = generateProtoUuid()

        server.expect()
            .get()
            .withPath(getTermproxyService(envId.contents))
            .andReturn(200, PodListBuilder().build())
            .once()

        val service = LookupService(environmentDao, server.client)

        assertFailsBlocking {
            service.getEnvironmentInfo(
                GetEnvironmentInfoRequest.newBuilder().apply {
                    environmentId = envId
                }.build()
            )
        }
    }

    /**
     * Lists a user's environments, ensures that the gRPC response contains the
     * correct environments as stored in the mocked database.
     */
    @Test
    fun `list user environments`() = k8sExpect { server ->
        val envId = generateProtoUuid()
        val ownerId = generateProtoUuid()
        val env = Environment.newBuilder().apply {
            challengeSetId = generateProtoUuid()
            challengeId = generateProtoUuid()
            this@apply.ownerId = ownerId
        }.build()
        val service = LookupService(environmentDao, server.client)

        every { environmentDao.list() } returns mapOf(
            envId to env
        )

        val response = runBlocking {
            service.listUserEnvironments(
                ListUserEnvironmentsRequest.newBuilder().apply {
                    userId = ownerId
                }.build()
            )
        }

        assertEquals(1, response.environmentsCount)

        val userEnvInfo = response.getEnvironments(0)
        assertEquals(env.challengeSetId, userEnvInfo.challengeSetId)
        assertEquals(env.challengeId, userEnvInfo.challengeId)
        assertEquals(envId, userEnvInfo.envId)
    }
}

package org.acasictf.ctf.operator.service

import io.fabric8.kubernetes.api.model.ServiceBuilder
import io.fabric8.kubernetes.api.model.ServiceListBuilder
import io.fabric8.kubernetes.api.model.networking.v1.IngressListBuilder
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
import org.acasictf.ctf.proto.Ctfoperator.ListEnvironmentServicesRequest
import org.acasictf.ctf.proto.Ctfoperator.ListUserEnvironmentsRequest
import org.acasictf.ctf.proto.CtfoperatorInternal.Environment
import kotlin.test.Test
import kotlin.test.assertEquals

private fun getTermproxyService(envId: String) =
    "/api/v1/namespaces/ctf/services?labelSelector=" + Utils.toUrlEncoded(
        "$ctfEnvIdKey=$envId,$ctfExposeKey=Termproxy"
    )
private fun getWebService(envId: String) =
    "/apis/networking.k8s.io/v1/namespaces/ctf/ingresses?labelSelector=" + Utils.toUrlEncoded(
        "$ctfEnvIdKey=$envId,$ctfExposeKey=Web"
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
                        port = sshPort
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
            .andReturn(200, ServiceListBuilder().build())
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
     * List the environment services. Ensures that the gRPC response contains the correct services.
     */
    @Test
    fun `list environment services`() = k8sExpect { server ->
        val envId = generateProtoUuid()
        val host1 = "1.1.1.1"
        val port1 = 22

        val svc1 = ServiceBuilder()
            .withMetadata(meta {
                namespace = kubeNamespace
            })
            .withSpec(serviceSpec {
                clusterIP = host1
                ports = listOf(
                    port {
                        port = port1
                    }
                )
            })
            .build()

        server.expect()
            .get()
            .withPath(getTermproxyService(envId.contents))
            .andReturn(200, ServiceListBuilder().withItems(svc1).build())
            .once()
        // TODO: Test for Web expose types.
        server.expect()
            .get()
            .withPath(getWebService(envId.contents))
            .andReturn(200, IngressListBuilder().build())
            .once()

        val service = LookupService(environmentDao, server.client)

        val response = runBlocking {
            service.listEnvironmentServices(
                ListEnvironmentServicesRequest.newBuilder().apply {
                    environmentId = envId
                }.build()
            )
        }

        assertEquals(1, response.termproxyServicesCount)
        assertEquals(0, response.webServicesCount)

        assertEquals(host1, response.termproxyServicesList[0].host)
        assertEquals(port1, response.termproxyServicesList[0].port)
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

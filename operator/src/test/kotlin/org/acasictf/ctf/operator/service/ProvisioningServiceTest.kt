package org.acasictf.ctf.operator.service

import kotlinx.coroutines.runBlocking
import org.acasictf.ctf.operator.k8sCrud
import org.acasictf.ctf.proto.Ctfoperator
import org.junit.jupiter.api.assertDoesNotThrow
import java.util.*
import kotlin.test.Test
import kotlin.test.assertTrue

class ProvisioningServiceTest {
    @Test
    fun `call startEnvironment method`() = k8sCrud { server ->
        runBlocking {
            val client = server.client
            val persistenceLayer = FakePersistenceLayer()
            val service = ProvisioningService(client, persistenceLayer)

            val request =
                Ctfoperator.StartEnvironmentRequest.newBuilder().apply {
                    challengeSetIdBuilder.contents =
                        "655081bb-aa0b-43c1-a099-f1c04177ba0c"
                    challengeIdBuilder.contents =
                        "d8ca2e9d-b062-4388-a3f4-c2328906f95d"
                }.build()
            val response = service.startEnvironment(request)

            assertTrue(response.hasSuccess())
            assertDoesNotThrow {
                UUID.fromString(response.success.environmentId.contents)
            }
        }
    }
}
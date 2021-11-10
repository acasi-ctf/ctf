package org.acasictf.ctf.operator.service

import com.google.protobuf.ByteString
import io.mockk.every
import io.mockk.mockkConstructor
import io.mockk.mockkStatic
import io.mockk.unmockkAll
import kotlinx.coroutines.runBlocking
import org.acasictf.ctf.operator.getChallengesDir
import org.acasictf.ctf.operator.kubeNamespace
import org.acasictf.ctf.operator.provisioner.kubernetes.KubernetesProvisioner
import org.acasictf.ctf.operator.testutil.k8sCrud
import org.acasictf.ctf.proto.Ctfoperator
import org.acasictf.ctf.proto.Ctfoperator.UploadEnvironmentTemplateRequest
import org.junit.jupiter.api.assertDoesNotThrow
import org.junit.jupiter.api.assertThrows
import java.io.File
import java.util.UUID
import kotlin.io.path.createTempDirectory
import kotlin.io.path.deleteIfExists
import kotlin.test.AfterTest
import kotlin.test.Test
import kotlin.test.assertTrue

class ProvisioningServiceTest {
  @AfterTest
  fun after() {
    unmockkAll()
  }

  @Test
  fun `call startEnvironment method`() = k8sCrud { server ->
    runBlocking {
      val client = server.client
      val persistenceLayer = FakePersistenceLayer()
      val service = ProvisioningService(client, persistenceLayer,)

      val request =
        Ctfoperator.StartEnvironmentRequest.newBuilder().apply {
          challengeSetIdBuilder.contents = "655081bb-aa0b-43c1-a099-f1c04177ba0c"
          challengeIdBuilder.contents = "d8ca2e9d-b062-4388-a3f4-c2328906f95d"
        }.build()
      val response = service.startEnvironment(request)

      assertTrue(response.hasSuccess())
      assertDoesNotThrow {
        UUID.fromString(response.success.environmentId.contents)
      }
    }
  }

  @Test
  fun `call startEnvironment method with provision failure`() = k8sCrud { server ->
    runBlocking {
      val client = server.client
      val persistenceLayer = FakePersistenceLayer()
      val service = ProvisioningService(client, persistenceLayer)
      mockkConstructor(KubernetesProvisioner::class)
      every { anyConstructed<KubernetesProvisioner>().provision(any()) } throws
        Exception("Generic exception")

      val request =
        Ctfoperator.StartEnvironmentRequest.newBuilder().apply {
          challengeSetIdBuilder.contents = "655081bb-aa0b-43c1-a099-f1c04177ba0c"
          challengeIdBuilder.contents = "d8ca2e9d-b062-4388-a3f4-c2328906f95d"
        }.build()
      val response = service.startEnvironment(request)

      assertTrue(response.hasFailure())
    }
  }

  @Test
  fun `call stopEnvironment expecting TODO`() = k8sCrud { server ->
    runBlocking {
      val client = server.client
      val persistenceLayer = FakePersistenceLayer()
      val service = ProvisioningService(client, persistenceLayer,)

      assertThrows<NotImplementedError> {
        service.stopEnvironment(Ctfoperator.StopEnvironmentRequest.newBuilder().build())
      }
    }
  }

  @Test
  fun `call uploadEnvironmentTemplate`() = k8sCrud { server ->
    runBlocking {
      val client = server.client
      val persistenceLayer = FakePersistenceLayer()
      val service = ProvisioningService(client.inNamespace(kubeNamespace), persistenceLayer)

      val tempDir = createTempDirectory()
      mockkStatic(::getChallengesDir)
      every { getChallengesDir() } answers { tempDir.toAbsolutePath().toString() }

      service.uploadEnvironmentTemplate(UploadEnvironmentTemplateRequest.newBuilder().apply {
        envZip = ByteString.copyFrom(
          javaClass.getResourceAsStream("/cs-internal.zip")!!.readAllBytes()
        )
      }.build())

      tempDir.toFile().deleteRecursively()
    }
  }
}

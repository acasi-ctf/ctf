package org.acasictf.ctf.operator.provisioner.kubernetes

import org.acasictf.ctf.operator.meta
import org.acasictf.ctf.operator.model.kubernetes.v1alpha1.Environment
import org.acasictf.ctf.operator.model.kubernetes.v1alpha1.EnvironmentList
import org.acasictf.ctf.operator.model.kubernetes.v1alpha1.EnvironmentSpec
import org.acasictf.ctf.operator.testutil.k8sExpect
import java.time.Instant
import java.time.temporal.ChronoUnit
import kotlin.test.Test

class KubernetesPurgerTest {
  @Test
  fun purge() = k8sExpect { server ->
    val client = server.client
    val purger = KubernetesPurger(client)

    server.expect()
      .get()
      .withPath("/apis/ctf.acasi.info/v1alpha1/namespaces/test/environments")
      .andReturn(200, EnvironmentList().apply {
        // Environment that should be deleted (greater than an hour old).
        items.add(Environment().apply {
          metadata = meta {
            creationTimestamp = Instant.now().minus(2, ChronoUnit.HOURS).toString()
          }
          spec = EnvironmentSpec().apply {
            templateName = "abc123"
          }
        })

        // Environment that should not be deleted (less than an hour old).
        items.add(Environment().apply {
          metadata = meta {
            creationTimestamp = Instant.now().toString()
          }
          spec = EnvironmentSpec().apply {
            templateName = "abc123"
          }
        })
      })
      .always()

    val envsPurgedCount = purger.purge()

    kotlin.test.assertEquals(1, envsPurgedCount)
  }
}

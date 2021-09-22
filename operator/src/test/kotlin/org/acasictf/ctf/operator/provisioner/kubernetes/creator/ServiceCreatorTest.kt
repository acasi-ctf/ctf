package org.acasictf.ctf.operator.provisioner.kubernetes.creator

import io.mockk.mockkObject
import io.mockk.unmockkObject
import org.acasictf.ctf.operator.meta
import org.acasictf.ctf.operator.model.kubernetes.v1alpha1.EnvTemplate
import org.acasictf.ctf.operator.model.kubernetes.v1alpha1.EnvTemplateList
import org.acasictf.ctf.operator.model.kubernetes.v1alpha1.Environment
import org.acasictf.ctf.operator.model.kubernetes.v1alpha1.EnvironmentSpec
import org.acasictf.ctf.operator.persistence.GlobalConfig
import org.acasictf.ctf.operator.port
import org.acasictf.ctf.operator.testutil.k8sCrud
import kotlin.test.AfterTest
import kotlin.test.BeforeTest
import kotlin.test.Test
import kotlin.test.assertEquals

internal class ServiceCreatorTest {
  private val env = Environment().apply {
    metadata = meta {
      name = "test123"
    }
    spec = EnvironmentSpec().apply {
      templateName = "test-template"
    }
  }

  @BeforeTest
  fun before() {
    mockkObject(GlobalConfig)
  }

  @AfterTest
  fun after() {
    unmockkObject(GlobalConfig)
  }

  @Test
  fun generate() = k8sCrud {
    GlobalConfig.baseUrl = "ctf.example.com"

    val client = it.client
    val f = client.customResources(EnvTemplate::class.java, EnvTemplateList::class.java)
    val envTemplate =
      f.load(javaClass.getResourceAsStream("/model/v1alpha1/envtemplate-test.yaml")).get()

    val sc = ServiceCreator(env, envTemplate, client.services())
    val services = sc.generate()
    assertEquals(1, services.size)

    val s = services[0]
    assertEquals("test123-nginx", s.metadata.name)
    assertEquals(mapOf("app" to "test123-nginx"), s.spec.selector)
    assertEquals(listOf(
      port {
        port = 80
        protocol = "TCP"
      }
    ), s.spec.ports)
  }
}
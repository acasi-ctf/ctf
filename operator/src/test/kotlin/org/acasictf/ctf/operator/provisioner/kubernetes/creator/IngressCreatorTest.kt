package org.acasictf.ctf.operator.provisioner.kubernetes.creator

import io.mockk.mockkObject
import io.mockk.unmockkAll
import org.acasictf.ctf.operator.meta
import org.acasictf.ctf.operator.model.kubernetes.v1alpha1.EnvTemplate
import org.acasictf.ctf.operator.model.kubernetes.v1alpha1.EnvTemplateList
import org.acasictf.ctf.operator.model.kubernetes.v1alpha1.Environment
import org.acasictf.ctf.operator.model.kubernetes.v1alpha1.EnvironmentSpec
import org.acasictf.ctf.operator.persistence.GlobalConfig
import org.acasictf.ctf.operator.testutil.k8sCrud
import kotlin.test.AfterTest
import kotlin.test.BeforeTest
import kotlin.test.Test
import kotlin.test.assertEquals

internal class IngressCreatorTest {
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
    unmockkAll()
  }

  @Test
  fun generate() = k8sCrud {
    GlobalConfig.baseUrl = "ctf.example.com"

    val client = it.client
    val f = client.customResources(EnvTemplate::class.java, EnvTemplateList::class.java)
    val envTemplate =
      f.load(javaClass.getResourceAsStream("/model/v1alpha1/envtemplate-test.yaml")).get()

    val ic = IngressCreator(env, envTemplate, client.network().v1().ingresses())
    val ingresses = ic.generate()
    assertEquals(1, ingresses.size)

    val i = ingresses[0]
    assertEquals("test123-nginx", i.metadata.name)
    assertEquals(1, i.spec.rules.size)

    val r = i.spec.rules[0]
    assertEquals("test123-nginx.ctf.example.com", r.host)
    assertEquals(1, r.http.paths.size)

    val p = r.http.paths[0]
    assertEquals("/", p.path)
    assertEquals("Prefix", p.pathType)
    assertEquals("test123-nginx", p.backend.service.name)
    assertEquals(80, p.backend.service.port.number)
  }
}

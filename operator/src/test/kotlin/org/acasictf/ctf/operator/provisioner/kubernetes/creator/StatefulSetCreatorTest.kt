package org.acasictf.ctf.operator.provisioner.kubernetes.creator

import io.mockk.every
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
import kotlin.test.assertTrue

internal class StatefulSetCreatorTest {
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

    every { GlobalConfig.baseUrl } returns "ctf.example.com"
    every { GlobalConfig.publicKey } returns "TEST_KEY"
  }

  @AfterTest
  fun after() {
    unmockkAll()
  }

  @Test
  fun generate() = k8sCrud {
    val client = it.client
    val f = client.customResources(EnvTemplate::class.java, EnvTemplateList::class.java)
    val envTemplate =
      f.load(javaClass.getResourceAsStream("/model/v1alpha1/envtemplate-test.yaml")).get()

    val stsc = StatefulSetCreator(env, envTemplate, client.apps().statefulSets())
    val statefulSets = stsc.generate()
    assertEquals(1, statefulSets.size)

    val s = statefulSets[0]
    assertEquals("test123-nginx", s.metadata.name)
    assertEquals(mapOf("app" to "test123-nginx"), s.spec.selector.matchLabels)

    val t = s.spec.template
    assertEquals(mapOf("app" to "test123-nginx"), t.metadata.labels)
    assertEquals(1, t.spec.containers.size)

    val c = t.spec.containers[0]
    assertEquals("nginx", c.name)
    assertEquals("nginx:latest", c.image)
    assertTrue(c.env.all { ev ->
      when {
        ev.name == "ENV_VAR" && ev.value == "VALUE" -> true
        ev.name == "CTF_TERMPROXY_PUBLIC_KEY" -> true
        ev.name == "PUBLIC_KEY" -> true
        else -> false
      }
    })
    assertEquals(3, c.env.size)
  }
}

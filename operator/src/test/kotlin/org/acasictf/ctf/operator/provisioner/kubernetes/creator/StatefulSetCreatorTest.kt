package org.acasictf.ctf.operator.provisioner.kubernetes.creator

import io.fabric8.kubernetes.api.model.EnvVar
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
    assertEquals(listOf(EnvVar("ENV_VAR", "VALUE", null)), c.env)
  }
}
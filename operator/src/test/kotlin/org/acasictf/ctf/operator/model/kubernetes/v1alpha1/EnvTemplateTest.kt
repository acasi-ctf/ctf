package org.acasictf.ctf.operator.model.kubernetes.v1alpha1

import io.fabric8.kubernetes.client.DefaultKubernetesClient
import kotlin.test.Test
import kotlin.test.assertEquals

class EnvTemplateTest {
    @Test
    fun `load test yaml`() {
        val client = DefaultKubernetesClient()
        val f = client.customResources(EnvTemplate::class.java, EnvTemplateList::class.java)

        val envTemplate = f.load(javaClass.getResourceAsStream("/model/v1alpha1/envtemplate-test.yaml")).get()

        assertEquals("test-template", envTemplate.metadata.name)
        assertEquals("nginx", envTemplate.spec.pods[0].metadata.name)
        assertEquals("nginx:latest", envTemplate.spec.pods[0].spec.containers[0].image)

        assertEquals("nginx", envTemplate.spec.services[0].metadata.name)
        assertEquals(mapOf("app" to "nginx"), envTemplate.spec.services[0].spec.selector)
        assertEquals(80, envTemplate.spec.services[0].spec.ports[0].port)

        assertEquals("nginx", envTemplate.spec.ingresses[0].metadata.name)
        assertEquals("/", envTemplate.spec.ingresses[0].spec.path)
        assertEquals(EnvTemplateIngressPathType.Prefix, envTemplate.spec.ingresses[0].spec.pathType)
        assertEquals("nginx", envTemplate.spec.ingresses[0].spec.backend.service.name)
        assertEquals(80, envTemplate.spec.ingresses[0].spec.backend.service.port.number)
    }
}

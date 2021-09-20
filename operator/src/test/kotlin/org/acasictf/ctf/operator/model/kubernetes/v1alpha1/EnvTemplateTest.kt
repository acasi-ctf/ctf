package org.acasictf.ctf.operator.model.kubernetes.v1alpha1

import io.fabric8.kubernetes.client.KubernetesClient
import io.fabric8.kubernetes.client.dsl.MixedOperation
import io.fabric8.kubernetes.client.dsl.Resource
import io.fabric8.kubernetes.client.server.mock.KubernetesServer
import org.acasictf.ctf.operator.testutil.k8sExpect
import kotlin.test.Test
import kotlin.test.assertEquals
import kotlin.test.assertTrue

class EnvTemplateTest {
    private lateinit var client: KubernetesClient
    private lateinit var f: MixedOperation<EnvTemplate, EnvTemplateList, Resource<EnvTemplate>>

    private fun create(server: KubernetesServer) {
        client = server.client
        f = client.customResources(EnvTemplate::class.java, EnvTemplateList::class.java)
    }

    @Test
    fun `load test yaml`() = k8sExpect { server ->
        create(server)

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

    @Test
    fun `test equals`() = k8sExpect { server ->
        create(server)

        val envTemplate = f.load(javaClass.getResourceAsStream("/model/v1alpha1/envtemplate-test.yaml")).get()
        val envTemplateCopy = f.load(javaClass.getResourceAsStream("/model/v1alpha1/envtemplate-test.yaml")).get()

        assertTrue(envTemplate.equals(envTemplateCopy))
    }

    @Test
    fun `test hashCode`() = k8sExpect { server ->
        create(server)

        val envTemplate = f.load(javaClass.getResourceAsStream("/model/v1alpha1/envtemplate-test.yaml")).get()
        val envTemplateCopy = f.load(javaClass.getResourceAsStream("/model/v1alpha1/envtemplate-test.yaml")).get()

        assertEquals(envTemplate.hashCode(), envTemplateCopy.hashCode())
    }
}

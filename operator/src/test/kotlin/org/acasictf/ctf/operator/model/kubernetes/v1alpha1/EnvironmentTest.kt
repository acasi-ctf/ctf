package org.acasictf.ctf.operator.model.kubernetes.v1alpha1

import io.fabric8.kubernetes.client.KubernetesClient
import io.fabric8.kubernetes.client.dsl.MixedOperation
import io.fabric8.kubernetes.client.dsl.Resource
import io.fabric8.kubernetes.client.server.mock.KubernetesServer
import org.acasictf.ctf.operator.testutil.k8sExpect
import kotlin.test.Test
import kotlin.test.assertEquals
import kotlin.test.assertTrue

class EnvironmentTest {
    private lateinit var client: KubernetesClient
    private lateinit var f: MixedOperation<Environment, EnvironmentList, Resource<Environment>>

    private fun create(server: KubernetesServer) {
        client = server.client
        f = client.resources(Environment::class.java, EnvironmentList::class.java)
    }

    @Test
    fun `load test yaml`() = k8sExpect { server ->
        create(server)

        val env = f.load(javaClass.getResourceAsStream("/model/v1alpha1/env-test.yaml")).get()

        assertEquals("test-template", env.spec.templateName)
    }

    @Test
    fun `test equals`() = k8sExpect { server ->
        create(server)

        val env = f.load(javaClass.getResourceAsStream("/model/v1alpha1/env-test.yaml")).get()
        val envCopy = f.load(javaClass.getResourceAsStream("/model/v1alpha1/env-test.yaml")).get()

        assertTrue(env.equals(envCopy))
    }

    @Test
    fun `test hashCode`() = k8sExpect { server ->
        create(server)

        val env = f.load(javaClass.getResourceAsStream("/model/v1alpha1/env-test.yaml")).get()
        val envCopy = f.load(javaClass.getResourceAsStream("/model/v1alpha1/env-test.yaml")).get()

        assertEquals(env.hashCode(), envCopy.hashCode())
    }
}

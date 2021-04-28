package org.acasictf.ctf.operator.provisioner

import io.fabric8.kubernetes.api.model.PodBuilder
import io.fabric8.kubernetes.client.server.mock.KubernetesServer
import kotlinx.coroutines.delay
import kotlinx.coroutines.runBlocking
import org.acasictf.ctf.operator.createUuidStr
import org.acasictf.ctf.operator.kubeNamespace
import kotlin.test.AfterTest
import kotlin.test.BeforeTest
import kotlin.test.Test
import kotlin.test.assertEquals

private fun createKubernetesMock(crud: Boolean) = KubernetesServer(true, crud)

typealias ServerAcceptor = (server: KubernetesServer) -> Unit

private fun mockDecorator(crudMode: Boolean, f: ServerAcceptor) = runBlocking {
    val server = createKubernetesMock(crudMode)
    server.before()
    delay(1000)
    f(server)
    server.after()
}

private fun k8sExpect(f: ServerAcceptor) = mockDecorator(false, f)
private fun k8sCrud(f: ServerAcceptor) = mockDecorator(true, f)

class KubernetesProvisionerTest {
    private var crudMode = false
    private var server = createKubernetesMock(crudMode)

    @BeforeTest
    fun beforeTest() {
        server = createKubernetesMock(true)
        server.before()
    }

    @AfterTest
    fun afterTest() {
        server.after()
    }

    /**
     * Provisions a challenge that requires a single pod to be created. Ensures
     * that the pod is created by first calling provision(challenge) then
     * listing the API and performing assertions on the pod that was submitted
     * to the Kubernetes API server by our code and the Kubernetes client.
     */
    @Test
    fun `provision environment with single pod`() = k8sCrud { server ->
        val client = server.client
        val envId = createUuidStr()
        val challengeTemplate = FakeChallengeTemplate("fake-challenge")
        challengeTemplate.init()
        val provisioner =
            KubernetesProvisioner(client, envId, challengeTemplate)
        val challenge =
            challengeTemplate.challenges.first { it.slug == "dvwa-example" }

        provisioner.provision(challenge)

        val podList = client.pods().inNamespace(kubeNamespace).list()
        assertEquals(1, podList.items.size)

        val pod = podList.items[0]
        assertEquals("ctf-$envId-0", pod.metadata.name)
        assertEquals(kubeNamespace, pod.metadata.namespace)
        assertEquals(envId, pod.metadata.labels["ctf-env-id"])
        assertEquals("dvwa", pod.metadata.labels["ctf-env-label"])
    }
}

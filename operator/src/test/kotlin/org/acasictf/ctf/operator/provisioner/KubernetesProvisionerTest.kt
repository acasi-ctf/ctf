package org.acasictf.ctf.operator.provisioner

import org.acasictf.ctf.operator.createUuidStr
import org.acasictf.ctf.operator.k8sCrud
import org.acasictf.ctf.operator.kubeNamespace
import org.acasictf.ctf.operator.persistence.FakeChallengeTemplate
import kotlin.test.Test
import kotlin.test.assertEquals

class KubernetesProvisionerTest {
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
        val challengeTemplate =
            FakeChallengeTemplate("655081bb-aa0b-43c1-a099-f1c04177ba0c")
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

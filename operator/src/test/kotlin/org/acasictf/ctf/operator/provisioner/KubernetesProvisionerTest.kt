package org.acasictf.ctf.operator.provisioner

import io.mockk.every
import io.mockk.mockk
import org.acasictf.ctf.operator.*
import org.acasictf.ctf.operator.model.Challenge
import org.acasictf.ctf.operator.model.Kubernetes
import org.acasictf.ctf.operator.persistence.ChallengeTemplate
import org.acasictf.ctf.operator.persistence.ResourceChallengeTemplate
import kotlin.test.BeforeTest
import kotlin.test.Test
import kotlin.test.assertEquals
import kotlin.test.assertFails

class KubernetesProvisionerTest {
    private lateinit var envId: String
    private lateinit var validChallengeTemplate: ChallengeTemplate
    private lateinit var validDvwaChallenge: Challenge
    private lateinit var mockChallengeTemplate: ChallengeTemplate

    @BeforeTest
    fun beforeTest() {
        envId = createUuidStr()
        validChallengeTemplate =
            ResourceChallengeTemplate(TestChallengeId.validChallengeId)
        validChallengeTemplate.init()
        validDvwaChallenge =
            validChallengeTemplate.challenges.first { it.slug == "dvwa-example" }

        mockChallengeTemplate = mockk()
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
        val provisioner =
            KubernetesProvisioner(client, envId, validChallengeTemplate)

        provisioner.provision(validDvwaChallenge)

        val podList = client.pods().inNamespace(kubeNamespace).list()
        assertEquals(1, podList.items.size)

        val pod = podList.items[0]
        assertEquals("ctf-$envId-0", pod.metadata.name)
        assertEquals(kubeNamespace, pod.metadata.namespace)
        assertEquals(envId, pod.metadata.labels["ctf-env-id"])
        assertEquals("dvwa", pod.metadata.labels["ctf-env-label"])
    }

    @Test
    fun `provision environment with missing k8s json`() = k8sCrud { server ->
        every {
            mockChallengeTemplate.readChallengeJson(
                any(),
                any(),
                Kubernetes.serializer()
            )
        } returns null

        val client = server.client
        val provisioner =
            KubernetesProvisioner(client, envId, mockChallengeTemplate)

        assertFails {
            provisioner.provision(validDvwaChallenge)
        }
    }

    /**
     * Provisions a challenge that simulates having a bad Pod definition YAML.
     * The Kubernetes API server returns a 422 Unprocessable Entity status code
     * if a server dry run fails. Our provision call should throw an exception.
     */
    @Test
    fun `provision environment with bad pod dry run`() = k8sExpect { server ->
        server.expect()
            .post()
            .withPath("/api/v1/namespaces/ctf/pods?dryRun=All")
            .andReturn(422, "Unprocessable Entity")
            .once()

        val client = server.client
        val provisioner =
            KubernetesProvisioner(client, envId, validChallengeTemplate)

        assertFails {
            provisioner.provision(validDvwaChallenge)
        }
    }
}

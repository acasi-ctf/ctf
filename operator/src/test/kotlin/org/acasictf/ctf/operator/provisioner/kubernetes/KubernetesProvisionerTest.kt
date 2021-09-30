package org.acasictf.ctf.operator.provisioner.kubernetes

import io.fabric8.kubernetes.client.KubernetesClient
import io.mockk.every
import io.mockk.mockk
import io.mockk.mockkObject
import io.mockk.unmockkObject
import org.acasictf.ctf.operator.TestChallengeId
import org.acasictf.ctf.operator.kubeNamespace
import org.acasictf.ctf.operator.model.Challenge
import org.acasictf.ctf.operator.model.Kubernetes
import org.acasictf.ctf.operator.model.kubernetes.v1alpha1.Environment
import org.acasictf.ctf.operator.model.kubernetes.v1alpha1.EnvironmentList
import org.acasictf.ctf.operator.persistence.ChallengeTemplate
import org.acasictf.ctf.operator.persistence.GlobalConfig
import org.acasictf.ctf.operator.persistence.ResourceChallengeTemplate
import org.acasictf.ctf.operator.persistence.StringChallengeTemplateFile
import org.acasictf.ctf.operator.testutil.createUuidStr
import org.acasictf.ctf.operator.testutil.k8sCrud
import kotlin.test.AfterTest
import kotlin.test.BeforeTest
import kotlin.test.Test
import kotlin.test.assertEquals

private const val mockPublicKey = "MOCK_PUBLIC_KEY"

class KubernetesProvisionerTest {
    private lateinit var envId: String
    private lateinit var validChallengeTemplate: ChallengeTemplate
    private lateinit var validDvwaChallenge: Challenge

    /**
     * Mock objects with state and create lateinit vars.
     */
    @BeforeTest
    fun beforeTest() {
        mockPublicKey()

        envId = createUuidStr()
        validChallengeTemplate =
            ResourceChallengeTemplate(TestChallengeId.validChallengeId)
        validChallengeTemplate.init()
        validDvwaChallenge =
            validChallengeTemplate.challenges.first { it.slug == "dvwa-example" }
    }

    /**
     * Unmock objects.
     */
    @AfterTest
    fun afterTest() {
        unmockPublicKey()
    }

    /**
     * Mock the ProxyPublicKey object and make it return mockPublicKey.
     */
    private fun mockPublicKey() {
        mockkObject(GlobalConfig)
        every { GlobalConfig.publicKey } returns mockPublicKey
    }

    /**
     * Unmock the ProxyPublicKey object.
     */
    private fun unmockPublicKey() {
        unmockkObject(GlobalConfig)
    }

    /**
     * Query environments in the ctf namespace.
     */
    private fun KubernetesClient.queryEnvironments() =
        resources(Environment::class.java, EnvironmentList::class.java)
            .inNamespace(kubeNamespace)
            .list()

    @Test
    fun `provision environment`() = k8sCrud { server ->
        val client = server.client
        val provisioner = KubernetesProvisioner(envId, client)

        provisioner.provision(validDvwaChallenge)

        val envs = client.queryEnvironments().items

        assertEquals(1, envs.size)
        assertEquals(validDvwaChallenge.id, envs[0].spec.templateName)
    }
}

package org.acasictf.ctf.operator.provisioner.kubernetes

import io.fabric8.kubernetes.client.KubernetesClient
import io.mockk.every
import io.mockk.mockk
import io.mockk.mockkObject
import io.mockk.unmockkObject
import org.acasictf.ctf.operator.*
import org.acasictf.ctf.operator.model.Challenge
import org.acasictf.ctf.operator.model.Kubernetes
import org.acasictf.ctf.operator.model.Manifests
import org.acasictf.ctf.operator.persistence.ChallengeTemplate
import org.acasictf.ctf.operator.persistence.GlobalConfig
import org.acasictf.ctf.operator.persistence.ResourceChallengeTemplate
import org.acasictf.ctf.operator.persistence.StringChallengeTemplateFile
import org.acasictf.ctf.operator.testutil.createUuidStr
import org.acasictf.ctf.operator.testutil.k8sCrud
import org.acasictf.ctf.operator.testutil.k8sExpect
import kotlin.test.*

private const val mockPublicKey = "MOCK_PUBLIC_KEY"

class KubernetesProvisionerTest {
    private lateinit var envId: String
    private lateinit var validChallengeTemplate: ChallengeTemplate
    private lateinit var validDvwaChallenge: Challenge
    private lateinit var mockChallengeTemplate: ChallengeTemplate

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

        mockChallengeTemplate = mockk()
    }

    /**
     * Unmock objects.
     */
    @AfterTest
    fun afterTest() {
        unmockPublicKey()
    }

    /**
     * Mock the kubernetes.json file that is read by the provisioner to return
     * a instance of the Kubernetes data class and contains a single pod YAML,
     * "test.yaml", mocked in mockK8sPodYaml.
     */
    private fun mockK8sFile() {
        every {
            mockChallengeTemplate.readChallengeJson(
                validDvwaChallenge.slug,
                "kubernetes.json",
                Kubernetes.serializer()
            )
        } returns Kubernetes(
            Manifests(
                listOf(
                    "test.yaml"
                )
            )
        )
    }

    /**
     * Mock the pod YAML that will be loaded for the valid DVWA challenge.
     * @param contents Text that is returned by the ChallengeFile InputStream.
     */
    private fun mockK8sPodYaml(contents: String) {
        every {
            mockChallengeTemplate.readChallengeFile(
                validDvwaChallenge.slug,
                "test.yaml"
            )
        } returns StringChallengeTemplateFile(contents)
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
     * Query pods in the ctf namespace.
     */
    private fun KubernetesClient.queryPods() =
        pods().inNamespace(kubeNamespace).list()

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

    /**
     * Provisions a challenge that requires a single pod to be created, but the
     * pod's YAML does not have the metadata section filled out. Currently we
     * do not require this field to be filled out, as we will populate it
     * ourselves with the proper information like pod name, namespace, and
     * environment ID label. In the future we may require a environment label,
     * so this test may be irrelevant later.
     */
    @Test
    fun `provision environment with missing metadata`() = k8sCrud { server ->
        mockK8sFile()
        mockK8sPodYaml(
            """
apiVersion: v1
kind: Pod
spec:
  containers:
    - name: mysql
      image: mariadb:10.4
      env:
        - name: MYSQL_DATABASE
          value: example
        - name: MYSQL_USER
          value: example
        - name: MYSQL_PASSWORD
          value: example1234
        - name: MYSQL_RANDOM_ROOT_PASSWORD
          value: 'true'
        """
        )

        val client = server.client
        val provisioner =
            KubernetesProvisioner(client, envId, mockChallengeTemplate)

        provisioner.provision(validDvwaChallenge)

        val podList = client.queryPods()
        assertEquals(1, podList.items.size)

        val pod = podList.items[0]
        assertEquals("ctf-$envId-0", pod.metadata.name)
        assertEquals(kubeNamespace, pod.metadata.namespace)
        assertEquals(envId, pod.metadata.labels["ctf-env-id"])
    }

    /**
     * Provisions a challenge that requires a single pod to be created, but the
     * pod's YAML is missing the spec field, ensuring that the initial mapping
     * of YAML to pod objects and the dry run occurs correctly, catching and
     * wrapping an exception.
     */
    @Test
    fun `provision environment pod yaml missing spec`() = k8sCrud { server ->
        mockK8sFile()
        mockK8sPodYaml(
            """
apiVersion: v1
kind: Pod
metadata:
  name: test
        """
        )

        val client = server.client
        val provisioner =
            KubernetesProvisioner(client, envId, mockChallengeTemplate)

        assertFails {
            provisioner.provision(validDvwaChallenge)
        }
    }

    /**
     * Provisions a challenge that requires a single pod to be created, but the
     * pod's YAML is missing the containers field, ensuring that the initial
     * mapping of YAML to pod objects and the dry run occurs correctly, catching
     * and wrapping an exception.
     */
    @Test
    fun `provision environment pod yaml missing containers`() = k8sCrud { s ->
        mockK8sFile()
        mockK8sPodYaml(
            """
apiVersion: v1
kind: Pod
metadata:
  name: test
spec: {}
        """
        )

        val client = s.client
        val provisioner =
            KubernetesProvisioner(client, envId, mockChallengeTemplate)

        assertFails {
            provisioner.provision(validDvwaChallenge)
        }
    }

    /**
     * Provisions a challenge that requires a single pod to be created, but the
     * pod's YAML containers field is empty, ensuring that the initial mapping
     * of YAML to pod objects and the dry run occurs correctly, catching and
     * wrapping an exception.
     */
    @Test
    fun `provision environment pod yaml zero containers`() = k8sCrud { s ->
        mockK8sFile()
        mockK8sPodYaml(
            """
apiVersion: v1
kind: Pod
metadata:
  name: test
spec:
  containers: []
        """
        )

        val client = s.client
        val provisioner =
            KubernetesProvisioner(client, envId, mockChallengeTemplate)

        assertFails {
            provisioner.provision(validDvwaChallenge)
        }
    }

    /**
     * Provisions a challenge with a pod that is considered a penimage, ensuring
     * each container has the SSH public key for Termproxy injected into its
     * environment.
     */
    @Test
    fun `provision environment pod with penimage`() = k8sCrud { s ->
        mockK8sFile()
        mockK8sPodYaml(
            """
apiVersion: v1
kind: Pod
metadata:
  name: penimage
  labels:
    ctf-env-label: penimage
spec:
  containers:
  - name: penimage
    image: ghcr.io/acasi-ctf/ctf/penimage:latest
        """
        )
        mockPublicKey()

        val client = s.client
        val provisioner =
            KubernetesProvisioner(client, envId, mockChallengeTemplate)

        provisioner.provision(validDvwaChallenge)

        val podList = client.queryPods()
        val pod = podList.items[0]
        val container = pod.spec.containers[0]

        assertEquals(
            mockPublicKey,
            container.env.first {
                it.name == "PUBLIC_KEY"
            }.value
        )
    }

    /**
     * Provisions a challenge that has a missing kubernetes.json file inside of
     * the ChallengeTemplate. It uses a mock to return null from the
     * readChallengeJson function, because KubernetesProvisioner throws an
     * exception if the return value is null.
     */
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

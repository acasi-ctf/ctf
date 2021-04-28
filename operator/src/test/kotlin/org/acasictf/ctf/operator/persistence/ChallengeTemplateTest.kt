package org.acasictf.ctf.operator.persistence

import org.acasictf.ctf.operator.model.Kubernetes
import kotlin.test.Test
import kotlin.test.assertEquals
import kotlin.test.assertNotNull

class ChallengeTemplateTest {
    private val challengeTemplate =
        FakeChallengeTemplate("655081bb-aa0b-43c1-a099-f1c04177ba0c")

    @Test
    fun `read challenge kubernetes json`() {
        val kubernetesJson = challengeTemplate.readChallengeJson(
            "dvwa-example",
            "kubernetes.json",
            Kubernetes.serializer()
        )

        assertNotNull(kubernetesJson)
        assertEquals(1, kubernetesJson.manifests.pods.size)
        assertEquals("dvwa.yaml", kubernetesJson.manifests.pods[0])
    }
}

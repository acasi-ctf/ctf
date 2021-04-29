package org.acasictf.ctf.operator.persistence

import org.acasictf.ctf.operator.model.Kubernetes
import kotlin.test.Test
import kotlin.test.assertEquals
import kotlin.test.assertNotNull
import kotlin.test.assertNull

class ChallengeTemplateTest {
    private val challengeTemplate =
        ResourceChallengeTemplate("655081bb-aa0b-43c1-a099-f1c04177ba0c")

    init {
        challengeTemplate.init()
    }

    @Test
    fun `validate challenge set data`() {
        val cs = challengeTemplate.challengeSet
        assertEquals(
            "655081bb-aa0b-43c1-a099-f1c04177ba0c",
            cs.id
        )
        assertEquals(
            "example",
            cs.slug
        )
        assertEquals(
            "Example challenge set",
            cs.name
        )
        assertEquals(
            "Example challenge set to be used for reference while developing new challenge sets",
            cs.description
        )
        assertEquals(
            "0.1.0",
            cs.version
        )
        assertEquals(
            listOf(
                "basic-env-example",
                "dvwa-example"
            ),
            cs.challenges
        )
    }

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

    @Test
    fun `try to read nonexistent json file`() {
        val json = challengeTemplate.readJson(
            "test.json",
            Kubernetes.serializer()
        )
        assertNull(json)
    }
}

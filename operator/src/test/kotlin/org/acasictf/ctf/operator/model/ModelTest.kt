package org.acasictf.ctf.operator.model

import kotlinx.serialization.json.Json
import org.acasictf.ctf.operator.generateProtoUuid
import kotlin.test.Test
import kotlin.test.assertEquals

class ModelTest {
    private val json = Json {}

    /**
     * Deserializes a challenge set JSON string into a ChallengeSet data class.
     * Ensures that the output object is equal to what we expect it to be.
     */
    @Test
    fun `deserialize challenge set`() {
        val id = generateProtoUuid().contents
        val slug = "test"
        val name = "Test Challenge Set"
        val description = "This is the description of the test challenge set"
        val version = "0.1.0"
        val challenge1 = "challenge1"
        val challenge2 = "challenge2"
        val csJson = """
            {
              "id": "$id",
              "slug": "$slug",
              "name": "$name",
              "description": "$description",
              "version": "$version",
              "challenges": [
                "$challenge1",
                "$challenge2"
              ]
            }
        """.trimIndent()

        val cs = json.decodeFromString(ChallengeSet.serializer(), csJson)

        assertEquals(
            ChallengeSet(
                id,
                slug,
                name,
                description,
                version,
                listOf(
                    challenge1,
                    challenge2
                )
            ), cs
        )
    }

    /**
     * Deserializes a challenge JSON string into a Challenge data class. Ensures
     * that the output object is equal to what we expect it to be.
     */
    @Test
    fun `serialize challenge`() {
        val id = generateProtoUuid().contents
        val slug = "test"
        val name = "Test Challenge Set"
        val description = "This is the description of the test challenge set"
        val provisioner = "kubernetes"
        val doc1 = Document(
            "HTML",
            "html.md"
        )
        val doc2 = Document(
            "CSS",
            "css.md"
        )
        val csJson = """
            {
              "id": "$id",
              "slug": "$slug",
              "name": "$name",
              "description": "$description",
              "provisioner": {
                "type": "$provisioner"
              },
              "documentation": [
                {
                  "name": "${doc1.name}",
                  "path": "${doc1.path}"
                },
                {
                  "name": "${doc2.name}",
                  "path": "${doc2.path}"
                }
              ]
            }
        """.trimIndent()

        val c = json.decodeFromString(Challenge.serializer(), csJson)

        assertEquals(
            Challenge(
                id,
                slug,
                name,
                description,
                Provisioner(provisioner),
                listOf(
                    doc1,
                    doc2
                )
            ), c
        )
    }
}

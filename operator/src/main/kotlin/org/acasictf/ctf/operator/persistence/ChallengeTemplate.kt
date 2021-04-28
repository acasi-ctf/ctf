package org.acasictf.ctf.operator.persistence

import kotlinx.serialization.KSerializer
import kotlinx.serialization.json.Json
import org.acasictf.ctf.operator.model.Challenge
import org.acasictf.ctf.operator.model.ChallengeSet
import java.nio.charset.StandardCharsets

abstract class ChallengeTemplate {
    lateinit var challengeSet: ChallengeSet
    lateinit var challenges: List<Challenge>

    fun init() {
        challengeSet = readChallengeSet()
        challenges = readChallenges(challengeSet.challenges)
    }

    private fun readChallengeSet(): ChallengeSet {
        return readJson("challenge-set.json", ChallengeSet.serializer())!!
    }

    private fun readChallenges(slugs: List<String>) = slugs.map {
        readChallengeJson(it, "challenge.json", Challenge.serializer())!!
    }.toList()

    abstract fun readFile(path: String): ChallengeTemplateFile

    fun <T> readJson(
        path: String,
        ser: KSerializer<T>
    ): T? {
        val cf = readFile(path)
        if (!cf.exists()) {
            return null
        }
        val iS = cf.getInputStream()
        return json.decodeFromString(
            ser,
            iS.readAllBytes().toString(StandardCharsets.UTF_8)
        )
    }

    private fun formatChallengePath(challengeSlug: String, path: String) =
        "challenges/$challengeSlug/$path"

    fun readChallengeFile(challengeSlug: String, path: String) =
        readFile(formatChallengePath(challengeSlug, path))

    fun <T> readChallengeJson(
        challengeSlug: String,
        path: String,
        ser: KSerializer<T>
    ): T? = readJson(formatChallengePath(challengeSlug, path), ser)

    companion object {
        protected val json = Json {
            ignoreUnknownKeys = true
        }
    }
}

package org.acasictf.ctf.operator.persistence

import kotlinx.serialization.KSerializer
import kotlinx.serialization.decodeFromString
import kotlinx.serialization.json.Json
import org.acasictf.ctf.operator.model.Challenge
import org.acasictf.ctf.operator.model.ChallengeSet
import java.io.File
import java.io.InputStream
import java.nio.charset.StandardCharsets
import java.util.zip.ZipEntry
import java.util.zip.ZipFile

class ChallengeTemplate(private val json: Json, file: File) {
    private val zipFile = ZipFile(file)
    val challengeSet: ChallengeSet
    val challenges: List<Challenge>

    init {
        challengeSet = readChallengeSet()
        challenges = readChallenges(challengeSet.challenges)
    }

    fun readChallengeFile(c: Challenge, path: String): ChallengeTemplateFile {
        return ZipChallengeTemplateFile(zipFile, "challenges/${c.slug}/$path")
    }

    fun <T> readChallengeJson(c: Challenge, path: String, ser: KSerializer<T>): T? {
        val cf = readChallengeFile(c, path)
        if (!cf.exists()) {
            return null
        }
        val iS = cf.getInputStream()
        return json.decodeFromString(ser, iS.readAllBytes().toString(StandardCharsets.UTF_8))
    }

    private fun readChallengeSet(): ChallengeSet {
        val csEntry = zipFile.getEntry("challenge-set.json")
        val csStream = zipFile.getInputStream(csEntry)
        val csStr = csStream.readAllBytes().toString(StandardCharsets.UTF_8)

        return json.decodeFromString(ChallengeSet.serializer(), csStr)
    }

    private fun readChallenges(slugs: List<String>) = slugs.map {
        val entry = zipFile.getEntry("challenges/$it/challenge.json")
        val stream = zipFile.getInputStream(entry)
        val str = stream.readAllBytes().toString(StandardCharsets.UTF_8)
        json.decodeFromString(Challenge.serializer(), str)
    }.toList()
}

interface ChallengeTemplateFile {
    fun exists(): Boolean
    fun getInputStream(): InputStream
}

private class ZipChallengeTemplateFile(private val zipFile: ZipFile, path: String) : ChallengeTemplateFile {
    private val zipEntry: ZipEntry? = zipFile.getEntry(path)

    override fun exists() = zipEntry != null
    override fun getInputStream() = zipFile.getInputStream(zipEntry!!)
}

package org.acasictf.ctf.operator

import com.google.protobuf.Empty
import org.acasictf.ctf.proto.Common
import java.io.File
import java.util.*

fun empty() = Empty.newBuilder().build()

fun createDir(path: String): String {
    File(path).mkdir()
    return path
}

fun getDataDir() = System.getenv("DATA_PATH") ?: createDir("data")
fun getChallengesDir() = createDir("${getDataDir()}/challenges")

suspend inline fun <T> managed(f: suspend () -> T) =
    try {
        f()
    } catch (e: Exception) {
        logger.warn("Code in managed call failed!", e)
        throw e
    }

fun generateProtoUuid() = Common.UUID.newBuilder().apply {
    contents = UUID.randomUUID().toString()
}.build()

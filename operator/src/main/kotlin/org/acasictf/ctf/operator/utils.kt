package org.acasictf.ctf.operator

import com.google.protobuf.Empty
import java.io.File

fun empty() = Empty.newBuilder().build()

fun createDir(path: String): String {
    File(path).mkdir()
    return path
}

fun getDataDir() = System.getenv("DATA_PATH") ?: createDir("data")

suspend fun <T> managed(f: suspend () -> T) =
        try {
            f()
        } catch (e: Exception) {
            logger.warn("gRPC call failed!", e)
            throw e
        }

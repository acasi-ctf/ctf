package org.acasictf.ctf.operator.persistence

import java.io.File
import java.util.zip.ZipEntry
import java.util.zip.ZipFile

class ZipChallengeTemplate(file: File) :
    ChallengeTemplate() {
    private val zipFile = ZipFile(file)

    override fun readFile(path: String): ChallengeTemplateFile =
        ZipChallengeTemplateFile(zipFile, path)
}

private class ZipChallengeTemplateFile(
    private val zipFile: ZipFile,
    path: String
) : ChallengeTemplateFile {
    private val zipEntry: ZipEntry? = zipFile.getEntry(path)

    override fun exists() = zipEntry != null
    override fun getInputStream() = zipFile.getInputStream(zipEntry!!)
}

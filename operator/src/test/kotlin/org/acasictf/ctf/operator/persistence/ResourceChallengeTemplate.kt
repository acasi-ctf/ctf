package org.acasictf.ctf.operator.persistence

import java.io.InputStream

class ResourceChallengeTemplate(private val basePath: String) :
    ChallengeTemplate() {
    override fun readFile(path: String): ChallengeTemplateFile {
        val stream = javaClass.getResourceAsStream("/$basePath/$path")!!
        return ResourceChallengeTemplateFile(stream)
    }
}

private class ResourceChallengeTemplateFile(private val stream: InputStream) :
    ChallengeTemplateFile {
    override fun exists() = true
    override fun getInputStream() = stream
}

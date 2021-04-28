package org.acasictf.ctf.operator.persistence

import java.io.InputStream

class FakeChallengeTemplate(private val basePath: String) :
    ChallengeTemplate() {
    override fun readFile(path: String): ChallengeTemplateFile {
        val stream = javaClass.getResourceAsStream("/$basePath/$path")
        return FakeChallengeTemplateFile(stream)
    }
}

private class FakeChallengeTemplateFile(private val stream: InputStream) :
    ChallengeTemplateFile {
    override fun exists() = true
    override fun getInputStream() = stream
}

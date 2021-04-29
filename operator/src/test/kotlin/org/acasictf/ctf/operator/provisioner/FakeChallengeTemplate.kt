package org.acasictf.ctf.operator.provisioner

import org.acasictf.ctf.operator.persistence.ChallengeTemplate
import org.acasictf.ctf.operator.persistence.ChallengeTemplateFile
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

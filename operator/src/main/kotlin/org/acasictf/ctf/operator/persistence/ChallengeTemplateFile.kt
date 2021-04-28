package org.acasictf.ctf.operator.persistence

import java.io.InputStream

interface ChallengeTemplateFile {
    fun exists(): Boolean
    fun getInputStream(): InputStream
}

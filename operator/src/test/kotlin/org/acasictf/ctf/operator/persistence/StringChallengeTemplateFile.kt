package org.acasictf.ctf.operator.persistence

/**
 * Implements a ChallengeTemplateFile which is useful for inlining configuration
 * files in tests by utilizing multiline strings.
 */
class StringChallengeTemplateFile(private val string: String) :
    ChallengeTemplateFile {
    override fun exists() = true
    override fun getInputStream() = string.byteInputStream()
}

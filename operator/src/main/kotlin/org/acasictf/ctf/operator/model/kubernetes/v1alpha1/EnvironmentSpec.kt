package org.acasictf.ctf.operator.model.kubernetes.v1alpha1

class EnvironmentSpec {
    lateinit var templateName: String

    override fun equals(other: Any?): Boolean {
        if (this === other) return true
        if (javaClass != other?.javaClass) return false

        other as EnvironmentSpec

        if (templateName != other.templateName) return false

        return true
    }

    override fun hashCode(): Int {
        return templateName.hashCode()
    }
}

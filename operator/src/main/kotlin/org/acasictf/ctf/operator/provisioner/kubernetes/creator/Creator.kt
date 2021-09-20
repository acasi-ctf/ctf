package org.acasictf.ctf.operator.provisioner.kubernetes.creator

interface Creator {
    fun create(dryRun: Boolean)
    fun delete(dryRun: Boolean)
}
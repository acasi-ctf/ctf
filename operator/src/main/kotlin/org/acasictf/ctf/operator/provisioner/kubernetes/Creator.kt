package org.acasictf.ctf.operator.provisioner.kubernetes

interface Creator {
    fun create(dryRun: Boolean)
    fun delete(dryRun: Boolean)
}
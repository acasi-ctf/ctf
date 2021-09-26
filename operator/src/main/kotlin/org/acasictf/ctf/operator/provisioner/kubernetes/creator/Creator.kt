package org.acasictf.ctf.operator.provisioner.kubernetes.creator

/**
 * Basic interface for creating, updating, and deleting resources
 * with dry run support.
 */
interface Creator {
    /**
     * Create one or more resources.
     * @param dryRun If true, the resources will only be validated, not created.
     */
    fun create(dryRun: Boolean)

    /**
     * Delete one or more resources.
     * @param dryRun If true, the resources will only be validated, not deleted.
     */
    fun delete(dryRun: Boolean)
}

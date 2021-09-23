package org.acasictf.ctf.operator.provisioner.kubernetes.creator

import io.fabric8.kubernetes.api.model.HasMetadata
import io.fabric8.kubernetes.client.dsl.MixedOperation
import org.acasictf.ctf.operator.kubeNamespace

/**
 * Abstraction of [Creator] that abstractly generates
 * a set of resources based on type [T]. It overrides
 * the [create] and [delete] methods in order to
 * automatically create and delete the resources through
 * the Kubernetes client.
 */
abstract class ResourceCreator<T : HasMetadata, L>(
        private val client: MixedOperation<T, L, *>,
) : Creator {
    abstract fun generate(): List<T>

    override fun create(dryRun: Boolean) {
        client.inNamespace(kubeNamespace).apply {
            generate().forEach {
                dryRun(dryRun).createOrReplace(it)
            }
        }
    }

    override fun delete(dryRun: Boolean) {
        client.inNamespace(kubeNamespace).apply {
            generate().forEach {
                withName(it.metadata.name).dryRun(dryRun).delete()
            }
        }
    }
}


package org.acasictf.ctf.operator.provisioner.kubernetes

import io.fabric8.kubernetes.api.model.HasMetadata
import io.fabric8.kubernetes.client.dsl.MixedOperation
import org.acasictf.ctf.operator.kubeNamespace

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


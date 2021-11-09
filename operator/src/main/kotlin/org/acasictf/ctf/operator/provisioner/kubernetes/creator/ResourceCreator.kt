package org.acasictf.ctf.operator.provisioner.kubernetes.creator

import io.fabric8.kubernetes.api.model.HasMetadata
import io.fabric8.kubernetes.client.dsl.MixedOperation
import org.acasictf.ctf.operator.addLabel
import org.acasictf.ctf.operator.ctfEnvIdKey
import org.acasictf.ctf.operator.kubeNamespace
import org.acasictf.ctf.operator.model.kubernetes.v1alpha1.Environment

/**
 * Abstraction of [Creator] that abstractly generates
 * a set of resources based on type [T]. It overrides
 * the [create] and [delete] methods in order to
 * automatically create and delete the resources through
 * the Kubernetes client.
 */
abstract class ResourceCreator<T : HasMetadata, L>(
        private val client: MixedOperation<T, L, *>,
        private val env: Environment
) : Creator {
    abstract fun generate(): List<T>

    override fun create(dryRun: Boolean) {
        client.inNamespace(kubeNamespace).apply {
            generate().forEach {
                it.metadata.addLabel(ctfEnvIdKey, env.metadata.name.replace("chl-", ""))

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


package org.acasictf.ctf.operator.provisioner.kubernetes

import io.fabric8.kubernetes.client.KubernetesClient
import org.acasictf.ctf.operator.model.kubernetes.v1alpha1.EnvTemplate
import org.acasictf.ctf.operator.model.kubernetes.v1alpha1.Environment

class EnvCreator(env: Environment, envTemplate: EnvTemplate, client: KubernetesClient) : Creator {
    private val podCreator = PodCreator(env, envTemplate, client.pods())
    private val creators = listOf(podCreator)

    override fun create(dryRun: Boolean) {
        creators.forEach {
            it.create(dryRun)
        }
    }

    override fun delete(dryRun: Boolean) {
        creators.forEach {
            it.delete(dryRun)
        }
    }
}

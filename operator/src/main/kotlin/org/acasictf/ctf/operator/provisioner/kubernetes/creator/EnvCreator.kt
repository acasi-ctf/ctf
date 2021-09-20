package org.acasictf.ctf.operator.provisioner.kubernetes.creator

import io.fabric8.kubernetes.client.KubernetesClient
import org.acasictf.ctf.operator.model.kubernetes.v1alpha1.EnvTemplate
import org.acasictf.ctf.operator.model.kubernetes.v1alpha1.Environment

class EnvCreator(env: Environment, envTemplate: EnvTemplate, client: KubernetesClient) : Creator {
    private val statefulSetCreator = StatefulSetCreator(env, envTemplate, client.apps().statefulSets())
    private val serviceCreator = ServiceCreator(env, envTemplate, client.services())
    private val ingressCreator = IngressCreator(env, envTemplate, client.network().v1().ingresses())
    private val creators = listOf(statefulSetCreator, serviceCreator, ingressCreator)

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

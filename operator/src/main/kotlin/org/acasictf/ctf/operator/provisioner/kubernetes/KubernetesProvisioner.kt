package org.acasictf.ctf.operator.provisioner.kubernetes

import io.fabric8.kubernetes.client.KubernetesClient
import org.acasictf.ctf.operator.kubeNamespace
import org.acasictf.ctf.operator.meta
import org.acasictf.ctf.operator.model.Challenge
import org.acasictf.ctf.operator.model.Kubernetes
import org.acasictf.ctf.operator.model.kubernetes.v1alpha1.Environment
import org.acasictf.ctf.operator.model.kubernetes.v1alpha1.EnvironmentList
import org.acasictf.ctf.operator.model.kubernetes.v1alpha1.EnvironmentSpec
import org.acasictf.ctf.operator.persistence.ChallengeTemplate
import org.acasictf.ctf.operator.provisioner.Provisioner

class KubernetesProvisioner(
    private val envId: String,
    kube: KubernetesClient
) : Provisioner {
    private val envClient = kube.resources(Environment::class.java, EnvironmentList::class.java)

    override fun provision(c: Challenge) {
        val env = Environment().apply {
            metadata = meta {
                name = envId
            }
            spec = EnvironmentSpec().apply {
                templateName = c.id
            }
        }

        envClient.inNamespace(kubeNamespace).create(env)
    }
}

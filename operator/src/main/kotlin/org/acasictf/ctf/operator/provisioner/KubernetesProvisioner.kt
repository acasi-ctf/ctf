package org.acasictf.ctf.operator.provisioner

import io.fabric8.kubernetes.api.model.EnvVar
import io.fabric8.kubernetes.api.model.ObjectMeta
import io.fabric8.kubernetes.client.KubernetesClient
import org.acasictf.ctf.operator.kubeNamespace
import org.acasictf.ctf.operator.logger
import org.acasictf.ctf.operator.model.Challenge
import org.acasictf.ctf.operator.model.Kubernetes
import org.acasictf.ctf.operator.persistence.ChallengeTemplate
import org.acasictf.ctf.operator.persistence.ProxyPublicKey
import java.io.File

class KubernetesProvisioner(
    private val kube: KubernetesClient,
    private val envId: String,
    private val challengeTemplate: ChallengeTemplate
) : Provisioner {
    override fun provision(c: Challenge) {
        val provisioner =
            challengeTemplate.readChallengeJson(
                c.slug,
                "kubernetes.json",
                Kubernetes.serializer()
            ) ?: throw Exception("Failed to read challenge provisioner config")

        val pods = provisioner.manifests.pods.mapIndexed { i, it ->
            val podFile = challengeTemplate.readChallengeFile(c.slug, it)
            val pod = kube.pods().inNamespace(kubeNamespace)
                .load(podFile.getInputStream()).get()

            if (pod.spec == null) {
                throw Exception("Pod spec is null")
            }
            if (pod.spec.containers == null || pod.spec.containers.size == 0) {
                throw Exception("Pod spec.containers null or empty")
            }

            val isPenimage = pod.metadata?.name == "penimage"
            val hasIngress = pod.metadata.labels["ctf-svc-type"] == "ingress"
            if (pod.metadata == null) {
                pod.metadata = ObjectMeta()
            }
            if (pod.metadata.labels == null) {
                pod.metadata.labels = mutableMapOf()
            }
            pod.metadata.name = "ctf-$envId-$i"
            pod.metadata.namespace = kubeNamespace
            pod.metadata.labels["ctf-env-id"] = envId

            if (isPenimage) {
                val envVar = EnvVar().apply {
                    name = "PUBLIC_KEY"
                    value = ProxyPublicKey.publicKey
                }
                pod.spec.containers.forEach {
                    it.env.add(envVar)
                }
            }
            if (hasIngress) {

            }

            try {
                kube.pods().inNamespace(kubeNamespace).dryRun().create(pod)
            } catch (e: Exception) {
                throw Exception("Failed to dry run create pod", e)
            }

            pod
        }

        pods.forEach {
            kube.pods().inNamespace(kubeNamespace).create(it)
        }
    }
}

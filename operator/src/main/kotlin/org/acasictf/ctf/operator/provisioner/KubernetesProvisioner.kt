package org.acasictf.ctf.operator.provisioner

import io.fabric8.kubernetes.api.model.EnvVar
import io.fabric8.kubernetes.api.model.ObjectMeta
import io.fabric8.kubernetes.client.KubernetesClient
import org.acasictf.ctf.operator.kubeNamespace
import org.acasictf.ctf.operator.logger
import org.acasictf.ctf.operator.model.Challenge
import org.acasictf.ctf.operator.model.Kubernetes
import org.acasictf.ctf.operator.persistence.ChallengeTemplate
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
            val isPenimage = pod.metadata?.name == "penimage"
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
                if (pod.spec != null && pod.spec.containers != null) {
                    val publicKeyFile =
                        File("/secrets/auth-key-public/id_rsa.pub")
                    val publicKey = if (publicKeyFile.exists()) {
                        publicKeyFile.readText()
                    } else {
                        logger.warn("Failed to find public key secret")
                        ""
                    }
                    val envVar = EnvVar().apply {
                        name = "PUBLIC_KEY"
                        value = publicKey
                    }
                    pod.spec.containers.forEach {
                        if (it.env == null) {
                            it.env = mutableListOf()
                        }
                        it.env.add(envVar)
                    }
                }
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
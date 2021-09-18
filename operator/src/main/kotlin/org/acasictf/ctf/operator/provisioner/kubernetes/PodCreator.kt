package org.acasictf.ctf.operator.provisioner.kubernetes

import io.fabric8.kubernetes.api.model.Pod
import io.fabric8.kubernetes.api.model.PodList
import io.fabric8.kubernetes.client.dsl.MixedOperation
import io.fabric8.kubernetes.client.dsl.PodResource
import org.acasictf.ctf.operator.container
import org.acasictf.ctf.operator.meta
import org.acasictf.ctf.operator.model.kubernetes.v1alpha1.EnvTemplate
import org.acasictf.ctf.operator.model.kubernetes.v1alpha1.Environment
import org.acasictf.ctf.operator.pod
import org.acasictf.ctf.operator.podSpec

class PodCreator(
    private val env: Environment,
    private val envTemplate: EnvTemplate,
    client: MixedOperation<Pod, PodList, PodResource<Pod>>
) : ResourceCreator<Pod, PodList>(client) {
    override fun generate() = envTemplate.spec.pods.map {
        pod {
            metadata = meta {
                name = "${env.metadata.name}-${it.metadata.name}"
                labels = it.metadata.labels
            }
            spec = podSpec {
                containers = it.spec.containers.map { c ->
                    container {
                        name = c.name
                        image = c.image
                    }
                }
            }
        }
    }
}
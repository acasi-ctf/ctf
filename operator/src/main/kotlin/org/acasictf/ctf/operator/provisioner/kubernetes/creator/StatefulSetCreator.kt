package org.acasictf.ctf.operator.provisioner.kubernetes.creator

import io.fabric8.kubernetes.api.model.apps.StatefulSet
import io.fabric8.kubernetes.api.model.apps.StatefulSetList
import io.fabric8.kubernetes.client.dsl.MixedOperation
import org.acasictf.ctf.operator.*
import org.acasictf.ctf.operator.model.kubernetes.v1alpha1.EnvTemplate
import org.acasictf.ctf.operator.model.kubernetes.v1alpha1.Environment

/**
 * Implementation of [ResourceCreator] that will create the
 * stateful set resources for an environment which is based off
 * of an environment template.
 */
class StatefulSetCreator(
    private val env: Environment,
    private val envTemplate: EnvTemplate,
    client: MixedOperation<StatefulSet, StatefulSetList, *>
) : ResourceCreator<StatefulSet, StatefulSetList>(client) {
    override fun generate() = envTemplate.spec.pods.map {
        statefulSet {
            metadata = meta {
                name = "${env.metadata.name}-${it.metadata.name}"
            }
            spec = statefulSetSpec {
                selector = labelSelector {
                    matchLabels = remapLabels(env, it.metadata.labels)
                }
                template = podTemplateSpec {
                    metadata = meta {
                        labels = remapLabels(env, it.metadata.labels)
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
    }
}

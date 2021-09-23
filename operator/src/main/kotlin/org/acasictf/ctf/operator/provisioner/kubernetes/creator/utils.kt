package org.acasictf.ctf.operator.provisioner.kubernetes.creator

import org.acasictf.ctf.operator.model.kubernetes.v1alpha1.Environment

/**
 * Remap an environment's labels (or label selector, etc.) to the
 * specific values that are unique to this environment, so that
 * there is no overlap between different user environments.
 */
fun remapLabels(env: Environment, labels: Map<String, String>) = labels.mapValues {
    "${env.metadata.name}-${it.value}"
}

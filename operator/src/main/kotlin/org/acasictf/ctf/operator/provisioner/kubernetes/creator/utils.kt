package org.acasictf.ctf.operator.provisioner.kubernetes.creator

import org.acasictf.ctf.operator.model.kubernetes.v1alpha1.Environment

fun remapLabels(env: Environment, labels: Map<String, String>) = labels.mapValues {
    "${env.metadata.name}-${it.value}"
}

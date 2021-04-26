package org.acasictf.ctf.operator.model

import kotlinx.serialization.Serializable

@Serializable
data class Kubernetes(
        val manifests: Manifests
)

@Serializable
data class Manifests(
        val pods: List<String>
)

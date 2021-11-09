package org.acasictf.ctf.operator.model

import kotlinx.serialization.Serializable

@Serializable
data class Kubernetes(
    val templatePath: String,
    val templateCRDVersion: String
)

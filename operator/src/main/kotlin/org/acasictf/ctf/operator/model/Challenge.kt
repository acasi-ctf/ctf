package org.acasictf.ctf.operator.model

import kotlinx.serialization.Serializable

@Serializable
data class Challenge(
        val id: String,
        val slug: String,
        val name: String,
        val description: String,
        val provisioner: Provisioner,
        val documentation: List<Document>
)

@Serializable
data class Provisioner(
        val type: String
)

@Serializable
data class Document(
        val name: String,
        val path: String
)

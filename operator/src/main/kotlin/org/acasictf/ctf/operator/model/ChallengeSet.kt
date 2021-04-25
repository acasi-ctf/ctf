package org.acasictf.ctf.operator.model

import kotlinx.serialization.Serializable

@Serializable
data class ChallengeSet(
        val id: String,
        val slug: String,
        val name: String,
        val description: String,
        val version: String,
        val challenges: List<String>
)

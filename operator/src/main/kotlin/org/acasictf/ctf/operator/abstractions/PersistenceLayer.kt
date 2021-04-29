package org.acasictf.ctf.operator.abstractions

import org.acasictf.ctf.operator.persistence.ChallengeTemplate
import org.mapdb.DB

interface PersistenceLayer {
    fun database(): DB
    fun createChallengeTemplate(csId: String): ChallengeTemplate
}

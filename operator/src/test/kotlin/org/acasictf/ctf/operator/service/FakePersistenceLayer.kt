package org.acasictf.ctf.operator.service

import org.acasictf.ctf.operator.abstractions.PersistenceLayer
import org.acasictf.ctf.operator.persistence.ChallengeTemplate
import org.acasictf.ctf.operator.provisioner.FakeChallengeTemplate
import org.mapdb.DBMaker

class FakePersistenceLayer : PersistenceLayer {
    private val db = DBMaker.memoryDB().closeOnJvmShutdown().make()

    override fun database() = db
    override fun createChallengeTemplate(csId: String): ChallengeTemplate {
        return FakeChallengeTemplate(csId)
    }
}

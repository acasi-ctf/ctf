package org.acasictf.ctf.operator.persistence

import org.acasictf.ctf.operator.abstractions.PersistenceLayer
import org.acasictf.ctf.operator.getChallengesDir
import org.mapdb.DB
import org.mapdb.DBMaker
import java.io.File

class PersistenceLayerImpl(
    dataDir: String,
    private val challengesDir: String
) : PersistenceLayer {
    private val db = DBMaker.fileDB("$dataDir/operator.db")
            .closeOnJvmShutdown()
            .make()

    override fun database() = db

    override fun createChallengeTemplate(csId: String): ChallengeTemplate {
        val ctFile = File(challengesDir).resolve("$csId.zip")
        if (!ctFile.exists()) {
            throw Exception("Challenge template does not exist")
        }
        return ZipChallengeTemplate(ctFile)
    }
}
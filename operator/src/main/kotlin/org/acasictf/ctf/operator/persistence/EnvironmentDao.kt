package org.acasictf.ctf.operator.persistence

import org.acasictf.ctf.proto.Common
import org.acasictf.ctf.proto.CtfoperatorInternal
import org.mapdb.DB
import org.mapdb.Serializer

class EnvironmentDao(private val db: DB) {
    private val environments = db.hashMap("environments",
            Serializer.BYTE_ARRAY, Serializer.BYTE_ARRAY).createOrOpen()

    fun set(uuid: Common.UUID, env: CtfoperatorInternal.Environment) {
        val uuidBytes = uuid.toByteArray()
        val envBytes = env.toByteArray()

        environments[uuidBytes] = envBytes
        db.commit()
    }

    fun list(): Map<Common.UUID, CtfoperatorInternal.Environment> =
            environments.map {
                Common.UUID.parseFrom(it.key) to
                        CtfoperatorInternal.Environment.parseFrom(it.value)
            }.toMap()
}

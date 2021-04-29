package org.acasictf.ctf.operator.persistence

import org.acasictf.ctf.operator.generateProtoUuid
import org.acasictf.ctf.proto.CtfoperatorInternal.Environment
import org.acasictf.ctf.proto.CtfoperatorInternal.ProvisionerType
import org.mapdb.DB
import org.mapdb.DBMaker
import org.mapdb.HTreeMap
import org.mapdb.Serializer
import kotlin.test.*

class EnvironmentDaoTest {
    private val envId = generateProtoUuid()
    private val env = Environment.newBuilder().apply {
        createdTimeBuilder.apply {
            seconds = 123
            nanos = 1
        }
        lastPingTimeBuilder.apply {
            seconds = 321
            nanos = 2
        }
        challengeSetId = generateProtoUuid()
        challengeId = generateProtoUuid()
        provisionerType = ProvisionerType.KUBERNETES
        ownerId = generateProtoUuid()
    }.build()

    private lateinit var db: DB
    private lateinit var envDao: EnvironmentDao
    private lateinit var environments: HTreeMap<ByteArray, ByteArray>

    /**
     * Open an in-memory database before each test.
     */
    @BeforeTest
    fun beforeTest() {
        db = DBMaker.memoryDB().make()
        envDao = EnvironmentDao(db)
        environments = db.hashMap(
            "environments",
            Serializer.BYTE_ARRAY, Serializer.BYTE_ARRAY
        ).createOrOpen()
    }

    /**
     * Close the in-memory database after each test.
     */
    @AfterTest
    fun afterTest() {
        db.close()
    }

    /**
     * Use the set operation on the DAO and ensure that the backing database
     * has the correct value stored.
     */
    @Test
    fun `set environment`() {
        envDao.set(envId, env)

        assertTrue(env.toByteArray() contentEquals environments[envId.toByteArray()])
    }

    /**
     * Store an environment in the database, then use the DAO to ensure that the
     * get operation returns the correct object.
     */
    @Test
    fun `get environment`() {
        environments[envId.toByteArray()] = env.toByteArray()

        val envGet = envDao.get(envId)

        assertEquals(env, envGet)
    }

    /**
     * Store an environment in the database, then use the DAO to remove the
     * object and verify that it was removed from the database.
     */
    @Test
    fun `remove environment`() {
        environments[envId.toByteArray()] = env.toByteArray()

        envDao.remove(envId)

        assertTrue(environments.isEmpty())
    }

    /**
     * Store two environments and list the environments through the DAO,
     * ensuring that the returned list contains the correct environments.
     */
    @Test
    fun `list environments`() {
        val envId1 = generateProtoUuid()
        val envId2 = generateProtoUuid()
        environments[envId1.toByteArray()] = env.toByteArray()
        environments[envId2.toByteArray()] = env.toByteArray()

        val list = envDao.list()

        assertEquals(list[envId1], env)
        assertEquals(list[envId2], env)
    }
}

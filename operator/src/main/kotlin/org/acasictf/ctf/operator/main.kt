package org.acasictf.ctf.operator

import io.fabric8.kubernetes.client.DefaultKubernetesClient
import io.grpc.ServerBuilder
import mu.KotlinLogging
import org.acasictf.ctf.operator.persistence.EnvironmentDao
import org.acasictf.ctf.operator.service.LookupService
import org.acasictf.ctf.operator.service.ProvisioningService
import org.mapdb.DBMaker

private val logger = KotlinLogging.logger {}

fun main() {
    val client = DefaultKubernetesClient()
    val dbPath = System.getenv("DB_PATH") ?: "operator.db"
    val db = DBMaker.fileDB(dbPath)
            .closeOnJvmShutdown()
            .make()
    val envDao = EnvironmentDao(db)
    val server = ServerBuilder.forPort(1234)
            .addService(ProvisioningService(envDao, client))
            .addService(LookupService(client))
            .build()

    Runtime.getRuntime().addShutdownHook(Thread {
        server.shutdown()
    })

    logger.info("Listening on port 1234")

    server.start()
    server.awaitTermination()
}

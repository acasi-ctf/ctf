package org.acasictf.ctf.operator

import io.fabric8.kubernetes.client.DefaultKubernetesClient
import io.grpc.ServerBuilder
import mu.KotlinLogging
import org.acasictf.ctf.operator.persistence.EnvironmentDao
import org.acasictf.ctf.operator.persistence.PersistenceLayerImpl
import org.acasictf.ctf.operator.persistence.ProxyPublicKey
import org.acasictf.ctf.operator.service.LookupService
import org.acasictf.ctf.operator.service.ProvisioningService
import java.io.File

val logger = KotlinLogging.logger {}

fun main() {
    ProxyPublicKey.publicKey =
        File("/secrets/auth-key-public/id_rsa.pub").readText()
    val client = DefaultKubernetesClient()
    val persistenceLayer =
        PersistenceLayerImpl(getDataDir(), getChallengesDir())
    val db = persistenceLayer.database()
    val envDao = EnvironmentDao(db)
    val server = ServerBuilder.forPort(1234)
        .addService(ProvisioningService(client, persistenceLayer))
        .addService(LookupService(envDao, client))
        .build()

    kubeNamespace = client.namespace

    Runtime.getRuntime().addShutdownHook(Thread {
        server.shutdown()
    })

    logger.info("Listening on port 1234")

    server.start()
    server.awaitTermination()
}

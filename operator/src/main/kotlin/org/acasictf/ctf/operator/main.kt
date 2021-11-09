package org.acasictf.ctf.operator

import io.fabric8.kubernetes.client.DefaultKubernetesClient
import io.grpc.ServerBuilder
import mu.KotlinLogging
import org.acasictf.ctf.operator.model.kubernetes.v1alpha1.Environment
import org.acasictf.ctf.operator.model.kubernetes.v1alpha1.EnvironmentList
import org.acasictf.ctf.operator.persistence.EnvironmentDao
import org.acasictf.ctf.operator.persistence.PersistenceLayerImpl
import org.acasictf.ctf.operator.persistence.GlobalConfig
import org.acasictf.ctf.operator.provisioner.kubernetes.EnvListener
import org.acasictf.ctf.operator.service.LookupService
import org.acasictf.ctf.operator.service.ProvisioningService
import java.io.File
import java.time.Duration

val logger = KotlinLogging.logger("CtfOperator")

fun main() {
    GlobalConfig.publicKey = if (System.getProperty("ctf.magic.operator.disableKey") == "true") {
        ""
    } else {
        File("/secrets/auth-key-public/id_rsa.pub").readText()
    }
    GlobalConfig.baseUrl = System.getenv("BASE_URL") ?: "ctf.example.com"

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

    val informerFactory = client.informers()

    val envInformer = informerFactory
        .inNamespace(kubeNamespace)
        .sharedIndexInformerForCustomResource(
            Environment::class.java,
            EnvironmentList::class.java,
            Duration.ofSeconds(60).toMillis()
        )

    val envListener = EnvListener(client, envInformer)
    envListener.init()

    informerFactory.startAllRegisteredInformers()

    logger.info("Listening on port 1234")

    server.start()
    server.awaitTermination()
}

package org.acasictf.ctf.operator.provisioner.kubernetes

import io.fabric8.kubernetes.client.KubernetesClient
import io.fabric8.kubernetes.client.informers.ResourceEventHandler
import io.fabric8.kubernetes.client.informers.SharedIndexInformer
import org.acasictf.ctf.operator.logger
import org.acasictf.ctf.operator.model.kubernetes.v1alpha1.EnvTemplate
import org.acasictf.ctf.operator.model.kubernetes.v1alpha1.EnvTemplateList
import org.acasictf.ctf.operator.model.kubernetes.v1alpha1.Environment
import org.acasictf.ctf.operator.provisioner.kubernetes.creator.EnvCreator

/**
 * This class is essentially a wrapper for a concept that is provided by Kubernetes called an informer.
 * An informer is used by an application to subscribe to one type of resource, and the Kubernetes API
 * server will notify upon addition, update, or deletion of each resource. This will delegate out to an
 * instance of EnvCreator to perform the mapping and transformations from our custom resource to standard
 * resources that Kubernetes can do something real with!
 */
class EnvListener(private val client: KubernetesClient, private val informer: SharedIndexInformer<Environment>) :
    ResourceEventHandler<Environment> {
    private val envTemplates = client.customResources(EnvTemplate::class.java, EnvTemplateList::class.java)

    init {
        informer.addEventHandler(this)
    }

    private fun creator(environment: Environment): EnvCreator? {
        val envTemplate = envTemplates.withName(environment.spec.templateName).get() ?: return null
        return EnvCreator(environment, envTemplate, client)
    }

    // TODO: Implement and use finalizers!

    /**
     * When the Kubernetes API server receives a new resource, this callback will be invoked with the respective
     * resource contents.
     */
    override fun onAdd(obj: Environment) {
        logger.info("EnvListener onAdd")

        val creator = creator(obj)
        if (creator == null) {
            logger.warn("Failed to create creator!")
            return
        }

        // Dry run
        creator.create(true)

        // Actual create
        creator.create(false)
    }

    /**
     * When the Kubernetes API server receives an update to a resource, this callback will be invoked with the
     * old and new copies for the respective resource's contents.
     */
    override fun onUpdate(oldObj: Environment, newObj: Environment) {
        logger.info("EnvListener onUpdate")

        if (oldObj == newObj) {
            logger.info("${oldObj.javaClass.name} oldObj == newObj")
            return
        }

        val creator = creator(newObj)
        if (creator == null) {
            logger.warn("Failed to create creator!")
            return
        }

        // Dry run
        creator.create(true)

        // Actual create
        creator.create(false)
    }

    /**
     * When the Kubernetes API server receives a request to delete a resource, this callback will be invoked with the
     * respective resource's contents.
     */
    override fun onDelete(obj: Environment, deletedFinalStateUnknown: Boolean) {
        logger.info("EnvListener onDelete")

        val creator = creator(obj)
        if (creator == null) {
            logger.warn("Failed to create creator!")
            return
        }

        // Dry run
        creator.delete(true)

        // Actual create
        creator.delete(false)
    }

    /**
     * Initialize and sync the informer, then log to the console and notify that this process has completed.
     */
    fun init() {
        if (!informer.hasSynced()) {
            Thread.sleep(1)
        }

        logger.info("Sync complete")
    }
}

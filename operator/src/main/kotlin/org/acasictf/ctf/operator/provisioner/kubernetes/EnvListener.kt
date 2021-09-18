package org.acasictf.ctf.operator.provisioner.kubernetes

import io.fabric8.kubernetes.client.KubernetesClient
import io.fabric8.kubernetes.client.informers.ResourceEventHandler
import io.fabric8.kubernetes.client.informers.SharedIndexInformer
import org.acasictf.ctf.operator.logger
import org.acasictf.ctf.operator.model.kubernetes.v1alpha1.EnvTemplate
import org.acasictf.ctf.operator.model.kubernetes.v1alpha1.EnvTemplateList
import org.acasictf.ctf.operator.model.kubernetes.v1alpha1.Environment

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

    override fun onAdd(obj: Environment) {
        logger.info("EnvListener onAdd")

        val creator = creator(obj)
        if (creator == null) {
            logger.warn("Failed to create creator!")
            return
        }

        creator.create(false)
    }

    override fun onUpdate(oldObj: Environment, newObj: Environment) {
        logger.info("EnvListener onUpdate")

        if (oldObj == newObj) {
            logger.info("${oldObj.javaClass.name} oldObj == newObj")
            return
        }
    }

    override fun onDelete(obj: Environment, deletedFinalStateUnknown: Boolean) {
        logger.info("EnvListener onDelete")
    }

    fun init() {
        if (!informer.hasSynced()) {
            Thread.sleep(1)
        }

        logger.info("Sync complete")
    }
}

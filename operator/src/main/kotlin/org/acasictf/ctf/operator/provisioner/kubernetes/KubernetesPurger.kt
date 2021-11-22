package org.acasictf.ctf.operator.provisioner.kubernetes

import io.fabric8.kubernetes.client.KubernetesClient
import org.acasictf.ctf.operator.model.kubernetes.v1alpha1.Environment
import org.acasictf.ctf.operator.model.kubernetes.v1alpha1.EnvironmentList
import org.acasictf.ctf.operator.provisioner.Purger
import java.time.Instant
import java.time.temporal.ChronoUnit

class KubernetesPurger(kube: KubernetesClient) : Purger {
  private val envClient = kube.resources(Environment::class.java, EnvironmentList::class.java)

  override fun purge(): Int {
    val envList = envClient.list()
    val envsToDelete = envList.items.filter {
      val creation = Instant.parse(it.metadata.creationTimestamp)
      val expiry = creation.plus(1, ChronoUnit.HOURS)
      expiry < Instant.now()
    }

    envClient.delete(envsToDelete)

    return envsToDelete.size
  }
}

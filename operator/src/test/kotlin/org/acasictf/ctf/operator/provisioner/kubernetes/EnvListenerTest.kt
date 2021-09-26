package org.acasictf.ctf.operator.provisioner.kubernetes

import io.fabric8.kubernetes.client.DefaultKubernetesClient
import io.fabric8.kubernetes.client.informers.SharedIndexInformer
import io.fabric8.kubernetes.client.server.mock.KubernetesServer
import io.mockk.every
import io.mockk.mockk
import io.mockk.spyk
import io.mockk.verify
import kotlinx.coroutines.delay
import org.acasictf.ctf.operator.meta
import org.acasictf.ctf.operator.model.kubernetes.v1alpha1.Environment
import org.acasictf.ctf.operator.model.kubernetes.v1alpha1.EnvironmentSpec
import org.acasictf.ctf.operator.provisioner.kubernetes.creator.EnvCreator
import kotlin.test.AfterTest
import kotlin.test.BeforeTest
import kotlin.test.Test

internal class EnvListenerTest {
  private val env = Environment().apply {
    metadata = meta {
      name = "test123"
    }
    spec = EnvironmentSpec().apply {
      templateName = "template123"
    }
  }
  private val env2 = Environment().apply {
    metadata = meta {
      name = "test123"
    }
    spec = EnvironmentSpec().apply {
      templateName = "template321"
    }
  }

  private lateinit var envListener: EnvListener
  private lateinit var server: KubernetesServer
  private lateinit var envCreator: EnvCreator

  @BeforeTest
  fun before() {
    server = KubernetesServer(true, false)
    server.before()

    val informer = mockk<SharedIndexInformer<Environment>>(relaxed = true)

    val el = EnvListener(server.client, informer)
    envListener = spyk(el)

    envCreator = mockk(relaxed = true)

    every { envListener["creator"](any<Environment>()) } returns envCreator
  }

  @AfterTest
  fun after() {
    server.after()
  }

  @Test
  fun onAdd() {
    envListener.onAdd(env)

    verify { envCreator.create(true) }
    verify { envCreator.create(false) }
  }

  @Test
  fun onUpdateEquals() {
    envListener.onUpdate(env, env)

    verify(exactly = 0) { envCreator.create(true) }
    verify(exactly = 0) { envCreator.create(false) }
  }

  @Test
  fun onUpdateNotEquals() {
    envListener.onUpdate(env, env2)

    verify { envCreator.create(true) }
    verify { envCreator.create(false) }
  }

  @Test
  fun onDelete() {
    envListener.onDelete(env, false)

    verify { envCreator.delete(true) }
    verify { envCreator.delete(false) }
  }
}
package org.acasictf.ctf.operator.testutil

import io.fabric8.kubernetes.client.server.mock.KubernetesServer
import kotlinx.coroutines.delay
import kotlinx.coroutines.runBlocking
import java.util.*

typealias ServerAcceptor = (server: KubernetesServer) -> Unit

fun createUuidStr() = UUID.randomUUID().toString()
fun createKubernetesMock(crud: Boolean) = KubernetesServer(true, crud)
private fun mockDecorator(crudMode: Boolean, f: ServerAcceptor) = runBlocking {
    val server = createKubernetesMock(crudMode)
    server.before()
    delay(1000)
    f(server)
    server.after()
}

fun k8sExpect(f: ServerAcceptor) = mockDecorator(false, f)
fun k8sCrud(f: ServerAcceptor) = mockDecorator(true, f)

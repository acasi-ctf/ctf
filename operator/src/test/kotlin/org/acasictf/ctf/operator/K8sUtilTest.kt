package org.acasictf.ctf.operator

import kotlin.test.Test
import kotlin.test.assertNotNull

class K8sUtilTest {
    @Test
    fun meta() {
        assertNotNull(meta { })
    }

    @Test
    fun labelSelector() {
        assertNotNull(labelSelector { })
    }

    @Test
    fun container() {
        assertNotNull(container {})
    }

    @Test
    fun pod() {
        assertNotNull(pod {})
    }

    @Test
    fun podSpec() {
        assertNotNull(podSpec {})
    }

    @Test
    fun podTemplateSpec() {
        assertNotNull(podTemplateSpec { })
    }

    @Test
    fun statefulSet() {
        assertNotNull(statefulSet { })
    }

    @Test
    fun statefulSetSpec() {
        assertNotNull(statefulSetSpec { })
    }

    @Test
    fun service() {
        assertNotNull(service { })
    }

    @Test
    fun serviceSpec() {
        assertNotNull(serviceSpec { })
    }

    @Test
    fun port() {
        assertNotNull(port { })
    }

    @Test
    fun ingress() {
        assertNotNull(ingress { })
    }

    @Test
    fun ingressSpec() {
        assertNotNull(ingressSpec {})
    }

    @Test
    fun ingressRule() {
        assertNotNull(ingressRule {})
    }

    @Test
    fun ingressHttp() {
        assertNotNull(ingressHttp { })
    }

    @Test
    fun ingressHttpPath() {
        assertNotNull(ingressHttpPath { })
    }

    @Test
    fun ingressBackend() {
        assertNotNull(ingressBackend { })
    }

    @Test
    fun ingressServiceBackend() {
        assertNotNull(ingressServiceBackend { })
    }

    @Test
    fun ingressServiceBackendPort() {
        assertNotNull(ingressServiceBackendPort { })
    }
}

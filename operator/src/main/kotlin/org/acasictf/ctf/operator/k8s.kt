package org.acasictf.ctf.operator

import io.fabric8.kubernetes.api.model.*
import io.fabric8.kubernetes.api.model.apps.StatefulSet
import io.fabric8.kubernetes.api.model.apps.StatefulSetSpec
import io.fabric8.kubernetes.api.model.networking.v1.*

fun meta(f: ObjectMeta.() -> Unit) = ObjectMeta().apply(f)

fun labelSelector(f: LabelSelector.() -> Unit) = LabelSelector().apply(f)

fun container(f: Container.() -> Unit) = Container().apply(f)

fun pod(f: Pod.() -> Unit) = Pod().apply(f)
fun podSpec(f: PodSpec.() -> Unit) = PodSpec().apply(f)
fun podTemplateSpec(f: PodTemplateSpec.() -> Unit) = PodTemplateSpec().apply(f)

fun statefulSet(f: StatefulSet.() -> Unit) = StatefulSet().apply(f)
fun statefulSetSpec(f: StatefulSetSpec.() -> Unit) = StatefulSetSpec().apply(f)

fun service(f: Service.() -> Unit) = Service().apply(f)
fun serviceSpec(f: ServiceSpec.() -> Unit) = ServiceSpec().apply(f)
fun port(f: ServicePort.() -> Unit) = ServicePort().apply(f)

fun ingress(f: Ingress.() -> Unit) = Ingress().apply(f)
fun ingressSpec(f: IngressSpec.() -> Unit) = IngressSpec().apply(f)
fun ingressRule(f: IngressRule.() -> Unit) = IngressRule().apply(f)
fun ingressHttp(f: HTTPIngressRuleValue.() -> Unit) = HTTPIngressRuleValue().apply(f)
fun ingressHttpPath(f: HTTPIngressPath.() -> Unit) = HTTPIngressPath().apply(f)
fun ingressBackend(f: IngressBackend.() -> Unit) = IngressBackend().apply(f)
fun ingressServiceBackend(f: IngressServiceBackend.() -> Unit) = IngressServiceBackend().apply(f)
fun ingressServiceBackendPort(f: ServiceBackendPort.() -> Unit) = ServiceBackendPort().apply(f)

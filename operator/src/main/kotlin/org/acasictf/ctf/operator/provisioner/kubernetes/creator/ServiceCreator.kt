package org.acasictf.ctf.operator.provisioner.kubernetes.creator

import io.fabric8.kubernetes.api.model.IntOrString
import io.fabric8.kubernetes.api.model.Service
import io.fabric8.kubernetes.api.model.ServiceList
import io.fabric8.kubernetes.client.dsl.MixedOperation
import io.fabric8.kubernetes.client.dsl.ServiceResource
import org.acasictf.ctf.operator.meta
import org.acasictf.ctf.operator.model.kubernetes.v1alpha1.EnvTemplate
import org.acasictf.ctf.operator.model.kubernetes.v1alpha1.EnvTemplateServiceSpecPortProtocol
import org.acasictf.ctf.operator.model.kubernetes.v1alpha1.Environment
import org.acasictf.ctf.operator.port
import org.acasictf.ctf.operator.service
import org.acasictf.ctf.operator.serviceSpec

/**
 * Implementation of [ResourceCreator] that will create the
 * service resources for an environment which is based off
 * of an environment template.
 */
class ServiceCreator(
    private val env: Environment,
    private val envTemplate: EnvTemplate,
    client: MixedOperation<Service, ServiceList, ServiceResource<Service>>
) : ResourceCreator<Service, ServiceList>(client) {
    override fun generate() = envTemplate.spec.services.map {
        service {
            metadata = meta {
                name = "${env.metadata.name}-${it.metadata.name}"
            }
            spec = serviceSpec {
                selector = remapLabels(env, it.spec.selector)
                ports = it.spec.ports.map { portDef ->
                    port {
                        name = portDef.name
                        port = portDef.port
                        if (portDef.targetPort != null) {
                            targetPort = IntOrString(portDef.targetPort)
                        }
                        protocol = when (portDef.protocol) {
                            EnvTemplateServiceSpecPortProtocol.Tcp -> "TCP"
                            EnvTemplateServiceSpecPortProtocol.Udp -> "UDP"
                        }
                    }
                }
            }
        }
    }
}

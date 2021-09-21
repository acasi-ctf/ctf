package org.acasictf.ctf.operator.provisioner.kubernetes.creator

import io.fabric8.kubernetes.api.model.networking.v1.Ingress
import io.fabric8.kubernetes.api.model.networking.v1.IngressList
import io.fabric8.kubernetes.client.dsl.MixedOperation
import org.acasictf.ctf.operator.*
import org.acasictf.ctf.operator.model.kubernetes.v1alpha1.EnvTemplate
import org.acasictf.ctf.operator.model.kubernetes.v1alpha1.EnvTemplateIngressPathType
import org.acasictf.ctf.operator.model.kubernetes.v1alpha1.Environment
import org.acasictf.ctf.operator.persistence.GlobalConfig

class IngressCreator(
    private val env: Environment,
    private val envTemplate: EnvTemplate,
    client: MixedOperation<Ingress, IngressList, *>
) : ResourceCreator<Ingress, IngressList>(client) {
    override fun generate() = envTemplate.spec.ingresses.map {
        ingress {
            metadata = meta {
                name = "${env.metadata.name}-${it.metadata.name}"
                annotations = mapOf(
                    "nginx.ingress.kubernetes.io/ssl-redirect" to "false"
                )
            }
            spec = ingressSpec {
                rules = listOf(
                    ingressRule {
                        host = "${env.metadata.name}-${it.metadata.name}.${GlobalConfig.baseUrl}"
                        http = ingressHttp {
                            paths = listOf(
                                ingressHttpPath {
                                    path = it.spec.path
                                    pathType = when (it.spec.pathType) {
                                        EnvTemplateIngressPathType.Prefix -> "Prefix"
                                        EnvTemplateIngressPathType.Exact -> "Exact"
                                        EnvTemplateIngressPathType.ImplementationSpecific -> "ImplementationSpecific"
                                    }
                                    backend = ingressBackend {
                                        service = ingressServiceBackend {
                                            val be = it.spec.backend.service
                                            name = "${env.metadata.name}-${be.name}"
                                            port = ingressServiceBackendPort {
                                                name = be.port.name
                                                number = be.port.number
                                            }
                                        }
                                    }
                                }
                            )
                        }
                    }
                )
            }
        }
    }
}

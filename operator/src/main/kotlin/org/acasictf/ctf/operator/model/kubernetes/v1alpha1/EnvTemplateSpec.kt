package org.acasictf.ctf.operator.model.kubernetes.v1alpha1

import com.fasterxml.jackson.annotation.JsonProperty

class EnvTemplateSpec {
    lateinit var pods: List<EnvTemplatePod>
    lateinit var services: List<EnvTemplateService>
    lateinit var ingresses: List<EnvTemplateIngress>
}

class EnvTemplatePod {
    lateinit var metadata: EnvTemplatePodMetadata
    lateinit var spec: EnvTemplatePodSpec
}

class EnvTemplatePodMetadata {
    lateinit var name: String
    lateinit var labels: Map<String, String>
}

class EnvTemplatePodSpec {
    lateinit var containers: List<EnvTemplatePodSpecContainer>
}

class EnvTemplatePodSpecContainer {
    var name: String? = null
    lateinit var image: String
}

class EnvTemplateService {
    lateinit var metadata: EnvTemplateServiceMetadata
    lateinit var spec: EnvTemplateServiceSpec
}

class EnvTemplateServiceMetadata {
    lateinit var name: String
}

class EnvTemplateServiceSpec {
    lateinit var selector: Map<String, String>
    lateinit var ports: List<EnvTemplateServiceSpecPort>
}

class EnvTemplateServiceSpecPort {
    var name: String? = null
    var port: Int = 0
    var targetPort: Int? = null
    var protocol = EnvTemplateServiceSpecPortProtocol.Tcp
}

enum class EnvTemplateServiceSpecPortProtocol {
    @JsonProperty("TCP")
    Tcp,

    @JsonProperty("UDP")
    Udp
}

class EnvTemplateIngress {
    lateinit var metadata: EnvTemplateIngressMetadata
    lateinit var spec: EnvTemplateIngressSpec
}

class EnvTemplateIngressMetadata {
    lateinit var name: String
}

class EnvTemplateIngressSpec {
    lateinit var path: String
    var pathType = EnvTemplateIngressPathType.Prefix
    lateinit var backend: EnvTemplateIngressBackend
}

enum class EnvTemplateIngressPathType {
    @JsonProperty("Prefix")
    Prefix,

    @JsonProperty("Exact")
    Exact,

    @JsonProperty("ImplementationSpecific")
    ImplementationSpecific
}

class EnvTemplateIngressBackend {
    lateinit var service: EnvTemplateIngressBackendService
}

class EnvTemplateIngressBackendService {
    lateinit var name: String
    lateinit var port: EnvTemplateIngressBackendServicePort
}

class EnvTemplateIngressBackendServicePort {
    var name: String? = null
    var number: Int? = null
}

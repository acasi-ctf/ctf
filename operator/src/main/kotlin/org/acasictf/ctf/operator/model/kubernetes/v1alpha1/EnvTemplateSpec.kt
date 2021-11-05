package org.acasictf.ctf.operator.model.kubernetes.v1alpha1

import com.fasterxml.jackson.annotation.JsonProperty

class EnvTemplateSpec {
    lateinit var pods: List<EnvTemplatePod>
    var services: List<EnvTemplateService> = listOf()
    var ingresses: List<EnvTemplateIngress> = listOf()

    override fun equals(other: Any?): Boolean {
        if (this === other) return true
        if (javaClass != other?.javaClass) return false

        other as EnvTemplateSpec

        if (pods != other.pods) return false
        if (services != other.services) return false
        if (ingresses != other.ingresses) return false

        return true
    }

    override fun hashCode(): Int {
        var result = pods.hashCode()
        result = 31 * result + services.hashCode()
        result = 31 * result + ingresses.hashCode()
        return result
    }
}

class EnvTemplatePod {
    lateinit var metadata: EnvTemplatePodMetadata
    lateinit var spec: EnvTemplatePodSpec

    override fun equals(other: Any?): Boolean {
        if (this === other) return true
        if (javaClass != other?.javaClass) return false

        other as EnvTemplatePod

        if (metadata != other.metadata) return false
        if (spec != other.spec) return false

        return true
    }

    override fun hashCode(): Int {
        var result = metadata.hashCode()
        result = 31 * result + spec.hashCode()
        return result
    }
}

class EnvTemplatePodMetadata {
    lateinit var name: String
    lateinit var labels: Map<String, String>

    override fun equals(other: Any?): Boolean {
        if (this === other) return true
        if (javaClass != other?.javaClass) return false

        other as EnvTemplatePodMetadata

        if (name != other.name) return false
        if (labels != other.labels) return false

        return true
    }

    override fun hashCode(): Int {
        var result = name.hashCode()
        result = 31 * result + labels.hashCode()
        return result
    }
}

class EnvTemplatePodSpec {
    lateinit var containers: List<EnvTemplatePodSpecContainer>

    override fun equals(other: Any?): Boolean {
        if (this === other) return true
        if (javaClass != other?.javaClass) return false

        other as EnvTemplatePodSpec

        if (containers != other.containers) return false

        return true
    }

    override fun hashCode(): Int {
        return containers.hashCode()
    }
}

class EnvTemplatePodSpecContainer {
    lateinit var name: String
    lateinit var image: String
    var env: List<EnvTemplatePodSpecContainerEnv> = listOf()

    override fun equals(other: Any?): Boolean {
        if (this === other) return true
        if (javaClass != other?.javaClass) return false

        other as EnvTemplatePodSpecContainer

        if (name != other.name) return false
        if (image != other.image) return false
        if (env != other.env) return false

        return true
    }

    override fun hashCode(): Int {
        var result = name.hashCode()
        result = 31 * result + image.hashCode()
        result = 31 * result + env.hashCode()
        return result
    }
}

class EnvTemplatePodSpecContainerEnv {
    lateinit var name: String
    lateinit var value: String

    override fun equals(other: Any?): Boolean {
        if (this === other) return true
        if (javaClass != other?.javaClass) return false

        other as EnvTemplatePodSpecContainerEnv

        if (name != other.name) return false
        if (value != other.value) return false

        return true
    }

    override fun hashCode(): Int {
        var result = name.hashCode()
        result = 31 * result + value.hashCode()
        return result
    }
}

class EnvTemplateService {
    lateinit var metadata: EnvTemplateServiceMetadata
    lateinit var spec: EnvTemplateServiceSpec

    override fun equals(other: Any?): Boolean {
        if (this === other) return true
        if (javaClass != other?.javaClass) return false

        other as EnvTemplateService

        if (metadata != other.metadata) return false
        if (spec != other.spec) return false

        return true
    }

    override fun hashCode(): Int {
        var result = metadata.hashCode()
        result = 31 * result + spec.hashCode()
        return result
    }
}

class EnvTemplateServiceMetadata {
    lateinit var name: String

    override fun equals(other: Any?): Boolean {
        if (this === other) return true
        if (javaClass != other?.javaClass) return false

        other as EnvTemplateServiceMetadata

        if (name != other.name) return false

        return true
    }

    override fun hashCode(): Int {
        return name.hashCode()
    }
}

class EnvTemplateServiceSpec {
    lateinit var selector: Map<String, String>
    lateinit var ports: List<EnvTemplateServiceSpecPort>

    override fun equals(other: Any?): Boolean {
        if (this === other) return true
        if (javaClass != other?.javaClass) return false

        other as EnvTemplateServiceSpec

        if (selector != other.selector) return false
        if (ports != other.ports) return false

        return true
    }

    override fun hashCode(): Int {
        var result = selector.hashCode()
        result = 31 * result + ports.hashCode()
        return result
    }
}

class EnvTemplateServiceSpecPort {
    var name: String? = null
    var port: Int = 0
    var targetPort: Int? = null
    var protocol = EnvTemplateServiceSpecPortProtocol.Tcp
    var ctfExpose = EnvTemplateServiceSpecPortCtfExpose.None

    override fun equals(other: Any?): Boolean {
        if (this === other) return true
        if (javaClass != other?.javaClass) return false

        other as EnvTemplateServiceSpecPort

        if (name != other.name) return false
        if (port != other.port) return false
        if (targetPort != other.targetPort) return false
        if (protocol != other.protocol) return false
        if (ctfExpose != other.ctfExpose) return false

        return true
    }

    override fun hashCode(): Int {
        var result = name?.hashCode() ?: 0
        result = 31 * result + port
        result = 31 * result + (targetPort ?: 0)
        result = 31 * result + protocol.hashCode()
        result = 31 * result + ctfExpose.hashCode()
        return result
    }
}

enum class EnvTemplateServiceSpecPortProtocol {
    @JsonProperty("TCP")
    Tcp,

    @JsonProperty("UDP")
    Udp
}

enum class EnvTemplateServiceSpecPortCtfExpose {
    @JsonProperty("None")
    None,

    @JsonProperty("Termproxy")
    Termproxy,
}

class EnvTemplateIngress {
    lateinit var metadata: EnvTemplateIngressMetadata
    lateinit var spec: EnvTemplateIngressSpec

    override fun equals(other: Any?): Boolean {
        if (this === other) return true
        if (javaClass != other?.javaClass) return false

        other as EnvTemplateIngress

        if (metadata != other.metadata) return false
        if (spec != other.spec) return false

        return true
    }

    override fun hashCode(): Int {
        var result = metadata.hashCode()
        result = 31 * result + spec.hashCode()
        return result
    }
}

class EnvTemplateIngressMetadata {
    lateinit var name: String

    override fun equals(other: Any?): Boolean {
        if (this === other) return true
        if (javaClass != other?.javaClass) return false

        other as EnvTemplateIngressMetadata

        if (name != other.name) return false

        return true
    }

    override fun hashCode(): Int {
        return name.hashCode()
    }
}

class EnvTemplateIngressSpec {
    lateinit var path: String
    var pathType = EnvTemplateIngressPathType.Prefix
    lateinit var backend: EnvTemplateIngressBackend
    var ctfExpose = EnvTemplateIngressCtfExpose.None

    override fun equals(other: Any?): Boolean {
        if (this === other) return true
        if (javaClass != other?.javaClass) return false

        other as EnvTemplateIngressSpec

        if (path != other.path) return false
        if (pathType != other.pathType) return false
        if (backend != other.backend) return false
        if (ctfExpose != other.ctfExpose) return false

        return true
    }

    override fun hashCode(): Int {
        var result = path.hashCode()
        result = 31 * result + pathType.hashCode()
        result = 31 * result + backend.hashCode()
        result = 31 * result + ctfExpose.hashCode()
        return result
    }
}

enum class EnvTemplateIngressPathType {
    @JsonProperty("Prefix")
    Prefix,

    @JsonProperty("Exact")
    Exact,

    @JsonProperty("ImplementationSpecific")
    ImplementationSpecific
}

enum class EnvTemplateIngressCtfExpose {
    @JsonProperty("None")
    None,

    @JsonProperty("Web")
    Web,
}

class EnvTemplateIngressBackend {
    lateinit var service: EnvTemplateIngressBackendService

    override fun equals(other: Any?): Boolean {
        if (this === other) return true
        if (javaClass != other?.javaClass) return false

        other as EnvTemplateIngressBackend

        if (service != other.service) return false

        return true
    }

    override fun hashCode(): Int {
        return service.hashCode()
    }
}

class EnvTemplateIngressBackendService {
    lateinit var name: String
    lateinit var port: EnvTemplateIngressBackendServicePort

    override fun equals(other: Any?): Boolean {
        if (this === other) return true
        if (javaClass != other?.javaClass) return false

        other as EnvTemplateIngressBackendService

        if (name != other.name) return false
        if (port != other.port) return false

        return true
    }

    override fun hashCode(): Int {
        var result = name.hashCode()
        result = 31 * result + port.hashCode()
        return result
    }
}

class EnvTemplateIngressBackendServicePort {
    var name: String? = null
    var number: Int? = null

    override fun equals(other: Any?): Boolean {
        if (this === other) return true
        if (javaClass != other?.javaClass) return false

        other as EnvTemplateIngressBackendServicePort

        if (name != other.name) return false
        if (number != other.number) return false

        return true
    }

    override fun hashCode(): Int {
        var result = name?.hashCode() ?: 0
        result = 31 * result + (number ?: 0)
        return result
    }
}

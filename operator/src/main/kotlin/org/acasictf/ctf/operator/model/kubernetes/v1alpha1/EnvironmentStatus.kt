package org.acasictf.ctf.operator.model.kubernetes.v1alpha1

class EnvironmentStatus {
    lateinit var ingresses: EnvironmentStatusIngresses
}

class EnvironmentStatusIngresses {
    lateinit var urls: List<String>
}

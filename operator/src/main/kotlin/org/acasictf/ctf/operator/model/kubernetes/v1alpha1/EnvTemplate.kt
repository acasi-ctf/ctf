package org.acasictf.ctf.operator.model.kubernetes.v1alpha1

import io.fabric8.kubernetes.api.model.Namespaced
import io.fabric8.kubernetes.client.CustomResource
import io.fabric8.kubernetes.model.annotation.Group
import io.fabric8.kubernetes.model.annotation.Plural
import io.fabric8.kubernetes.model.annotation.Singular
import io.fabric8.kubernetes.model.annotation.Version

@Group("ctf.acasi.info")
@Version("v1alpha1")
@Singular("envtemplate")
@Plural("envtemplates")
class EnvTemplate : CustomResource<EnvTemplateSpec, EnvTemplateStatus>(), Namespaced

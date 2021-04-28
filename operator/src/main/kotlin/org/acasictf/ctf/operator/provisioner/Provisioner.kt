package org.acasictf.ctf.operator.provisioner

import org.acasictf.ctf.operator.model.Challenge

interface Provisioner {
    fun provision(c: Challenge)
}

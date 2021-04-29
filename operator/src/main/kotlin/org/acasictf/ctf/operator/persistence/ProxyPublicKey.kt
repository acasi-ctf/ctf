package org.acasictf.ctf.operator.persistence

/**
 * Object that stores the public key for the proxy. This is or willed be used in
 * a number of places and is mocked for testing, so it made sense to use an
 * object.
 */
object ProxyPublicKey {
    /**
     * Internal storage for the public key stored as the standard SSH key
     * format.
     */
    private lateinit var publicKeyText: String

    /**
     * Get or set the public key text.
     */
    var publicKey: String
        get() {
            return publicKeyText
        }
        set(value) {
            publicKeyText = value
        }
}

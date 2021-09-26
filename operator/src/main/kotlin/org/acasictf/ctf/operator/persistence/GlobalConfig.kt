package org.acasictf.ctf.operator.persistence

/**
 * Object that stores the global configuration. This is or willed be used in
 * a number of places and is mocked for testing, so it made sense to use an
 * object.
 */
object GlobalConfig {
    /**
     * Internal storage for the public key stored as the standard SSH key
     * format.
     */
    private lateinit var publicKeyText: String

    /**
     * The base URL for the web server. Anything that is a subdomain of
     * this URL is considered an environment.
     */
    private lateinit var internalBaseUrl: String

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

    var baseUrl: String
        get() {
            return internalBaseUrl
        }
        set(value) {
            internalBaseUrl = value
        }
}

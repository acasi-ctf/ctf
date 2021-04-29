package org.acasictf.ctf.operator.persistence

import io.mockk.mockkObject
import io.mockk.unmockkObject
import kotlin.test.*

class ProxyPublicKeyTest {
    private val publicKeyText = "PROXY_PUBLIC_KEY_TEST"

    /**
     * Mock the ProxyPublicKey object to "push the state of the object".
     */
    @BeforeTest
    fun beforeTest() {
        mockkObject(ProxyPublicKey)
    }

    /**
     * Unmock the ProxyPublicKey object to "pop the state of the object".
     */
    @AfterTest
    fun afterTest() {
        unmockkObject(ProxyPublicKey)
    }

    /**
     * Set the ProxyPublicKey.publicKey field, then ensure that it returns the
     * correct value.
     */
    @Test
    fun `get with set`() {
        ProxyPublicKey.publicKey = publicKeyText
        assertEquals(publicKeyText, ProxyPublicKey.publicKey)
    }

    /**
     * Ensures that the ProxyPublicKey.publicKey field throws an error if it has
     * not been set at runtime.
     */
    @Test
    fun `get without set`() {
        assertFails {
            ProxyPublicKey.publicKey
        }
    }
}

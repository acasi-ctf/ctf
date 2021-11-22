package org.acasictf.ctf.operator.persistence

import io.mockk.mockkObject
import io.mockk.unmockkAll
import kotlin.test.*

class GlobalConfigTest {
  private val publicKeyText = "PROXY_PUBLIC_KEY_TEST"
  private val baseUrlText = "ctf.example.com"

  /**
   * Mock the ProxyPublicKey object to "push the state of the object".
   */
  @BeforeTest
  fun beforeTest() {
    mockkObject(GlobalConfig)
  }

  /**
   * Unmock the ProxyPublicKey object to "pop the state of the object".
   */
  @AfterTest
  fun afterTest() {
    unmockkAll()
  }

  /**
   * Set the ProxyPublicKey.publicKey field, then ensure that it returns the
   * correct value.
   */
  @Test
  fun `get key with set`() {
    GlobalConfig.publicKey = publicKeyText
    assertEquals(publicKeyText, GlobalConfig.publicKey)
  }

  /**
   * Ensures that the ProxyPublicKey.publicKey field throws an error if it has
   * not been set at runtime.
   */
  @Test
  fun `get key without set`() {
    assertFails {
      GlobalConfig.publicKey
    }
  }

  /**
   * Set the ProxyPublicKey.baseUrl field, then ensure that it returns the
   * correct value.
   */
  @Test
  fun `get base url with set`() {
    GlobalConfig.baseUrl = baseUrlText
    assertEquals(baseUrlText, GlobalConfig.baseUrl)
  }
}

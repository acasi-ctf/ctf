package org.acasictf.ctf.operator.testutil

import kotlinx.coroutines.runBlocking
import kotlin.test.assertFails

fun assertFailsBlocking(f: suspend () -> Unit) = assertFails { runBlocking { f() }}

import com.google.protobuf.gradle.*
import org.jetbrains.kotlin.gradle.tasks.KotlinCompile

plugins {
    application
    `java-library`
    kotlin("jvm") version "1.4.32"
    kotlin("plugin.serialization") version "1.4.32"
    jacoco
    id("com.google.protobuf") version "0.8.16"
    id("idea")
}

group = "org.acasictf.ctf.operator"
version = "1.0-SNAPSHOT"

application {
    mainClass.set("org.acasictf.ctf.operator.MainKt")
}

repositories {
    mavenCentral()
}

dependencies {
    implementation(kotlin("stdlib"))
    implementation("org.jetbrains.kotlinx:kotlinx-coroutines-core:1.4.3")

    implementation("io.grpc:grpc-kotlin-stub:1.0.0")
    runtimeOnly("io.grpc:grpc-netty:1.37.0")

    implementation("org.jetbrains.kotlinx:kotlinx-serialization-json:1.1.0")

    implementation("io.fabric8:kubernetes-client:5.3.1")
    testImplementation("io.fabric8:kubernetes-server-mock:5.3.1")

    implementation("org.mapdb:mapdb:3.0.8")

    implementation("javax.annotation:javax.annotation-api:1.3.2")

    implementation("org.slf4j:slf4j-simple:1.7.29")
    implementation("io.github.microutils:kotlin-logging-jvm:2.0.6")

    testImplementation(kotlin("test-common"))
    testImplementation(kotlin("test-annotations-common"))
    testImplementation(kotlin("test-junit"))
    testImplementation("io.mockk:mockk:1.11.0")
}

java {
    sourceSets {
        main {
            java {
                srcDirs.add(File("build/generated/source/proto/main/grpc"))
                srcDirs.add(File("build/generated/source/proto/main/java"))
            }
        }
    }
}

tasks.withType<KotlinCompile> {
    kotlinOptions.jvmTarget = "1.8"
}

tasks.register<Copy>("copyProto") {
    from("../proto/")
    into("src/main/proto")
}

protobuf {
    afterEvaluate {
        tasks.named("generateProto") {
            dependsOn("copyProto")
        }
    }
    protoc {
        artifact = "com.google.protobuf:protoc:3.15.8"
    }
    plugins {
        id("grpc") {
            artifact = "io.grpc:protoc-gen-grpc-java:1.37.0"
        }
        id("grpckt") {
            artifact = "io.grpc:protoc-gen-grpc-kotlin:1.0.0:jdk7@jar"
        }
    }
    generateProtoTasks {
        ofSourceSet("main").forEach {
            it.plugins {
                id("grpc")
                id("grpckt")
            }
        }
    }
}

tasks.test {
    finalizedBy(tasks.jacocoTestReport)
}

tasks.jacocoTestReport {
    dependsOn(tasks.test)
    reports {
        xml.isEnabled = true
    }
}

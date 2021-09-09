package org.acasictf.ctf.operator

import com.google.protobuf.ByteString
import io.grpc.ManagedChannelBuilder
import org.acasictf.ctf.proto.Ctfoperator
import org.acasictf.ctf.proto.Ctfoperator.*
import org.acasictf.ctf.proto.EnvironmentProvisioningServiceGrpcKt
import java.io.File

suspend fun main() {
    val channel = ManagedChannelBuilder.forAddress("localhost", 1234)
            .usePlaintext()
            .build()
    val provisioner = EnvironmentProvisioningServiceGrpcKt.EnvironmentProvisioningServiceCoroutineStub(channel)
    /*provisioner.uploadEnvironmentTemplate(UploadEnvironmentTemplateRequest.newBuilder().apply {
        envZip = ByteString.copyFrom(File("internal.zip").readBytes())
    }.build())*/

    val resp = provisioner.startEnvironment(StartEnvironmentRequest.newBuilder().apply {
        challengeSetId = parseUuid("62b33ff3-4a2f-47df-a5dc-877c0ee6d870")
        challengeId = parseUuid("d927f959-67aa-4e4b-8da2-f65ed17fa915")
        challengeOwner = parseUuid("6fca05a5-04fe-4d7a-b998-616c92db7a88")
    }.build())

    println(resp)
}

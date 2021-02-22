// package: 
// file: termproxy.proto

import * as jspb from "google-protobuf";

export class TerminalBytes extends jspb.Message {
  getContents(): Uint8Array | string;
  getContents_asU8(): Uint8Array;
  getContents_asB64(): string;
  setContents(value: Uint8Array | string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): TerminalBytes.AsObject;
  static toObject(includeInstance: boolean, msg: TerminalBytes): TerminalBytes.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: TerminalBytes, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): TerminalBytes;
  static deserializeBinaryFromReader(message: TerminalBytes, reader: jspb.BinaryReader): TerminalBytes;
}

export namespace TerminalBytes {
  export type AsObject = {
    contents: Uint8Array | string,
  }
}


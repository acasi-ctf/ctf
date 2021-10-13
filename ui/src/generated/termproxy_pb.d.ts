// package: 
// file: termproxy.proto

import * as jspb from "google-protobuf";
import * as common_pb from "./common_pb";

export class ClientMessage extends jspb.Message {
  hasOpenConnection(): boolean;
  clearOpenConnection(): void;
  getOpenConnection(): OpenConnectionMessage | undefined;
  setOpenConnection(value?: OpenConnectionMessage): void;

  hasStdin(): boolean;
  clearStdin(): void;
  getStdin(): StreamMessage | undefined;
  setStdin(value?: StreamMessage): void;

  hasResize(): boolean;
  clearResize(): void;
  getResize(): ResizeMessage | undefined;
  setResize(value?: ResizeMessage): void;

  getMessageCase(): ClientMessage.MessageCase;
  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ClientMessage.AsObject;
  static toObject(includeInstance: boolean, msg: ClientMessage): ClientMessage.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: ClientMessage, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ClientMessage;
  static deserializeBinaryFromReader(message: ClientMessage, reader: jspb.BinaryReader): ClientMessage;
}

export namespace ClientMessage {
  export type AsObject = {
    openConnection?: OpenConnectionMessage.AsObject,
    stdin?: StreamMessage.AsObject,
    resize?: ResizeMessage.AsObject,
  }

  export enum MessageCase {
    MESSAGE_NOT_SET = 0,
    OPEN_CONNECTION = 1,
    STDIN = 2,
    RESIZE = 3,
  }
}

export class ServerMessage extends jspb.Message {
  hasCloseConnection(): boolean;
  clearCloseConnection(): void;
  getCloseConnection(): CloseConnectionMessage | undefined;
  setCloseConnection(value?: CloseConnectionMessage): void;

  hasStdout(): boolean;
  clearStdout(): void;
  getStdout(): StreamMessage | undefined;
  setStdout(value?: StreamMessage): void;

  hasStderr(): boolean;
  clearStderr(): void;
  getStderr(): StreamMessage | undefined;
  setStderr(value?: StreamMessage): void;

  getMessageCase(): ServerMessage.MessageCase;
  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ServerMessage.AsObject;
  static toObject(includeInstance: boolean, msg: ServerMessage): ServerMessage.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: ServerMessage, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ServerMessage;
  static deserializeBinaryFromReader(message: ServerMessage, reader: jspb.BinaryReader): ServerMessage;
}

export namespace ServerMessage {
  export type AsObject = {
    closeConnection?: CloseConnectionMessage.AsObject,
    stdout?: StreamMessage.AsObject,
    stderr?: StreamMessage.AsObject,
  }

  export enum MessageCase {
    MESSAGE_NOT_SET = 0,
    CLOSE_CONNECTION = 1,
    STDOUT = 2,
    STDERR = 3,
  }
}

export class OpenConnectionMessage extends jspb.Message {
  hasEnvironmentId(): boolean;
  clearEnvironmentId(): void;
  getEnvironmentId(): common_pb.UUID | undefined;
  setEnvironmentId(value?: common_pb.UUID): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): OpenConnectionMessage.AsObject;
  static toObject(includeInstance: boolean, msg: OpenConnectionMessage): OpenConnectionMessage.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: OpenConnectionMessage, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): OpenConnectionMessage;
  static deserializeBinaryFromReader(message: OpenConnectionMessage, reader: jspb.BinaryReader): OpenConnectionMessage;
}

export namespace OpenConnectionMessage {
  export type AsObject = {
    environmentId?: common_pb.UUID.AsObject,
  }
}

export class CloseConnectionMessage extends jspb.Message {
  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): CloseConnectionMessage.AsObject;
  static toObject(includeInstance: boolean, msg: CloseConnectionMessage): CloseConnectionMessage.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: CloseConnectionMessage, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): CloseConnectionMessage;
  static deserializeBinaryFromReader(message: CloseConnectionMessage, reader: jspb.BinaryReader): CloseConnectionMessage;
}

export namespace CloseConnectionMessage {
  export type AsObject = {
  }
}

export class ResizeMessage extends jspb.Message {
  getColumns(): number;
  setColumns(value: number): void;

  getRows(): number;
  setRows(value: number): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ResizeMessage.AsObject;
  static toObject(includeInstance: boolean, msg: ResizeMessage): ResizeMessage.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: ResizeMessage, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ResizeMessage;
  static deserializeBinaryFromReader(message: ResizeMessage, reader: jspb.BinaryReader): ResizeMessage;
}

export namespace ResizeMessage {
  export type AsObject = {
    columns: number,
    rows: number,
  }
}

export class StreamMessage extends jspb.Message {
  getContents(): Uint8Array | string;
  getContents_asU8(): Uint8Array;
  getContents_asB64(): string;
  setContents(value: Uint8Array | string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): StreamMessage.AsObject;
  static toObject(includeInstance: boolean, msg: StreamMessage): StreamMessage.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: StreamMessage, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): StreamMessage;
  static deserializeBinaryFromReader(message: StreamMessage, reader: jspb.BinaryReader): StreamMessage;
}

export namespace StreamMessage {
  export type AsObject = {
    contents: Uint8Array | string,
  }
}


// package: 
// file: termproxy.proto

import * as termproxy_pb from "./termproxy_pb";
import {grpc} from "@improbable-eng/grpc-web";

type TermproxyServiceProxyTerminal = {
  readonly methodName: string;
  readonly service: typeof TermproxyService;
  readonly requestStream: true;
  readonly responseStream: true;
  readonly requestType: typeof termproxy_pb.ClientMessage;
  readonly responseType: typeof termproxy_pb.ServerMessage;
};

export class TermproxyService {
  static readonly serviceName: string;
  static readonly ProxyTerminal: TermproxyServiceProxyTerminal;
}

export type ServiceError = { message: string, code: number; metadata: grpc.Metadata }
export type Status = { details: string, code: number; metadata: grpc.Metadata }

interface UnaryResponse {
  cancel(): void;
}
interface ResponseStream<T> {
  cancel(): void;
  on(type: 'data', handler: (message: T) => void): ResponseStream<T>;
  on(type: 'end', handler: (status?: Status) => void): ResponseStream<T>;
  on(type: 'status', handler: (status: Status) => void): ResponseStream<T>;
}
interface RequestStream<T> {
  write(message: T): RequestStream<T>;
  end(): void;
  cancel(): void;
  on(type: 'end', handler: (status?: Status) => void): RequestStream<T>;
  on(type: 'status', handler: (status: Status) => void): RequestStream<T>;
}
interface BidirectionalStream<ReqT, ResT> {
  write(message: ReqT): BidirectionalStream<ReqT, ResT>;
  end(): void;
  cancel(): void;
  on(type: 'data', handler: (message: ResT) => void): BidirectionalStream<ReqT, ResT>;
  on(type: 'end', handler: (status?: Status) => void): BidirectionalStream<ReqT, ResT>;
  on(type: 'status', handler: (status: Status) => void): BidirectionalStream<ReqT, ResT>;
}

export class TermproxyServiceClient {
  readonly serviceHost: string;

  constructor(serviceHost: string, options?: grpc.RpcOptions);
  proxyTerminal(metadata?: grpc.Metadata): BidirectionalStream<termproxy_pb.ClientMessage, termproxy_pb.ServerMessage>;
}


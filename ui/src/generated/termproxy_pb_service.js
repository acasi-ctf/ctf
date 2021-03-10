// package: 
// file: termproxy.proto

var termproxy_pb = require("./termproxy_pb");
var grpc = require("@improbable-eng/grpc-web").grpc;

var TermproxyService = (function () {
  function TermproxyService() {}
  TermproxyService.serviceName = "TermproxyService";
  return TermproxyService;
}());

TermproxyService.ProxyTerminal = {
  methodName: "ProxyTerminal",
  service: TermproxyService,
  requestStream: true,
  responseStream: true,
  requestType: termproxy_pb.ClientMessage,
  responseType: termproxy_pb.ServerMessage
};

exports.TermproxyService = TermproxyService;

function TermproxyServiceClient(serviceHost, options) {
  this.serviceHost = serviceHost;
  this.options = options || {};
}

TermproxyServiceClient.prototype.proxyTerminal = function proxyTerminal(metadata) {
  var listeners = {
    data: [],
    end: [],
    status: []
  };
  var client = grpc.client(TermproxyService.ProxyTerminal, {
    host: this.serviceHost,
    metadata: metadata,
    transport: this.options.transport
  });
  client.onEnd(function (status, statusMessage, trailers) {
    listeners.status.forEach(function (handler) {
      handler({ code: status, details: statusMessage, metadata: trailers });
    });
    listeners.end.forEach(function (handler) {
      handler({ code: status, details: statusMessage, metadata: trailers });
    });
    listeners = null;
  });
  client.onMessage(function (message) {
    listeners.data.forEach(function (handler) {
      handler(message);
    })
  });
  client.start(metadata);
  return {
    on: function (type, handler) {
      listeners[type].push(handler);
      return this;
    },
    write: function (requestMessage) {
      client.send(requestMessage);
      return this;
    },
    end: function () {
      client.finishSend();
    },
    cancel: function () {
      listeners = null;
      client.close();
    }
  };
};

exports.TermproxyServiceClient = TermproxyServiceClient;


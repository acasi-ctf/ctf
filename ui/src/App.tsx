import React, {useEffect, useRef} from 'react';
import './App.css';
import {XTerm} from "xterm-for-react";

import {TermproxyServiceClient} from "./generated/termproxy_pb_service";
import {
  ClientMessage,
  ServerMessage,
  StreamMessage,
  OpenConnectionMessage
} from "./generated/termproxy_pb";
import {grpc} from "@improbable-eng/grpc-web";
import {UUID} from "./generated/common_pb";

const client = new TermproxyServiceClient("http://localhost:1235", {
  transport: grpc.WebsocketTransport()
});

function App() {
  const xtermRef = useRef<XTerm>(null);

  useEffect(() => {
    let stream = client.proxyTerminal();
    console.log('Starting stream');

    let envId = new UUID();
    envId.setContents("365b5737-48aa-45b1-8302-7a4c13a54e16");

    let openMsg = new OpenConnectionMessage();
    openMsg.setEnvironmentId(envId);

    let openClientMsg = new ClientMessage();
    openClientMsg.setOpenConnection(openMsg);

    stream.write(openClientMsg);

    stream.on('data', message => {
      switch (message.getMessageCase()) {
        case ServerMessage.MessageCase.STDOUT:
          let msg = message.getStdout()!;
          let str = atob(msg.getContents_asB64());
          console.log(`New message: ${str}`);
          if (xtermRef.current != null) {
            xtermRef.current.terminal.write(str);
          }
      }
    });

    // TODO: Improve error handling
    stream.on("status", status => {
      console.log(`New status: ${status.details}, code: ${status.code}`);
    })
    stream.on("end", status => {
      if (status != null) {
        console.log(`End status: ${status.details}, code: ${status.code}`);
      } else {
        console.log("End without status");
      }
    })

    if (xtermRef.current != null) {
      xtermRef.current.terminal.onData(data => {
        let streamMsg = new StreamMessage();
        streamMsg.setContents(btoa(data));
        let msg = new ClientMessage();
        msg.setStdin(streamMsg);
        stream.write(msg);
      });
    }
  }, []);

  return (
      <div className="App">
        <XTerm ref={xtermRef}/>
      </div>
  );
}

export default App;

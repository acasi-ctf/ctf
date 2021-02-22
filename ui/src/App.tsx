import React, {useEffect, useRef, useState} from 'react';
import './App.css';
import {XTerm} from "xterm-for-react";

import {TermproxyServiceClient} from "./generated/termproxy_pb_service";
import {TerminalBytes} from "./generated/termproxy_pb";
import {grpc} from "@improbable-eng/grpc-web";

const client = new TermproxyServiceClient("http://localhost:1235", {
  transport: grpc.WebsocketTransport()
});

function App() {
  const xtermRef = useRef<XTerm>(null);

  useEffect(() => {
    let stream = client.openTerminal();
    console.log('Starting stream');

    stream.on('data', message => {
      let str = atob(message.getContents_asB64());
      console.log(`New message: ${str}`);
      if (xtermRef.current != null) {
        xtermRef.current.terminal.write(str);
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
        let terminalBytes = new TerminalBytes();
        terminalBytes.setContents(btoa(data));
        stream.write(terminalBytes);
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

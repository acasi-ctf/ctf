import React, {useEffect, useRef} from "react";
import "./Terminal.css";
import {XTerm} from "xterm-for-react";
import {FitAddon} from "xterm-addon-fit";

import {
    BidirectionalStream,
    TermproxyServiceClient
} from "../generated/termproxy_pb_service";
import {
    ClientMessage,
    ServerMessage,
    StreamMessage,
    OpenConnectionMessage,
    ResizeMessage,
} from "../generated/termproxy_pb";
import {grpc} from "@improbable-eng/grpc-web";
import {UUID} from "../generated/common_pb";
import * as termproxy_pb from "../generated/termproxy_pb";

const client = new TermproxyServiceClient(`https://${window.location.host}`, {
  transport: grpc.WebsocketTransport(),
});

interface TerminalOptions {
    id: string;
}

export default function Terminal(props: TerminalOptions) {
    const xtermRef = useRef<XTerm>(null);
    const fitRef = useRef<FitAddon>(new FitAddon());
    const streamRef = useRef<BidirectionalStream<termproxy_pb.ClientMessage, termproxy_pb.ServerMessage>>(client.proxyTerminal());

    useEffect(() => {
        async function connect(stream: BidirectionalStream<termproxy_pb.ClientMessage, termproxy_pb.ServerMessage>) {
            console.log("Starting stream");

            let envId = new UUID();
            envId.setContents(props.id);

            let openMsg = new OpenConnectionMessage();
            openMsg.setEnvironmentId(envId);

            let openClientMsg = new ClientMessage();
            openClientMsg.setOpenConnection(openMsg);

            stream.write(openClientMsg);

            function writeToConsole(msg: StreamMessage) {
                let str = atob(msg.getContents_asB64());
                console.log(`New message: ${str}`);
                if (xtermRef.current != null) {
                    xtermRef.current.terminal.write(str);
                }
            }

            stream.on("data", (message) => {
                try {
                    switch (message.getMessageCase()) {
                        case ServerMessage.MessageCase.STDOUT:
                            let stdoutMsg = message.getStdout()!;
                            writeToConsole(stdoutMsg);
                            break;
                        case ServerMessage.MessageCase.STDERR:
                            let stderrMsg = message.getStderr()!;
                            writeToConsole(stderrMsg);
                            break;
                    }
                } catch (e) {
                }
            });

            // TODO: Improve error handling
            stream.on("status", (status) => {
                console.log(`New status: ${status.details}, code: ${status.code}`);
            });
            stream.on("end", (status) => {
                if (status != null) {
                    console.log(`End status: ${status.details}, code: ${status.code}`);
                } else {
                    console.log("End without status");
                }
                stream.end();
                console.log("Delaying to attempt to reconnect");
                setTimeout(() => {
                    streamRef.current = client.proxyTerminal();
                    connect(streamRef.current);
                }, 5000);
            });
        }

        if (xtermRef.current != null) {
            xtermRef.current.terminal.onData((data) => {
                let streamMsg = new StreamMessage();
                streamMsg.setContents(btoa(data));
                let msg = new ClientMessage();
                msg.setStdin(streamMsg);
                try {
                    streamRef.current.write(msg);
                } catch (e) {
                }
            });
            xtermRef.current.terminal.onResize((size) => {
                let resizeMsg = new ResizeMessage();
                resizeMsg.setColumns(size.cols);
                resizeMsg.setRows(size.rows);
                let msg = new ClientMessage();
                msg.setResize(resizeMsg);
                try {
                    streamRef.current.write(msg);
                } catch (e) {
                }
            });
            xtermRef.current.terminal.loadAddon(fitRef.current);
            fitRef.current.fit();
        }

        connect(streamRef.current);
    }, [props.id]);

    return <XTerm className="Terminal" ref={xtermRef}/>;
}

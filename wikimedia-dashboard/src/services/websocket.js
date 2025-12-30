import SockJs from "sockjs-client"
import { Client } from "@stomp/stompjs"

let stompClient = null;

export function connect(OnMessage) {
    const socket = new SockJs("http://localhost:8081/ws");
    stompClient = new Client({
        webSocketFactory: () => socket,
        reconnectDelay: 5000,
        debug: (str) => console.log(str),
    });
    stompClient.onConnect = () => {
        stompClient.subscribe("/topic/edits", (msg) => {
            OnMessage(JSON.parse(msg.body));
        });
    };
    stompClient.activate();
}

export function disconnect() {
    if (stompClient) {
        stompClient.deactivate();
    }
}
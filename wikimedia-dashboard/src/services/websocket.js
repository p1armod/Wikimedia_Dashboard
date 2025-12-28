import SockJs from "sockjs-client"
import Stomp from "stompjs"

let stompClient = null;

export function connect(OnMessage) {
    const socket = new SockJs("http://localhost:8080/ws");
    stompClient = Stomp.over(socket);
    stompClient.connect({}, () => {
        stompClient.subscribe("/topic/edits", (msg) => {
            OnMessage(JSON.parse(msg.body));
        });
    });
}

export function disconnect() {
    if (stompClient) {
        stompClient.disconnect();
    }
}
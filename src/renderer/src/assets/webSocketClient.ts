

export class WebSocketClient {

    private socket: WebSocket;

    WebSocketClient() {
        this.socket = new WebSocket('wss://eu2.rt.speechmatics.com/v2/');
    }

    test() {
        if (this.socket.OPEN)
            console.log('WebSocket is open');
    }

    close() {
        this.socket.close();
    }

}
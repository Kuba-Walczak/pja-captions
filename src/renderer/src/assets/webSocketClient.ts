export class WebSocketClient {

    private socket: WebSocket;

    constructor() {

        fetch('https://mp.speechmatics.com/v1/api_keys?type=rt',
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + window.env.API_KEY
                },
                body: JSON.stringify({ ttl: 60 })
            })
            .then(response => response.json())
            .then(data => console.log(data.key_value))

    }
    
    test() {
        console.log(this.socket.readyState);
    }

    close() {
        this.socket.close();
    }

}
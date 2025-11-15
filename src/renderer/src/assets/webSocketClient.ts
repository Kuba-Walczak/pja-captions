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
            .then(key => {
                this.socket = new WebSocket('wss://neu.rt.speechmatics.com/v2?jwt=' + key.key_value)
                this.socket.onopen = () => {
                    console.log('WebSocket opened, readyState:', this.socket.readyState);
                };
                
                this.socket.onerror = (error) => {
                    console.error('WebSocket error:', error);
                };
                
                this.socket.onclose = (event) => {
                    console.log('WebSocket closed:', {
                        code: event.code,
                        reason: event.reason,
                        wasClean: event.wasClean
                    });
                };
            })

    }
    
    test() {
        console.log(this.socket.readyState);
    }

    close() {
        this.socket.close();
    }

}
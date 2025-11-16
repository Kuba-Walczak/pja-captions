import React from 'react'
import { WebSocketClient } from './assets/webSocketClient';

export default function App() {

  let wsClient: WebSocketClient;

  return (
    <div>
      <button onClick={() => wsClient = new WebSocketClient()}>Get API Key</button>
    <button onClick={() => wsClient.test()}>Click me</button>
    <button onClick={() => wsClient.close()}>Close</button>
    </div>
  )
}
import React from 'react'
import { WebSocketClient } from './assets/webSocketClient';

function App() {

  const wsClient = new WebSocketClient();

  return (
    <div>
    <button onClick={() => wsClient.test()}>Click me</button>
    <button onClick={() => wsClient.close()}>Close</button>
    </div>
  )
}

export default App
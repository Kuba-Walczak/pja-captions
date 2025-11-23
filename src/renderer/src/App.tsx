import React from 'react'
import { initiateConnection, terminateConnection } from './components/Captions'

export default function App() {

  return (
    <div>
      <button onClick={() => initiateConnection()}>Connect</button>
      <button onClick={() => terminateConnection()}>Close</button>
      <button onClick={() => window.electronAPI.testfn()}>Window</button>
    </div>
  )
}
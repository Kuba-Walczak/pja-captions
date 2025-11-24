import React, { useCallback } from 'react'
import { initiateConnection, terminateConnection } from './components/Captions'

export default function App() {
  const handleMouseEnter = useCallback(() => {
    window.api.setIgnoreMouseEvents(false)
  }, [])

  const handleMouseLeave = useCallback(() => {
    window.api.setIgnoreMouseEvents(true, { forward: true })
  }, [])

  return (
    <div onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      <button onClick={() => initiateConnection()}>Connect</button>
      <button onClick={() => terminateConnection()}>Close</button>
    </div>
  )
}
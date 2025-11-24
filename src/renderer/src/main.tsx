import React, { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import AudioDevice from './components/audioDevice'
import Captions from './components/Captions'
import './index.css'
import { Button } from '@/components/ui/button'
import { initiateConnection, terminateConnection } from './components/Captions'

const handleMouseEnter = () => {
  console.log('mouse enter')
  window.api.setIgnoreMouseEvents(false)
}

const handleMouseLeave = () => {
  console.log('mouse leave')
  window.api.setIgnoreMouseEvents(true, { forward: true })
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <div className="flex flex-col items-center justify-center p-24 bg-gray-500" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      <Button variant="outline" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} onClick={() => initiateConnection()}>Connect</Button>
      <Button variant="outline" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} onClick={() => terminateConnection()}>Close</Button>
      <AudioDevice />
    </div>
    <Captions />
  </StrictMode>
)
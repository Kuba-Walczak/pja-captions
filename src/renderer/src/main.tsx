import React, { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import AudioDevice from './components/audioDevice'
import Captions from './components/Captions'
import './index.css'
import { Button } from '@/components/ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { initiateConnection, terminateConnection } from './components/Captions'
import { Power } from 'lucide-react'

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
    <div className="flex absolute top-0 right-0 bg-white w-[550px] rounded-xl m-12 p-12" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      <AudioDevice/>
      <Button variant="outline" size="customicon" onClick={() => initiateConnection()}>
        <Power/>
      </Button>
      <Button className='ml-auto' variant="outline" size="custom" onClick={() => terminateConnection()}>Close</Button>
    </div>
    <Captions />
  </StrictMode>
)
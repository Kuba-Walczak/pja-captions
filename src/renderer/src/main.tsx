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
import { Power, X } from 'lucide-react'

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
    <div className="flex flex-col items-center absolute top-0 right-0 rounded-xl m-12 hover:opacity-100 opacity-100 transition-opacity duration-300" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      <div className='flex items-center justify-between gap-4 bg-stone-900 p-2 w-full rounded-t-xl'>
        <p className='text-white font-bold'>PJA Captions</p>
        <Button variant="destructive" className='w-5 h-5 bg-red-500' onClick={() => terminateConnection()}>
          <X className='center' />
        </Button>
      </div>
      <div className='flex flex-col items-center gap-4 bg-stone-800 p-12 w-full rounded-b-xl'>
        <AudioDevice/>
        <Button variant="outline" size="customicon" onClick={() => initiateConnection()}>
          <Power className='center' />
        </Button>
      </div>
    </div>
    <Captions />
  </StrictMode>
)
import React, { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import AudioDevice from './components/audioDevice'
import Captions from './components/Captions'
import './index.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
        <App />
        <AudioDevice />
        <Captions />
  </StrictMode>
)
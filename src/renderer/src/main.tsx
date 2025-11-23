import React, { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import AudioDevice from './components/audioDevice'
import Captions from './components/Captions'

const urlParams = new URLSearchParams(window.location.search)
const windowType = urlParams.get('window')

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {windowType === '2' ? (
      <Captions />
    ) : (
      <>
        <App />
        <AudioDevice />
        <Captions />
      </>
    )}
  </StrictMode>
)
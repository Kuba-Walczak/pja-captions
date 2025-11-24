import { ElectronAPI } from '@electron-toolkit/preload'
import type { IgnoreMouseEventsOptions } from 'electron'

declare global {
  interface Window {
    electron: ElectronAPI
    api: {
      transcriptToBackend: (transcript: string) => void
      transcriptToFrontEnd: (callback: (text: string) => void) => void
      setIgnoreMouseEvents: (ignore: boolean, options?: IgnoreMouseEventsOptions) => void
    }
    env: { API_KEY: string }
  }
}
import { ElectronAPI } from '@electron-toolkit/preload'

declare global {
  interface Window {
    electron: ElectronAPI
    api: {
      testfn: () => Promise<void>
      IPCTest: () => void
    }
    env: { API_KEY: string }
  }
}
import { contextBridge, ipcRenderer, IpcRendererEvent, type IgnoreMouseEventsOptions } from 'electron'
import { electronAPI } from '@electron-toolkit/preload'
import dotenv from 'dotenv';
dotenv.config();

const api = {
  transcriptToBackend: (transcript: string) => ipcRenderer.send('transcriptToBackend', transcript),
  transcriptToFrontEnd: (callback: (text: string) => void) => {
    ipcRenderer.on('transcriptToFrontEnd', (_event: IpcRendererEvent, value: string) => {
      callback(value)
    })
  },
  setIgnoreMouseEvents: (ignore: boolean, options?: IgnoreMouseEventsOptions) =>
    ipcRenderer.send('setIgnoreMouseEvents', ignore, options)
}

if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('electron', electronAPI)
    contextBridge.exposeInMainWorld('env', { API_KEY: process.env.API_KEY })
    contextBridge.exposeInMainWorld('api', api)
  } catch (error) {
    console.error(error)
  }
} else {
  // @ts-ignore (define in dts)
  window.electron = electronAPI
  // @ts-ignore (define in dts)
  window.api = api
  // @ts-ignore (define in dts)
  window.env = { API_KEY: process.env.API_KEY }
}
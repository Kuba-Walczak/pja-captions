import { contextBridge, ipcRenderer } from 'electron'
import { electronAPI } from '@electron-toolkit/preload'
import dotenv from 'dotenv';
dotenv.config();

// Use `contextBridge` APIs to expose Electron APIs to
// renderer only if context isolation is enabled, otherwise
// just add to the DOM global.
if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('electron', electronAPI)
    contextBridge.exposeInMainWorld('env', { API_KEY: process.env.API_KEY })
    contextBridge.exposeInMainWorld('electronAPI', {
      testfn: () => ipcRenderer.send('testfn'),
      IPCTest: () => ipcRenderer.send('IPCTest')
    })
  } catch (error) {
    console.error(error)
  }
} else {
  // @ts-ignore (define in dts)
  window.electron = electronAPI
  // @ts-ignore (define in dts)
  window.api = api
}
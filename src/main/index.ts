import { app, BrowserWindow, ipcMain, IpcMainEvent, type IgnoreMouseEventsOptions } from 'electron'
import { join } from 'path'
import { is } from '@electron-toolkit/utils'

let mainWindow: BrowserWindow

ipcMain.on('transcriptToBackend', (_event: IpcMainEvent, value : string) => {
  mainWindow.webContents.send('transcriptToFrontEnd', value)
})

ipcMain.on('setIgnoreMouseEvents', (event: IpcMainEvent, ignore: boolean, options?: IgnoreMouseEventsOptions) => {
  const windowFromSender = BrowserWindow.fromWebContents(event.sender)
  if (windowFromSender) {
    windowFromSender.setIgnoreMouseEvents(ignore, options)
  }
})

function createWindow(): void {
  mainWindow = new BrowserWindow({
    fullscreen: true,
    show: false,
    autoHideMenuBar: true,
    transparent: true,
    frame: false,
    alwaysOnTop: true,
    backgroundColor: '#00000000',
    webPreferences: {
      preload: join(__dirname, '../preload/index.js'),
      sandbox: false
    }
  })

  mainWindow.setAlwaysOnTop(true, 'screen-saver')
  mainWindow.setIgnoreMouseEvents(true, { forward: true })

  mainWindow.once('ready-to-show', () => {
    mainWindow.show()

  })


  // Keyboard toggle for DevTools (F12 or Ctrl+Shift+I) in development
  if (is.dev) {
    mainWindow.webContents.on('before-input-event', (event, input) => {
      if (input.type !== 'keyDown') return
      const isF12 = input.key === 'F12'
      const isCtrlShiftI =
        (process.platform === 'darwin'
          ? input.meta
          : input.control) && input.shift && input.key.toUpperCase() === 'I'
      if (isF12 || isCtrlShiftI) {
        if (mainWindow.webContents.isDevToolsOpened()) {
          mainWindow.webContents.closeDevTools()
        } else {
          mainWindow.webContents.openDevTools({ mode: 'detach' })
        }
        event.preventDefault()
      }
    })
  }

  // HMR for renderer base on electron-vite cli.
  // Load the remote URL for development or the local html file for production.
  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    console.log('ELECTRON_RENDERER_URL:', process.env['ELECTRON_RENDERER_URL'])
    mainWindow.loadURL(`${process.env['ELECTRON_RENDERER_URL']}?window=1`)
  } else {
    mainWindow.loadURL(`${join(__dirname, '../renderer/index.html')}?window=1`)
  }
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  createWindow()

  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.

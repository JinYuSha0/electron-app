const { app, BrowserWindow, ipcMain } = require('electron')
const path = require('path')
const url = require('url')
const fs = require('fs')

const DEV = !!process.env.NODE_ENV
DEV ? require('electron-reload')(__dirname) : null

let mainWindow

const createWindow = () => {
    mainWindow = new BrowserWindow({show: false, width: 1235, height: 832, frame: false})

    mainWindow.loadURL(url.format({
        pathname: path.join(__dirname, './index.html'),
        protocol: 'file:',
        slashes: true
    }))

    mainWindow.on('closed', () => {
        mainWindow = null
    })

    //显示
    ipcMain.on('show-window', () => {
        mainWindow.show()
    })

    //最小化
    ipcMain.on('minimize-window', () => {
        mainWindow.minimize()
    })

    //最大化
    ipcMain.on('maximize-window', () => {
        mainWindow.maximize()
    })

    //最大化还原
    ipcMain.on('unmaximize-window', () => {
        mainWindow.unmaximize()
    })

    //退出
    ipcMain.on('close-all-window', () => {
        app.quit()
    })
}

app.on('ready', createWindow)

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
      app.quit()
    }
})

app.on('activate', () => {
    if (mainWindow === null) {
      createWindow()
    }
})

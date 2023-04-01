/*
 * @Author: June
 * @Description:
 * @Date: 2023-03-11 00:47:21
 * @LastEditors: June
 * @LastEditTime: 2023-04-01 17:53:11
 */
import { app, BrowserWindow } from 'electron'
import path from 'path'
import initTray from './modules/tray/index'
import createMenu from './modules/menu/index'

let win: any = null

const createWindow = () => {
    win = new BrowserWindow({
        width: 1080,
        height: 960,
        focusable: true,
        show: false,
        frame: true,
        resizable: true,
        fullscreenable: true,
        skipTaskbar: true, // 窗口是否不显示在任务栏上面
        // alwaysOnTop: true, // 窗口置顶
        transparent: true, // 窗口透明
        webPreferences: {
            webSecurity: false,
            contextIsolation: false,
            nodeIntegration: true,
            preload: path.join(__dirname, '..', 'preload/index.js')
        }
    })
    // app.isPackaged 如果应用已经打包，返回true ，否则返回false
    if (app.isPackaged) {
        win.loadFile(`./dist/index.html`)
    } else {
        win.loadURL('http://127.0.0.1:5173/')
    }
    win.once('ready-to-show', () => {
        win.show()
    })
}

app.whenReady().then(() => {
    createWindow()
    app.on('activate', () => {
        // 当应用被激活时发出。 各种操作都可以触发此事件, 例如首次启动应用程序、
        // 尝试在应用程序已运行时或单击应用程序的坞站或任务栏图标时重新激活它
        if (BrowserWindow.getAllWindows().length === 0) createWindow()
    })
    win.webContents.openDevTools()
    initTray(win)
    createMenu()
})

// 除了 macOS 外，当所有窗口都被关闭的时候退出程序
app.on('window-all-closed', () => {
    // process.platform Electron 目前只支持三个平台：win32 (Windows), linux (Linux) 和 darwin (macOS)
    if (process.platform !== 'darwin') app.quit()
})

// 客户端聚焦
// app.on('browser-window-focus', () => { })

// // 客户端失去焦点
// app.on('browser-window-blur', () => { })

// // 当所有窗口被关闭后触发，同时应用程序将退出
// app.on('will-quit', () => { })

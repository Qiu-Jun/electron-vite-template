/*
 * @Descripttion:
 * @version:
 * @Author: June
 * @Date: 2023-05-04 14:26:20
 * @LastEditors: June
 * @LastEditTime: 2023-05-05 01:00:33
 */
import { BrowserWindow, dialog } from 'electron'
import pkg from '../../../package.json'

interface Iparams {
    ops: any
    file?: string
    url?: string
}

export const defaultWinOps = {
    width: 1080,
    height: 960,
    focusable: true,
    show: false,
    frame: true,
    resizable: true,
    fullscreenable: true,
    // alwaysOnTop: true, // 窗口置顶
    transparent: true, // 窗口透明
    webPreferences: {
        webSecurity: false,
        contextIsolation: true, // 开启上下文隔离
        nodeIntegration: true
    }
}

// 创建新窗口
export function createWin({ ops, file, url }: Iparams) {
    if (!ops || Object.prototype.toString.call(ops) !== '[object Object]')
        throw new Error('必须传入窗口参数')
    const currentWin = BrowserWindow.getFocusedWindow() //获取当前活动的浏览器窗口
    let win: BrowserWindow | null = null
    if (currentWin) {
        const [currentWindowX, currentWindowY] = currentWin.getPosition()
        ops.x = currentWindowX + 10
        ops.y = currentWindowY + 10
    }
    const winOps = Object.assign(defaultWinOps, ops)
    win = new BrowserWindow(winOps)
    if (win) {
        file && win.loadFile(file)
        url && win.loadURL(url)
        win.once('ready-to-show', () => {
            win?.show()
        })
        win.on('closed', () => {
            win = null
        })
        win.webContents.on('did-fail-load', () => {
            dialog.showMessageBox({
                type: 'error',
                title: '窗口打开失败',
                message: `关于${pkg.name}\n当前版本 ${pkg.version}`
            })
        })
    }

    return win
}

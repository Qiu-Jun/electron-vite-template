/*
 * @Descripttion:
 * @version:
 * @Author: June
 * @Date: 2023-05-06 00:39:19
 * @LastEditors: June
 * @LastEditTime: 2023-05-06 00:53:47
 */
import { app, BrowserWindow, ipcMain } from 'electron'
import { autoUpdater } from 'electron-updater'

interface ISendData {
    cmd: string
    message: string | null
    progressObj?: any
    info?: any
}

const message = {
    error: '检查更新出错',
    checking: '正在检查更新…',
    updateAva: '正在更新',
    updateNotAva: '已经是最新版本',
    downloadProgress: '正在下载...'
}

export default function handleUpdate(win: BrowserWindow) {
    autoUpdater.autoDownload = false
    autoUpdater.setFeedURL('http://192.168.0.105:8080/')
    // 通过main进程发送事件给renderer进程，提示更新信息
    const sendUpdateMessage = (data: ISendData) => {
        win.webContents.send('update-message', data)
    }
    autoUpdater.on('error', function (_e) {
        // 异常处理
        sendUpdateMessage({ cmd: 'error', message: message.error })
    })
    autoUpdater.on('checking-for-update', function () {
        // 校验
        sendUpdateMessage({ cmd: 'checking-for-update', message: message.checking })
    })
    autoUpdater.on('update-available', function (info) {
        //可用更新
        sendUpdateMessage({ cmd: 'update-available', message: message.updateAva, info })
    })
    autoUpdater.on('update-not-available', function (info) {
        // 更新失败
        sendUpdateMessage({
            cmd: 'update-not-available',
            message: message.updateNotAva,
            info: info
        })
    })
    autoUpdater.on('download-progress', function (progressObj) {
        // 更新下载进度事件
        sendUpdateMessage({
            cmd: 'downloadProgress',
            message: message.downloadProgress,
            progressObj
        })
    })
    autoUpdater.on('update-downloaded', function () {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        ipcMain.on('isUpdateNow', (_e, _arg) => {
            // 开始更新
            autoUpdater.quitAndInstall()
            app.quit()
            // callback()
        })
        return sendUpdateMessage({ cmd: 'isUpdateNow', message: null })
    })

    ipcMain.on('checkForUpdate', () => {
        // 执行自动更新检查
        autoUpdater.checkForUpdates()
    })

    ipcMain.on('downloadUpdate', () => {
        // 执行下载
        autoUpdater.downloadUpdate()
    })
}

/*
 * @Descripttion:
 * @version:
 * @Author: June
 * @Date: 2023-03-13 00:57:21
 * @LastEditors: June
 * @LastEditTime: 2023-05-19 14:48:23
 */
import { app, Menu, Tray, nativeImage, dialog, BrowserWindow } from 'electron'
import path from 'path'
import pkg from '../../../../package.json'
import { createWin } from '../../utils/win'

const initTray = (win: any) => {
    const iconPath = path.join(__dirname, '../..', 'public/icon.png').replace('/\\/g', '\\\\')
    const tray = new Tray(nativeImage.createFromPath(iconPath))
    tray.setToolTip('Mall-Cook') // 鼠标指针在托盘图标上悬停时显示的文本
    const contextMenu = Menu.buildFromTemplate([
        {
            label: '关于',
            click: () => {
                const options = {
                    type: 'info',
                    title: `关于`,
                    message: `关于${pkg.name}\n当前版本 ${pkg.version}`,
                    buttons: []
                }
                dialog.showMessageBox(options)
            }
        },
        {
            label: '仓库地址',
            click: () => {
                createWin({
                    ops: {},
                    url: 'https://github.com/Qiu-Jun/electron-vite-template'
                })
            }
        },
        {
            label: '设置',
            submenu: [
                {
                    label: '开机自启',
                    type: 'checkbox',
                    checked: app.getLoginItemSettings().openAtLogin,
                    click: function () {
                        const curStatus = app.getLoginItemSettings().openAtLogin
                        if (!app.isPackaged) {
                            app.setLoginItemSettings({
                                openAtLogin: !curStatus,
                                path: process.execPath
                            })
                        } else {
                            app.setLoginItemSettings({
                                openAtLogin: !curStatus
                            })
                        }
                    }
                }
            ]
        },
        {
            label: '退出',
            click: () => {
                app.quit()
            }
        }
    ])

    // Call this again for Linux because we modified the context menu
    tray.setContextMenu(contextMenu)

    win &&
        tray.on('click', () => {
            if (!BrowserWindow.getAllWindows().length) return
            const winIsVisible: boolean = win.isVisible()
            // 窗口是否隐藏
            if (!winIsVisible) {
                win.show()
                // 展示加载动画
                win.webContents.send('show')
            } else {
                const s = 0.3
                // 展示退出动画
                win.webContents.send('hide', s)

                // 退出动画加载完之后再隐藏程序
                let timer: any = setTimeout(() => {
                    win.hide()
                    clearTimeout(timer)
                    timer = null
                }, s * 1000)
            }
        })
}

export default initTray

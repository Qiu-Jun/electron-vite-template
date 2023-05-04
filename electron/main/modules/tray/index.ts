/*
 * @Descripttion:
 * @version:
 * @Author: June
 * @Date: 2023-03-13 00:57:21
 * @LastEditors: June
 * @LastEditTime: 2023-05-04 12:45:01
 */
import { app, Menu, Tray, nativeImage } from 'electron'
import path from 'path'

const initTray = (win: any) => {
    const iconPath = path.join(__dirname, '../..', 'public/icon.ico').replace('/\\/g', '\\\\')
    const tray = new Tray(nativeImage.createFromPath(iconPath))
    tray.setToolTip('Mall-Cook') // 鼠标指针在托盘图标上悬停时显示的文本
    const contextMenu = Menu.buildFromTemplate([
        {
            label: '退出',
            type: 'radio',
            click: () => {
                app.quit()
            },
            checked: true
        },
        { label: '测试占位', type: 'radio' }
    ])

    // Call this again for Linux because we modified the context menu
    tray.setContextMenu(contextMenu)

    win &&
        tray.on('click', () => {
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

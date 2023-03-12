/*
 * @Descripttion: 
 * @version: 
 * @Author: June
 * @Date: 2023-03-13 00:57:21
 * @LastEditors: June
 * @LastEditTime: 2023-03-13 01:05:28
 */
import { app, Menu, Tray,nativeImage } from 'electron'
import path from 'path'

const initTray = () => {
    const iconPath = path.join(__dirname, '/icone.ico').replace('/\\/g','\\\\');
    const appIcon = new Tray(nativeImage.createFromPath(iconPath))
    appIcon.setToolTip('Mall-Cook') // 鼠标指针在托盘图标上悬停时显示的文本
    const contextMenu = Menu.buildFromTemplate([
        { 
            label: '退出',
            type: 'radio',
            click: ()=>{
                app.quit()
            },
            checked: true
        },
        { label: '测试占位', type: 'radio' }
    ])

    // Call this again for Linux because we modified the context menu
    appIcon.setContextMenu(contextMenu)
}

export default initTray

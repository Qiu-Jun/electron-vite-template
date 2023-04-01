import { ipcRenderer } from 'electron'

// 对应下面的 win.webContents.send("show");
// 默认有个 event 事件参数
ipcRenderer.on('show', (e) => {
    const root = document.querySelector('#app') as HTMLElement
    root.style.animation = 'show 0.3s linear forwards'
})

// 对应下面的 win.webContents.send("hide", s);
ipcRenderer.on('hide', (e, s: number) => {
    const root = document.querySelector('#app') as HTMLElement
    root.style.animation = `hide ${s}s linear forwards`
})

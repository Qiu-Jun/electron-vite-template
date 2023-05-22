/*
 * @Author: June
 * @Description:
 * @Date: 2023-03-11 00:44:53
 * @LastEditors: June
 * @LastEditTime: 2023-05-22 10:10:28
 */
export interface IElectronAPI {
    platform: string
    ipcRenderer: any
}

declare global {
    interface Window {
        electronAPI: IElectronAPI
    }
}

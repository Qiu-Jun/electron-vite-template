/*
 * @Author: June
 * @Description:
 * @Date: 2023-03-11 00:44:53
 * @LastEditors: June
 * @LastEditTime: 2023-03-11 01:11:02
 */
export interface IElectronAPI {
    platform: string
}

declare global {
    interface Window {
        electronAPI: IElectronAPI
    }

    export default Window
}

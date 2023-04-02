/*
 * @Author: June
 * @Description:
 * @Date: 2023-03-11 00:44:53
 * @LastEditors: June
 * @LastEditTime: 2023-04-02 15:27:07
 */
export interface IElectronAPI {
    platform: string
}

declare global {
    interface Window {
        electronAPI: IElectronAPI
    }
}

/*
 * @Author: June
 * @Description: 
 * @Date: 2023-03-11 00:41:24
 * @LastEditors: June
 * @LastEditTime: 2023-03-11 12:16:03
 */
import { defineConfig, loadEnv } from 'vite'
import type { UserConfig, ConfigEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import * as path from 'path'
import { createHtmlPlugin } from "vite-plugin-html"
import electron from 'vite-plugin-electron'
import electronRenderer from 'vite-plugin-electron-renderer'

export default defineConfig(({ command, mode }: ConfigEnv): UserConfig => {
    const envData = loadEnv(mode, process.cwd())
    return {
        base: './',
        plugins: [
            vue(),
            createHtmlPlugin({
                inject: {
                  data: {
                    title: envData.VITE_APP_TITLE,
                  },
                },
            }),
            electron({
                entry: './src/main/index.ts'
            }),
            electronRenderer()
        ],
        resolve: {
            alias: {
                '@': path.resolve(__dirname, 'src/render')
            },
        }
    }
})

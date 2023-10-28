/*
 * @Author: June
 * @Description:
 * @Date: 2023-03-11 00:41:24
 * @LastEditors: June
 * @LastEditTime: 2023-10-27 20:35:55
 */
import { defineConfig, loadEnv } from 'vite'
import type { UserConfig, ConfigEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import * as path from 'path'
import { createHtmlPlugin } from 'vite-plugin-html'
import electron from 'vite-plugin-electron'
import AutoImport from 'unplugin-auto-import/vite'

export default defineConfig(({ command, mode }: ConfigEnv): UserConfig => {
    const envData = loadEnv(mode, process.cwd())
    const plugins = [
        vue(),
        createHtmlPlugin({
            inject: {
                data: {
                    title: envData.VITE_APP_TITLE
                }
            }
        }),
        AutoImport({
            // 处理eslint 配置打开运行一次，生产后关闭
            eslintrc: {
                enabled: true, // Default `false`
                filepath: './.eslintrc-auto-import.json', // Default `./.eslintrc-auto-import.json`
                globalsPropValue: true // Default `true`, (true | false | 'readonly' | 'readable' | 'writable' | 'writeable')
            },

            dts: './src/types/auto-imports.d.ts',
            imports: ['vue', 'vue-router']
        })
    ]
    if (command === 'serve' && mode === 'develectron') {
        plugins.push(
            electron([
                {
                    entry: 'electron/main/index.ts',
                    vite: {
                        build: {
                            outDir: 'dist-electron/main'
                        }
                    }
                },
                {
                    entry: 'electron/preload/index.ts',
                    vite: {
                        build: {
                            outDir: 'dist-electron/preload'
                        }
                    }
                }
            ])
        )
    }
    return {
        base: './',
        plugins,
        resolve: {
            alias: {
                '@': path.resolve(__dirname, 'src')
            }
        }
    }
})

/*
 * @Author: June
 * @Description: 
 * @Date: 2023-03-11 01:02:44
 * @LastEditors: June
 * @LastEditTime: 2023-03-11 02:46:34
 */
import { createApp } from 'vue'
import router from '@/router/index'
import store from '@/store/index'
import App from './App.vue'
import './styles/reset.scss'

;(function runApp() {
    const app = createApp(App)
    app.use(router)
    app.use(store)
    app.mount('#app')
})()

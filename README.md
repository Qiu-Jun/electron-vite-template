<!--
 * @Descripttion: 
 * @version: 
 * @Author: June
 * @Date: 2023-03-12 22:16:24
 * @LastEditors: June
 * @LastEditTime: 2023-03-13 01:21:36
-->
## electron-vite-template
基于vite的electron 空白脚手架, 可以把src换成react，替换掉react对应的库即可

## 目录接受
+ electron 主进程
    + modules 主进程的一些模块
    + main
    + preload 预加载
+ public 静态资源
+ src 渲染进程(可换成对应的react)
+ types
+ ...
## TODO
- [x] 搭建目录结构
- [ ] eslist + prettire
- [ ] commit校验
- [ ] 打包优化

## 工具库说明
+ kill-port: 清理端口
+ cross-env: 设置环境变量
+ npm-run-all: 顺序执行script脚本
+ concurrently: 并行执行script脚本
+ tsc-watch: 编译ts文件,并在文件修改后重新执行编译
+ wait-on: 等待文件/端口等变化后执行script脚本

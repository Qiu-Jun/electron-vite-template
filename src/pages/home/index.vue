<!--
 * @Descripttion:
 * @version:
 * @Author: June
 * @Date: 2023-03-13 23:43:01
 * @LastEditors: June
 * @LastEditTime: 2023-05-22 10:20:27
-->
<template>
    <div>home1</div>
</template>

<script lang="ts" setup>
const platform = window.electronAPI.platform
console.log(platform)
console.log(window)

window.electronAPI.ipcRenderer.send('checking-for-update')
</script>

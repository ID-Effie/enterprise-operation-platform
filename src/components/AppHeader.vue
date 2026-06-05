<!--
 * @Description: 顶部栏组件
  AppHeader 只展示顶部栏，通过 emit 通知退出登录
 * @Author: zhaoyang.sun@proinnova.com.cn
 * @Date: 2026-05-22 16:28:04
-->
<script setup lang="ts">
withDefaults(
  defineProps<{
    title: string
    username?: string
  }>(),
  {
    username: '管理员'
  }
)
const emit = defineEmits<{
  logout: []
}>()
</script>

<template>
  <header class="app-header">
    <div>
      <p class="eyebrow">Operation</p>
      <h1>{{ title }}</h1>
    </div>
    <div class="header-actions">
      <div class="header-user">{{ username }}</div>
      <button class="log-out" type="button" @click="emit('logout')">退出</button>
    </div>
  </header>
</template>

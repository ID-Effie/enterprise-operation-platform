<!--
 * @Description: 侧边栏组件负责品牌区域和菜单区域。
  AppSidebar 接收菜单数据和当前路径，负责展示侧边栏。
 * @Author: zhaoyang.sun@proinnova.com.cn
 * @Date: 2026-05-28 21:11:17
-->
<template>
  <aside class="app-sidebar">
    <div class="brand">
      <span class="brand-mark">EP</span>
      <div>
        <strong>运营平台</strong>
        <small>Enterprise Console</small>
      </div>
    </div>
    <AppSideMenu
      :menus="menus"
      :active-path="activePath"
      @select="(path) => emit('select', path)"
    />
  </aside>
</template>
<script setup lang="ts">
import AppSideMenu from './AppSideMenu.vue'
import type { MenuItem } from '@/types/menu'
defineProps<{
  menus: MenuItem[]
  activePath: string
}>()

const emit = defineEmits<{
  select: [path: MenuItem['path']]
}>()
</script>

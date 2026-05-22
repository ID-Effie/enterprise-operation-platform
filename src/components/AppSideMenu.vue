<!--
 * @Description: 菜单组件
 * @Author: zhaoyang.sun@proinnova.com.cn
 * @Date: 2026-05-22 16:18:36
-->
<script setup lang="ts">
import type { MenuItem } from "@/types/menu";

defineProps<{
  menus: MenuItem[];
  activePath: string;
}>();

const emit = defineEmits<{
  select: [path: MenuItem["path"]];
}>();
</script>

<template>
  <nav class="side-menu" aria-label="主导航">
    <RouterLink
      v-for="item in menus"
      :key="item.path"
      :to="item.path"
      class="side-menu-item"
      :class="{ active: item.path === activePath }"
      @click="emit('select', item.path)"
    >
      {{ item.title }}
    </RouterLink>
  </nav>
</template>

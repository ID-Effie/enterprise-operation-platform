<!--
 * @Description: 状态标签组件
    页面不再关心状态标签怎么渲染，
    只负责把“状态文案”和“状态颜色”传进去
 * @Author: zhaoyang.sun@proinnova.com.cn
 * @Date: 2026-05-22 17:05:53
-->
<template>
  <span class="status-pill" :class="tagClass">
    {{ text }}
  </span>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { StatusColor } from '@/constants/status'

const props = defineProps<{
  text: string
  color: StatusColor
}>()

const tagClass = computed(() => `status-pill--${props.color}`)
</script>

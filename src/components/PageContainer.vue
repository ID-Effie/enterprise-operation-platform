<!--
 * @Description: 抽一个简单的页面容器组件
 * @Author: zhaoyang.sun@proinnova.com.cn
 * @Date: 2026-05-12 16:20:24
-->
<template>
  <section class="content-section business-page">
    <div class="page-heading">
      <div>
        <h2>{{ title }}</h2>
        <p v-if="description" class="description">
          {{ description }}
        </p>
      </div>
    </div>

    <slot />
  </section>
</template>

<script setup lang="ts">
interface PageContainerProps {
  title: string;
  description?: string;
}
defineProps<PageContainerProps>();
</script>

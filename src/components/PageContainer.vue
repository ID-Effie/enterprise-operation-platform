<!--
 * @Description: 
    标题区插槽 <slot name="title">...</slot>
    操作区插槽 <slot name="actions" />
    默认内容区 <slot /> 承载查询区、表格区、列表区等主体内容。
    然后应用到客户、订单、用户页面
 * @Author: zhaoyang.sun@proinnova.com.cn
 * @Date: 2026-05-12 16:20:24
-->
<template>
  <section class="content-section business-page">
    <div class="page-heading">
      <div>
        <slot name="title">
          <!-- 给 title 插槽提供默认内容。 -->
          <h2>{{ title }}</h2>
          <p v-if="description" class="description">
            {{ description }}
          </p>
        </slot>
      </div>

      <div v-if="$slots.actions" class="page-actions">
        <slot name="actions" />
      </div>
    </div>

    <slot />
  </section>
</template>

<script setup lang="ts">
interface PageContainerProps {
  title?: string
  description?: string
}
defineProps<PageContainerProps>()
</script>

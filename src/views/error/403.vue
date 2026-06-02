<!--
 * @Description: 
 * @Author: zhaoyang.sun@proinnova.com.cn
 * @Date: 2026-06-02 20:23:37
-->
<template>
  <main class="not-found-page">
    <section>
      <p class="eyebrow">403</p>
      <h1>没有权限</h1>
      <p class="description">当前用户没有权限访问，请联系管理员。</p>

      <div class="actions">
        <RouterLink class="primary-link" to="/dashboard">回到首页</RouterLink>
        <RouterLink class="secondary-link" to="/login">去登录页</RouterLink>
      </div>
    </section>
  </main>
</template>

<script setup lang="ts"></script>

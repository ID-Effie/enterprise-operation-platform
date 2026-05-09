<template>
  <main class="not-found-page">
    <section>
      <p class="eyebrow">404</p>
      <h1>页面不存在</h1>
      <p class="description">当前地址没有匹配到页面，请返回运营概览或登录页。</p>

      <div class="actions">
        <RouterLink class="primary-link" to="/dashboard">回到首页</RouterLink>
        <RouterLink class="secondary-link" to="/login">去登录页</RouterLink>
      </div>
    </section>
  </main>
</template>

<script setup lang="ts"></script>

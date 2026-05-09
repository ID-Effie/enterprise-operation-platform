<template>
  <main class="auth-page">
    <section class="auth-panel">
      <p class="eyebrow">Enterprise Operation Platform</p>
      <h1>登录工作台</h1>
      <p class="description">进入运营平台，查看今日业务概览与待处理事项。</p>

      <form class="login-form">
        <label>
          <span>账号</span>
          <input type="text" placeholder="admin@example.com" />
        </label>

        <label>
          <span>密码</span>
          <input type="password" placeholder="请输入密码" />
        </label>

        <RouterLink class="primary-link" to="/dashboard">登录</RouterLink>
      </form>
    </section>
  </main>
</template>

<script setup lang="ts"></script>

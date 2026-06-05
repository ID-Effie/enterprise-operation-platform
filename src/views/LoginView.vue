<template>
  <main class="auth-page">
    <section class="auth-panel">
      <p class="eyebrow">Enterprise Operation Platform</p>
      <h1>登录工作台</h1>
      <p class="description">进入运营平台，查看今日业务概览与待处理事项。</p>

      <form class="login-form" @submit.prevent="handleLogin">
        <label>
          <span>账号</span>
          <input v-model="username" type="text" placeholder="请输入账号" />
        </label>

        <label>
          <span>密码</span>
          <input v-model="password" type="password" placeholder="请输入密码" />
        </label>

        <p v-if="errorMessage" class="login-error">
          {{ errorMessage }}
        </p>

        <button class="primary-link" type="submit" :disabled="loading">
          {{ loading ? '登录中...' : '登录' }}
        </button>
      </form>
    </section>
  </main>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const username = ref('')
const password = ref('')
const loading = ref(false)
const errorMessage = ref('')

const router = useRouter()
const authStore = useAuthStore()

async function handleLogin() {
  try {
    loading.value = true
    errorMessage.value = ''

    // 这样登录状态就统一归 store 管，不散落在页面里
    await authStore.login({
      username: username.value,
      password: password.value
    })

    router.push('/')
  } catch {
    errorMessage.value = '账号或密码错误'
  } finally {
    loading.value = false
  }
}
</script>

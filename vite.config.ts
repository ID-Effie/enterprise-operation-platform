import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()], //接入 Vue、自动导入、组件库等插件
  resolve: {
    // 配置路径别名。
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  // 开发服务器配置，例如端口、代理、是否自动打开浏览器
  server: {
    port: 5173,
    open: true
  }
})

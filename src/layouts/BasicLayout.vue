<!--
 * BasicLayout 只保留这些职责：BasicLayout 管理布局状态和业务动作。
      请求菜单数据
      计算当前标题
      处理退出登录
      处理菜单选择事件
      组合布局组件
 * BasicLayout.vue 管理布局状态和业务动作。
      ├─ AppSidebar.vue   接收菜单数据和当前路径，负责展示侧边栏。
      │  └─ AppSideMenu.vue  只负责渲染菜单列表。
      ├─ AppHeader.vue   只展示顶部栏，通过 emit 通知退出登录。
      └─ AppMain.vue  只负责页面内容容器。
        └─ RouterView
-->

<template>
  <div class="app-layout">
    <!-- 侧边栏 -->
    <AppSidebar :menus="menus" :active-path="route.path" @select="handleMenuSelect" />

    <section class="app-shell">
      <!-- 顶部栏 -->
      <AppHeader :title="currentTitle" :username="userStore.username" @logout="logOut" />

      <!-- 内容区 Main =>当前路由页面 -->
      <AppMain>
        <RouterView />
      </AppMain>
    </section>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { getUserMenus } from '@/api/modules/menu'
import type { MenuItem } from '@/types/menu'
import AppSidebar from '@/components/AppSidebar.vue'
import AppHeader from '@/components/AppHeader.vue'
import AppMain from '@/components/AppMain.vue'
import { useAuthStore } from '@/stores/auth'
import { useUserStore } from '@/stores/user'
import { usePermissionStore } from '@/stores/permission'

// 菜单 path 要和路由 path 对上,否则点击菜单会进入 404 或空页面。

const route = useRoute() // 获取当前路由信息。只能读
const router = useRouter() // 路由实例，可以跳转
const menus = ref<MenuItem[]>([])
const authStore = useAuthStore()
const userStore = useUserStore()
const permissionStore = usePermissionStore()

onMounted(async () => {
  const res = await getUserMenus()
  menus.value = res.data.filter((menu) => {
    if (!menu.permission) {
      return true
    }

    return permissionStore.hasPermissions(menu.permission)
  })

  // 你的侧边栏本来就是通过 AppSidebar -> AppSideMenu 渲染 menus，
  // 所以这里一过滤，侧边栏自然就变成权限菜单。
  permissionStore.setMenus(menus.value.map((menu) => menu.path))
})

const currentTitle = computed(() => {
  const activeMenu = menus.value.find((item) => item.path === route.path)

  return activeMenu?.title ?? '运营平台'
})

async function logOut() {
  await authStore.logout()
  router.push('/login')
}

function handleMenuSelect(path: MenuItem['path']) {
  console.log('当前菜单：', path)
}
</script>

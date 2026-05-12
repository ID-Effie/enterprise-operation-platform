<template>
  <div class="app-layout">
    <!-- 侧边栏 -->
    <aside class="app-sidebar">
      <div class="brand">
        <span class="brand-mark">EP</span>
        <div>
          <strong>运营平台</strong>
          <small>Enterprise Console</small>
        </div>
      </div>

      <nav class="side-menu" aria-label="主导航">
        <RouterLink
          v-for="item in menus"
          :key="item.path"
          :to="item.path"
          class="side-menu-item"
        >
          {{ item.title }}
        </RouterLink>
      </nav>
    </aside>

    <section class="app-shell">
      <!-- 顶部栏 -->
      <header class="app-header">
        <div>
          <p class="eyebrow">Operation</p>
          <h1>{{ currentTitle }}</h1>
        </div>
        <div class="header-user">管理员</div>
      </header>

      <!-- 内容区 Main =>当前路由页面 -->
      <main class="app-content">
        <RouterView />
      </main>
    </section>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useRoute } from "vue-router";

type MenuItem = {
  title: string;
  path: string;
};

// 菜单 path 要和路由 path 对上,否则点击菜单会进入 404 或空页面。
const menus: MenuItem[] = [
  { title: "首页", path: "/dashboard" },
  { title: "客户管理", path: "/customers" },
  { title: "订单管理", path: "/orders" },
  { title: "用户管理", path: "/users" },
  { title: "系统管理", path: "/system" },
];

const route = useRoute(); // 获取当前路由信息。

const currentTitle = computed(() => {
  const activeMenu = menus.find((item) => item.path === route.path);

  return activeMenu?.title ?? "运营平台";
});
</script>

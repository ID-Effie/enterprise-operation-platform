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
      <AppSideMenu
        :menus="menus"
        :active-path="route.path"
        @select="handleMenuSelect"
      />
    </aside>

    <section class="app-shell">
      <!-- 顶部栏 -->
      <AppToBar :title="currentTitle" username="管理员" @logout="logOut" />
      <!-- 内容区 Main =>当前路由页面 -->
      <main class="app-content">
        <RouterView />
      </main>
    </section>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { getUserMenus } from "@/api/modules/menu";
import type { MenuItem } from "@/types/menu";
import AppSideMenu from "@/components/AppSideMenu.vue";
import AppToBar from "@/components/AppToBar.vue";

// 菜单 path 要和路由 path 对上,否则点击菜单会进入 404 或空页面。

const route = useRoute(); // 获取当前路由信息。只能读
const router = useRouter(); // 路由实例，可以跳转
const menus = ref<MenuItem[]>([]);

onMounted(async () => {
  const res = await getUserMenus();
  menus.value = res.data;
});

const currentTitle = computed(() => {
  const activeMenu = menus.value.find((item) => item.path === route.path);

  return activeMenu?.title ?? "运营平台";
});

function logOut() {
  localStorage.removeItem("token");
  router.push("/login");
}

function handleMenuSelect(path: MenuItem["path"]) {
  console.log("当前菜单：", path);
}
</script>

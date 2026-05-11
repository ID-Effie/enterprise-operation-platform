import { createRouter, createWebHistory } from "vue-router";
import BasicLayout from "../layouts/BasicLayout.vue";
import DashboardView from "../views/DashboardView.vue";
import LoginView from "../views/LoginView.vue";
import NotFoundView from "../views/NotFoundView.vue";
import CustomersView from "../views/CustomersView.vue";
import OrdersView from "../views/OrdersView.vue";
import SystemView from "../views/SystemView.vue";

//createWebHistory() 表示使用正常 URL 模式（/dashboard）而不是 hash 模式（/#/dashboard）
const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      redirect: "/dashboard",
    },
    {
      path: "/login",
      name: "login",
      component: LoginView,
    },
    // Layout 不应该只是一个普通页面，它应该作为父级路由组件，子页面通过 RouterView 显示。
    {
      path: "/dashboard",
      name: "dashboard",
      component: BasicLayout,
      children: [
        {
          path: "",
          component: DashboardView,
        },
      ],
      // RouteMeta 是给路由附加说明用的
      meta: {
        title: "首页", // title 可以用于顶部栏标题、浏览器标题、面包屑
        requiresAuth: true, // 可以用于后面做登录权限判断
      },
    },
    {
      path: "/customers",
      name: "customers",
      component: BasicLayout,
      children: [
        {
          path: "",
          component: CustomersView,
        },
      ],
    },
    {
      path: "/orders",
      name: "orders",
      component: BasicLayout,
      children: [
        {
          path: "",
          component: OrdersView,
        },
      ],
    },
    {
      path: "/system",
      name: "system",
      component: BasicLayout,
      children: [
        {
          path: "",
          component: SystemView,
        },
      ],
    },
    {
      // path: '/:pathMatch(.*)*' 是 Vue Router 4 的通配 404 路由，用来匹配所有未定义的路径，并显示 NotFound 页面。
      path: "/:pathMatch(.*)*",
      name: "not-found",
      component: NotFoundView,
    },
  ],
});

export default router;

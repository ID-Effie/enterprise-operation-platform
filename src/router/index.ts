import { createRouter, createWebHistory } from "vue-router";
import BasicLayout from "../layouts/BasicLayout.vue";
import DashboardView from "../views/DashboardView.vue";
import LoginView from "../views/LoginView.vue";
import NotFoundView from "../views/NotFoundView.vue";
import CustomersView from "../views/CustomersView.vue";
import OrdersView from "../views/OrdersView.vue";
import SystemView from "../views/SystemView.vue";
import UsersView from "../views/UsersView.vue";

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
      meta: {
        title: "客户管理页面",
        requiresAuth: true, // 可以用于后面做登录权限判断
      },
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
      meta: {
        title: "订单管理页面", // title 可以用于顶部栏标题、浏览器标题、面包屑
        requiresAuth: true, // 可以用于后面做登录权限判断
      },
    },
    {
      path: "/users",
      name: "users",
      component: BasicLayout,
      children: [
        {
          path: "",
          component: UsersView,
        },
      ],
      meta: {
        title: "用户管理页", // title 可以用于顶部栏标题、浏览器标题、面包屑
        requiresAuth: true, // 可以用于后面做登录权限判断
      },
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
      meta: {
        title: "系统管理页面", // title 可以用于顶部栏标题、浏览器标题、面包屑
        requiresAuth: true, // 可以用于后面做登录权限判断
      },
    },
    {
      // path: '/:pathMatch(.*)*' 是 Vue Router 4 的通配 404 路由，用来匹配所有未定义的路径，并显示 NotFound 页面。
      path: "/:pathMatch(.*)*",
      name: "not-found",
      component: NotFoundView,
    },
  ],
});

// beforeEach 是 Vue Router 的全局前置守卫
// 每次路由跳转之前，都会先执行这里的逻辑。
// 登录权限判断、页面标题设置、角色权限判断
router.beforeEach((to) => {
  const token = localStorage.getItem("token");

  // 已登录(有token)时访问登录页，自动去首页
  if (to.path === "/login" && token) {
    return "/dashboard";
  }
  if (to.meta.requiresAuth && !token) {
    return "/login";
  }

  return true;
});

export default router;

import { createRouter, createWebHistory } from "vue-router";
import BasicLayout from "../layouts/BasicLayout.vue";
import DashboardView from "../views/DashboardView.vue";
import LoginView from "../views/LoginView.vue";
import ForbiddenView from "../views/error/403.vue";
import NotFoundView from "../views/error/404.vue";
import CustomersView from "../views/CustomersView.vue";
import OrdersView from "../views/OrdersView.vue";
import SystemView from "../views/SystemView.vue";
import UsersView from "../views/UsersView.vue";

//createWebHistory() 表示使用正常 URL 模式（/dashboard）而不是 hash 模式（/#/dashboard）
const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/login",
      name: "Login",
      component: LoginView,
      meta: {
        title: "登录",
      },
    },
    // Layout 不应该只是一个普通页面，它应该作为父级路由组件，子页面通过 RouterView 显示。
    {
      path: "/",
      name: "Root",
      component: BasicLayout,
      redirect: "/dashboard",
      children: [
        {
          path: "dashboard",
          name: "Dashboard",
          component: DashboardView,
          // RouteMeta 是给路由附加说明用的
          // meta 是路由元信息，用来给路由补充业务属性
          // 它不会直接影响 Vue Router 行为，但可以被菜单、权限、标题、面包屑、缓存策略读取。
          /** 后台项目常用 meta 字段：
           *  title：页面标题 / 菜单名
              requiresAuth：是否需要登录
              permission：访问页面需要的权限标识
              hidden：是否在菜单中隐藏
              icon：菜单图标
              keepAlive：是否缓存页面
          */
          meta: {
            title: "首页", // title 可以用于顶部栏标题、浏览器标题、面包屑
            requiresAuth: true, // 可以用于后面做登录权限判断
            permission: "dashboard:view",
          },
        },
        {
          path: "customers",
          name: "Customers",
          component: CustomersView,
          meta: {
            title: "客户管理页面",
            requiresAuth: true, // 可以用于后面做登录权限判断
            permission: "customer:list",
          },
        },
        {
          path: "orders",
          name: "Orders",
          component: OrdersView,
          meta: {
            title: "订单管理页面", // title 可以用于顶部栏标题、浏览器标题、面包屑
            requiresAuth: true, // 可以用于后面做登录权限判断
            permission: "order:list",
          },
        },
        {
          path: "users",
          name: "Users",
          component: UsersView,
          meta: {
            title: "用户管理页", // title 可以用于顶部栏标题、浏览器标题、面包屑
            requiresAuth: true, // 可以用于后面做登录权限判断
            permission: "user:list",
          },
        },
        {
          path: "system",
          name: "System",
          component: SystemView,
          meta: {
            title: "系统管理页面", // title 可以用于顶部栏标题、浏览器标题、面包屑
            requiresAuth: true, // 可以用于后面做登录权限判断
            permission: "system:manage", // 进入页面需要什么权限
          },
        },
      ],
    },
    {
      path: "/403",
      name: "Forbidden",
      component: ForbiddenView,
      meta: {
        title: "无权限",
      },
    },
    {
      // path: '/:pathMatch(.*)*' 是 Vue Router 4 的通配 404 路由，用来匹配所有未定义的路径，并显示 NotFound 页面。
      path: "/:pathMatch(.*)*",
      name: "Notfound",
      component: NotFoundView,
      meta: {
        title: "页面不存在",
      },
    },
  ],
});

// beforeEach 是 Vue Router 的全局前置守卫
// 每次路由跳转之前，都会先执行这里的逻辑。
// 登录权限判断、页面标题设置、角色权限判断
router.beforeEach((to) => {
  const token = localStorage.getItem("token");
  const permissions = [
    "dashboard:view",
    "customer:list",
    "order:list",
    "user:list",
    "system:manage",
  ];

  // 已登录(有token)时访问登录页，自动去首页
  if (to.path === "/login" && token) {
    return "/dashboard";
  }

  if (to.meta.requiresAuth && !token) {
    return {
      path: "/login",
      query: {
        redirect: to.fullPath,
      },
    };
  }

  if (
    to.meta.permission &&
    !permissions.includes(to.meta.permission as string)
  ) {
    return "/403";
  }

  if (to.meta.title) {
    document.title = `${to.meta.title} - 企业运营平台`;
  }

  return true;
});

export default router;

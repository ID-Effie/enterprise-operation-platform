# 项目目录设计文档 V1

## 一、文档目标

本文档用于说明 `enterprise-operation-platform` 当前阶段的项目目录设计。

当前项目定位是一个基于 Vue 3、TypeScript、Vite 的中后台练习项目，后续会持续接入登录、布局、路由、状态管理、请求层、权限控制和业务页面。

目录设计的目标不是把文件分得越细越好，而是让每类代码都有清晰归属：

- 页面放在哪里。
- 接口放在哪里。
- 类型放在哪里。
- 通用组件放在哪里。
- 可复用逻辑放在哪里。
- 权限、状态、工具函数如何分层。

一句话原则：

```text
按职责拆目录，让每个文件一看路径就能大概知道它负责什么。
```

## 二、当前目录结构

当前核心目录结构如下：

```text
enterprise-operation-platform/
  public/
  src/
    api/
      modules/
        auth.ts
        customer.ts
        menu.ts
        order.ts
        user.ts
      request.ts
    assets/
      hero.png
    components/
      AppHeader.vue
      AppMain.vue
      AppSideMenu.vue
      AppSidebar.vue
      PageContainer.vue
      StatusTag.vue
    composables/
      useLoading.ts
      useModal.ts
      usePagination.ts
    constants/
      status.ts
    directives/
      index.ts
      permission.ts
    layouts/
      BasicLayout.vue
    router/
      index.ts
    stores/
      auth.ts
    styles/
    types/
      approval.ts
      common.ts
      customer.ts
      menu.ts
      order.ts
      user.ts
    utils/
    views/
      CustomersView.vue
      DashboardView.vue
      LoginView.vue
      NotFoundView.vue
      OrdersView.vue
      SystemView.vue
      UsersView.vue
    App.vue
    main.ts
    style.css
  index.html
  package.json
  tsconfig.app.json
  vite.config.ts
```

说明：

- `dist/` 是构建产物，不作为源码目录设计的一部分。
- `node_modules/` 是依赖安装目录，不参与源码目录设计。
- `src/style.css` 当前保留为全局样式入口，后续可以逐步迁移或拆分到 `src/styles/`。

## 三、目录职责说明

| 目录 | 职责 | 当前示例 |
| --- | --- | --- |
| `src/api` | 接口请求层，统一管理请求入口和业务接口模块 | `request.ts`、`modules/user.ts` |
| `src/assets` | 静态资源，如图片、字体、图标 | `hero.png` |
| `src/components` | 通用组件、布局子组件、可复用业务组件 | `PageContainer.vue`、`StatusTag.vue` |
| `src/composables` | Vue 组合式函数，封装可复用状态逻辑 | `usePagination.ts`、`useModal.ts` |
| `src/constants` | 固定业务常量、状态映射、选项配置 | `status.ts` |
| `src/directives` | 全局或局部自定义指令 | `permission.ts` |
| `src/layouts` | 页面整体布局，不承载具体业务列表 | `BasicLayout.vue` |
| `src/router` | 路由表、路由守卫、路由元信息 | `index.ts` |
| `src/stores` | Pinia 全局状态管理 | `auth.ts` |
| `src/styles` | 全局样式、变量、重置样式、主题样式 | 当前预留 |
| `src/types` | TypeScript 类型定义 | `common.ts`、`user.ts` |
| `src/utils` | 通用工具函数，不依赖具体页面状态 | 当前预留 |
| `src/views` | 页面级组件，通常和路由对应 | `UsersView.vue`、`OrdersView.vue` |

## 四、核心目录设计

### 1. `api`：请求层

`api` 目录负责接口请求相关代码。

当前结构：

```text
src/api/
  request.ts
  modules/
    auth.ts
    customer.ts
    menu.ts
    order.ts
    user.ts
```

设计规则：

- `request.ts` 只放统一请求入口、统一响应处理、请求配置类型。
- `modules/` 下按业务模块拆接口文件。
- 页面不直接写 mock 数据或请求实现，页面只调用接口函数。
- 接口入参和出参尽量复用 `src/types` 中的类型。

示例职责：

- `auth.ts`：登录、退出登录。
- `user.ts`：用户信息、用户列表、用户状态修改。
- `menu.ts`：用户菜单、权限菜单。
- `customer.ts`：客户列表。
- `order.ts`：订单列表。

不建议放入 `api` 的内容：

- 页面 loading 状态。
- 表格展示逻辑。
- 组件 props 类型。
- 通用格式化函数。

### 2. `views`：页面层

`views` 目录负责页面级组件。

当前页面：

```text
src/views/
  CustomersView.vue
  DashboardView.vue
  LoginView.vue
  NotFoundView.vue
  OrdersView.vue
  SystemView.vue
  UsersView.vue
```

设计规则：

- 一个路由页面对应一个 `View.vue` 文件。
- 页面可以组合 `api`、`stores`、`components`、`composables`。
- 页面负责业务编排，但不应该沉淀大量可复用底层逻辑。
- 如果页面里出现可复用状态逻辑，优先抽到 `composables`。
- 如果页面里出现可复用 UI 结构，优先抽到 `components`。

示例：

- `UsersView.vue` 负责用户列表页面。
- `OrdersView.vue` 负责订单列表页面。
- `LoginView.vue` 负责登录页面。

### 3. `components`：通用组件层

`components` 目录负责可复用组件。

当前组件：

```text
src/components/
  AppHeader.vue
  AppMain.vue
  AppSideMenu.vue
  AppSidebar.vue
  PageContainer.vue
  StatusTag.vue
```

设计规则：

- 组件通过 `props` 接收数据。
- 组件通过 `emits` 向上通知事件。
- 组件不直接调用业务接口，除非它本身就是明确的业务容器组件。
- 可复用组件不直接依赖某个具体页面。

当前组件职责：

- `PageContainer.vue`：统一业务页面标题区、操作区和内容区。
- `StatusTag.vue`：统一状态标签展示。
- `AppHeader.vue`：后台顶部栏。
- `AppSidebar.vue`：后台侧边栏外壳。
- `AppSideMenu.vue`：侧边栏菜单列表。
- `AppMain.vue`：后台内容区容器。

### 4. `layouts`：布局层

`layouts` 目录负责页面整体框架。

当前文件：

```text
src/layouts/
  BasicLayout.vue
```

设计规则：

- `BasicLayout` 负责后台整体结构。
- 布局层可以组合顶部栏、侧边栏、内容区。
- 布局层不负责具体业务页面的表格、表单、弹窗。
- 子页面通过 `RouterView` 渲染到布局内容区。

当前 `BasicLayout` 主要负责：

- 获取菜单数据。
- 计算当前页面标题。
- 处理侧边栏菜单选择。
- 处理退出登录。
- 组合 `AppHeader`、`AppSidebar`、`AppMain`。

### 5. `router`：路由层

`router` 目录负责路由配置和路由守卫。

当前文件：

```text
src/router/
  index.ts
```

设计规则：

- 路由表集中维护。
- 登录页和后台页面分开配置。
- 后台页面通过 `BasicLayout` 承载。
- 路由权限信息放在 `meta` 中。
- 登录校验、页面跳转控制放在全局守卫中。

当前路由：

- `/login`：登录页。
- `/dashboard`：首页。
- `/customers`：客户管理。
- `/orders`：订单管理。
- `/users`：用户管理。
- `/system`：系统管理。
- `/:pathMatch(.*)*`：404 页面。

### 6. `stores`：状态层

`stores` 目录负责 Pinia 全局状态。

当前文件：

```text
src/stores/
  auth.ts
```

设计规则：

- 跨页面共享状态放 store。
- 页面局部状态不要放 store。
- store 负责状态和业务动作，不负责页面展示。
- token、用户信息、角色、权限等全局登录状态放 `auth` store。

当前 `auth.ts` 职责：

- 保存 token。
- 保存用户信息。
- 保存角色列表。
- 保存权限列表。
- 提供 `login()` 和 `logout()`。
- 从 `localStorage` 恢复登录状态。

### 7. `types`：类型层

`types` 目录负责 TypeScript 类型定义。

当前文件：

```text
src/types/
  approval.ts
  common.ts
  customer.ts
  menu.ts
  order.ts
  user.ts
```

设计规则：

- 通用类型放 `common.ts`。
- 业务类型按模块拆分。
- 接口入参、接口返回、表格行数据、状态联合类型都可以放这里。
- 类型文件只描述数据结构，不写运行时业务逻辑。

示例：

- `common.ts`：`ApiResponse<T>`、`PageParams`、`PageResult<T>`。
- `user.ts`：`UserInfo`、`UserRole`、`UserStatus`。
- `order.ts`：订单信息、订单状态、订单查询条件。
- `menu.ts`：菜单项、菜单类型。

### 8. `constants`：常量层

`constants` 目录负责固定值和映射关系。

当前文件：

```text
src/constants/
  status.ts
```

设计规则：

- 状态文案映射放这里。
- 状态颜色映射放这里。
- 下拉选项、枚举值、固定业务配置可以放这里。
- 常量可以依赖 `types` 中的联合类型，让映射保持完整。

当前 `status.ts` 包含：

- 订单状态文案和颜色。
- 用户状态文案和颜色。
- 审批状态文案和颜色。
- `StatusColor` 状态颜色类型。

`constants` 和 `types` 的区别：

```text
types：描述数据长什么样。
constants：描述固定值有哪些，以及这些固定值如何展示。
```

### 9. `composables`：组合式逻辑层

`composables` 目录负责可复用状态逻辑。

当前文件：

```text
src/composables/
  useLoading.ts
  useModal.ts
  usePagination.ts
```

设计规则：

- 文件名和函数名使用 `useXxx`。
- 只封装状态逻辑，不渲染 UI。
- 返回值要清晰，避免一个 composable 做太多事。
- 多个页面都需要的状态逻辑，可以抽到这里。

当前职责：

- `useLoading`：管理请求 loading 状态。
- `useModal`：管理新增/编辑弹窗状态。
- `usePagination`：管理分页页码、每页数量、总数、总页数。

### 10. `directives`：指令层

`directives` 目录负责 Vue 自定义指令。

当前文件：

```text
src/directives/
  index.ts
  permission.ts
```

设计规则：

- 每个复杂指令独立一个文件。
- `index.ts` 负责统一注册。
- 指令适合处理 DOM 行为或简单展示控制。
- 指令不应该替代真实接口权限校验。

当前职责：

- `permission.ts`：实现 `v-permission` 按钮权限控制。
- `index.ts`：通过 `setupDirectives(app)` 统一注册项目指令。

### 11. `utils`：工具函数层

`utils` 目录用于放通用工具函数。

当前为空，后续可放：

- 日期格式化。
- 金额格式化。
- 字符串处理。
- 数据脱敏。
- 简单校验函数。

设计规则：

- 工具函数尽量是纯函数。
- 不依赖组件实例。
- 不直接读取 store。
- 不直接调用接口。

### 12. `styles`：样式层

`styles` 目录用于放全局样式能力。

当前为空，后续可放：

```text
src/styles/
  reset.css
  variables.css
  layout.css
  theme.css
```

当前项目仍有：

```text
src/style.css
```

V1 阶段可以保留。后续当样式增长时，再逐步拆到 `styles` 目录。

## 五、路径别名设计

项目使用 `@` 指向 `src`。

Vite 配置：

```ts
resolve: {
  alias: {
    "@": fileURLToPath(new URL("./src", import.meta.url)),
  },
},
```

TypeScript 配置：

```json
"paths": {
  "@/*": ["./src/*"]
}
```

使用示例：

```ts
import { request } from "@/api/request";
import { useAuthStore } from "@/stores/auth";
import type { UserInfo } from "@/types/user";
import PageContainer from "@/components/PageContainer.vue";
```

规则：

- 跨目录导入优先使用 `@`。
- 同目录或近距离相邻文件可以使用相对路径。
- 不写过深的 `../../../`。

## 六、文件命名规则

### 1. Vue 组件

组件使用 PascalCase：

```text
PageContainer.vue
StatusTag.vue
BasicLayout.vue
UsersView.vue
```

页面组件建议以 `View` 结尾：

```text
LoginView.vue
OrdersView.vue
```

### 2. TypeScript 文件

普通模块使用小驼峰或业务名：

```text
request.ts
auth.ts
status.ts
```

组合式函数使用 `useXxx.ts`：

```text
usePagination.ts
useModal.ts
useLoading.ts
```

### 3. 类型命名

类型使用 PascalCase：

```ts
UserInfo
LoginParams
PageResult<T>
MenuItem
OrderStatus
```

## 七、新增文件放置规则

新增功能时按下面规则判断：

| 新增内容 | 放置位置 |
| --- | --- |
| 新页面 | `src/views` |
| 页面级路由 | `src/router/index.ts` |
| 通用 UI 组件 | `src/components` |
| 业务接口 | `src/api/modules` |
| 请求通用逻辑 | `src/api/request.ts` |
| 业务类型 | `src/types` |
| 状态文案、颜色、选项 | `src/constants` |
| 跨页面状态 | `src/stores` |
| 可复用状态逻辑 | `src/composables` |
| 自定义指令 | `src/directives` |
| 通用纯函数 | `src/utils` |
| 全局样式 | `src/styles` |
| 图片字体等资源 | `src/assets` |

## 八、边界规则

### 页面和组件的边界

页面负责业务编排：

```text
请求数据 -> 管理页面状态 -> 组合组件 -> 响应用户操作
```

组件负责可复用展示：

```text
接收 props -> 展示 UI -> emit 事件
```

如果一个组件只在某个页面使用，但它能明显减少页面复杂度，也可以先放在 `components`。后续如果页面专属组件增多，可以演进为页面内局部组件目录。

### 类型和常量的边界

类型文件只描述结构：

```ts
export type UserStatus = "enabled" | "disabled";
```

常量文件描述运行时映射：

```ts
export const userStatusText: Record<UserStatus, string> = {
  enabled: "启用",
  disabled: "禁用",
};
```

### store 和 composable 的边界

store 用于跨页面共享：

```text
token、用户信息、角色、权限
```

composable 用于复用局部状态逻辑：

```text
loading、分页、弹窗打开关闭
```

如果状态刷新页面后要保留，或者多个页面都依赖同一份状态，优先考虑 store。
如果只是多个页面都需要同一套状态控制方法，优先考虑 composable。

## 九、当前目录验收标准

V1 阶段目录设计满足以下标准：

- 项目能正常启动。
- 项目能正常构建。
- `@` 路径别名可在页面、组件、接口、类型中使用。
- 页面级组件集中在 `views`。
- 通用组件集中在 `components`。
- 接口模块集中在 `api/modules`。
- 全局状态集中在 `stores`。
- 业务类型集中在 `types`。
- 状态文案和颜色映射集中在 `constants`。
- 自定义指令集中在 `directives`。
- 可复用状态逻辑集中在 `composables`。

## 十、后续演进方向

随着项目继续扩大，V2 可以考虑：

- 将路由按模块拆分，例如 `router/modules/user.ts`。
- 将大型页面拆出页面专属组件目录，例如 `views/users/components/`。
- 将样式从 `src/style.css` 拆到 `src/styles/`。
- 将 mock 数据从接口文件中拆到 `mock/` 或 `api/mock/`。
- 将权限常量独立为 `constants/permission.ts`。
- 将环境变量读取统一封装到 `config/env.ts`。
- 将请求层从 mock 请求升级为真实 Axios 实例和拦截器。

V1 阶段先保持结构清晰、职责明确，不提前做过度拆分。


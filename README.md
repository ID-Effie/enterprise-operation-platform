# Enterprise Operation Platform

一个基于 Vue 3、TypeScript、Vite 的中后台练习项目，用于逐步搭建企业运营平台的前端基础能力。

## 技术栈

- Vue 3
- TypeScript
- Vite
- pnpm
- Vue Router
- Pinia

## 当前进度

- Day 1：完成项目初始化
  - 已清理默认页面
  - 已建立基础目录结构
- Day 2：接入 Vue Router
  - 已新增登录页、运营概览页、404 页面
  - 已建立基础路由表，支持页面切换
- Day 3：接入后台基础布局
  - 已新增 `BasicLayout`
  - 已完成顶部栏、侧边栏、内容区
  - 已接入静态侧边栏菜单
  - 已新增客户管理、订单管理、系统管理占位页
  - 点击菜单可以切换路由
- Day 4：完善业务页面占位与页面容器组件
  - 已将客户管理升级为客户列表页面
  - 已将订单管理升级为订单列表页面
  - 已新增用户管理页面
  - 已保留系统管理页面
  - 客户、订单、用户页面已具备标题、查询区、操作按钮区、表格占位区
  - 已抽取 `PageContainer`，用于复用业务页面标题、描述和外层容器结构
- Day 5：建立请求层雏形并接入 mock 登录
  - 已新增 `src/api/request.ts`，封装统一 mock 请求入口
  - 已新增 `src/api/modules/auth.ts`，提供登录、退出登录接口
  - 已新增 `src/api/modules/user.ts`，提供用户信息、用户列表接口
  - 已设计统一响应结构 `ApiResponse<T>`，包含 `code`、`message`、`data`
  - 已补充登录相关基础类型 `LoginParams`、`LoginResult`
  - 登录页已接入 mock 登录流程，支持输入账号密码、登录中状态、失败提示、成功跳转首页
- Day 6：补齐最小可演示流程
  - 已新增全局路由守卫，未登录访问后台页面会跳转 `/login`
  - 登录成功后保存 mock token 到 `localStorage`
  - 已登录状态访问 `/login` 会自动回到首页
  - `/dashboard`、`/customers`、`/orders`、`/users`、`/system` 已接入登录校验
  - 顶部栏已新增退出登录按钮，退出后清理 token 并跳转登录页
  - 主项目已具备“登录 -> 首页 -> 侧边栏切换业务页面 -> 404”的基础演示路径
- Day 8：TypeScript 类型接入：
  - 已新增 `src/types/common.ts`，沉淀 `ID`、`ApiResponse<T>`、`PageParams`、`PageResult<T>`
  - 已新增 `src/types/user.ts`，沉淀 `UserInfo`、`UserRole`、`UserStatus`、`LoginParams`、`LoginResult`
  - 已新增 `src/types/menu.ts`，沉淀 `MenuItem`、`MenuType`
  - 登录接口、用户信息接口、用户列表接口、菜单接口已接入业务类型
  - `BasicLayout` 已通过 `getUserMenus()` 获取菜单，并使用 `MenuItem[]` 管理侧边栏菜单
  - `UsersView` 已通过 `getUserList()` 获取用户列表，并使用 `UserInfo[]` 渲染用户表格
  - 用户列表已补齐加载中、错误重试、空数据和正常数据边界状态
  - Vite 已配置 `@` 指向 `src`，支持 `@/api/...`、`@/types/...` 路径别名
- Day 9：完善列表分页类型和 mock 接口
  - 已新增 `ListQuery`，统一列表查询参数
  - 已新增客户、订单类型文件
  - 用户、客户、订单列表接口已统一返回 `PageResult<T>`
  - 用户列表页面已从 `res.data.list` 获取分页列表数据
- Day 10：状态类型建模与订单列表接入
  - 已新增 `src/constants/status.ts`，统一管理订单状态、用户状态的文案和颜色映射
  - 已新增 `src/types/approval.ts`，沉淀审批状态与审批信息类型
  - 订单列表 mock 数据已覆盖待处理、处理中、已完成、已取消状态
  - 订单列表页面已接入 `getOrderList()`，支持订单编号和订单状态筛选
  - 订单列表页面已补齐加载中、错误重试、空数据和正常数据状态
  - 订单状态标签已通过 `Record<OrderStatus, string>` 映射中文文案和颜色语义
  - 用户状态文案已改为从统一状态映射中读取，减少页面内散乱判断
- Day 11：Axios 响应类型与请求层建模
  - 已优化 `src/api/request.ts`，使用 `AxiosRequestConfig` 扩展项目请求配置 `RequestConfig`
  - 已补充 `ApiError`，用于描述统一请求层中的错误对象
  - 已建立 `MockRequestConfig<T>`，让 `mockData`、`success`、`message`、`delay` 拥有明确类型
  - `request<T>()` 统一返回 `Promise<ApiResponse<T>>`
  - `auth.ts` 登录接口已区分 `LoginParams` 请求体和 `LoginResult` mock 响应结果
  - `user.ts` 已补齐用户列表、删除用户、修改用户状态的接口类型
  - `customer.ts` 客户列表接口已使用 `params` 表达查询参数，并返回 `PageResult<CustomerInfo>`
  - 列表查询统一使用 `params`，登录和状态修改使用 `data` 表达请求体
- Day 12：Vue 组件中的 TypeScript
  - `PageContainer` 已使用 `PageContainerProps` 管理 `title`、`description` props 类型
  - 已从 `BasicLayout` 中拆出 `AppSideMenu`，使用 `MenuItem[]` 管理菜单 props
  - `AppSideMenu` 已使用 `defineEmits` 定义 `select` 事件，事件参数类型复用 `MenuItem["path"]`
  - 已从 `BasicLayout` 中拆出顶部栏组件 `AppToBar`，使用 props 管理标题和用户名
  - `AppToBar` 已使用 `defineEmits` 定义无参数 `logout` 事件
  - 已抽取 `StatusTag` 状态标签组件，使用 `StatusColor` 收窄颜色类型
  - 用户列表和订单列表已通过 `StatusTag` 展示状态文案和状态颜色
  - 用户状态、订单状态已从页面数据流转到统一状态映射，再传入 `StatusTag`
  - 主项目已通过 `vue-tsc` 类型检查
- Day 13：Pinia、表单与表格类型实践
  - 已安装 Pinia，并在 `main.ts` 中通过 `createPinia()` 注册全局 store
  - 已新增 `src/stores/auth.ts`，集中管理登录状态和登录逻辑
  - `AuthState` 已包含 `token`、`userInfo`、`roles`、`permissions`
  - `auth store` 已提供 `isLogin`、`username` getters
  - `auth store` 已提供 `login()`、`logout()` actions，并明确参数和返回值类型
  - 登录页已改为调用 `authStore.login()`，不再直接在页面里调用登录接口和写入 token
  - 用户列表已抽出 `UserQueryForm`，页面查询表单会转换成 `UserListQuery` 后再请求接口
  - 客户列表已接入 `getCustomerList()`，使用 `CustomerInfo[]` 管理表格数据
  - 客户列表已抽出 `CustomerQueryForm`，页面查询表单会转换成 `CustomerListQuery` 后再请求接口
  - 客户列表已补齐加载中、错误重试、空数据和正常数据状态
  - 主项目已进一步区分 store 状态、表单 model、表格 row 和接口 params 的类型边界
- Day 15：统一基础页面为 `script setup + TS`
  - 已检查登录页、布局页、客户页、订单页、用户页、系统页均使用 `<script setup lang="ts">`
  - 已将系统管理页统一为 `PageContainer` 页面结构
  - 系统管理页已新增 `SystemConfigType`、`SystemConfigQueryForm`、`SystemConfigInfo` 类型
  - 系统管理页使用 `reactive<SystemConfigQueryForm>` 管理查询表单
  - 系统管理页使用 `ref<SystemConfigInfo[]>` 管理配置列表
  - 系统管理页已支持按配置名称和配置类型筛选 mock 数据
  - 系统管理页已支持重置查询条件并恢复配置列表
  - 主项目基础业务页进一步统一为“页面容器 + 查询区 + 操作区 + 表格区”的结构
- Day 16：客户/订单查询状态与响应式副作用
  - 客户列表页面已使用 `reactive<CustomerQueryForm>` 管理客户名称和客户等级查询条件
  - 客户列表页面已使用 `computed` 生成 `querySummary`，用于展示当前筛选摘要
  - 客户列表页面已使用 `watch` 监听 `query.keyword`、`query.level`，并在查询条件变化时重新请求客户列表
  - 订单列表页面已使用 `reactive` 管理订单编号和订单状态查询条件
  - 订单列表页面已使用 `computed` 生成订单筛选摘要
  - 订单列表页面已使用 `watch` 监听 `query.orderNo`、`query.status`，并在查询条件变化时重新请求订单列表
  - 客户/订单页面的初始化请求已统一交给 `watch(..., { immediate: true })` 触发
  - 查询条件变化、筛选摘要更新、列表请求刷新之间的数据流已和 `computed` / `watch` 职责对应起来
- Day 17：Vue 生命周期与组件通信
  - 已将布局组件拆分为 `AppSidebar`、`AppHeader`、`AppMain`
  - `BasicLayout` 只保留请求菜单数据、计算当前标题、处理退出登录、处理菜单选择事件和组合布局组件的职责
  - `AppSidebar` 接收 `menus`、`activePath` props，负责侧边栏品牌区和菜单区展示
  - `AppSidebar` 通过 `select(path)` 事件向上转发菜单选择结果
  - `AppSideMenu` 继续只负责菜单列表渲染，并通过 `emit("select", item.path)` 通知点击菜单
  - `AppHeader` 接收 `title`、`username` props，并通过无参数 `logout` 事件通知父组件退出
  - `AppMain` 通过默认插槽承载 `RouterView`，只负责页面内容容器
  - 已检查布局组件 `props / emits` 能独立说明数据流：数据由 `BasicLayout` 向下传递，菜单选择和退出登录事件由子组件向上传递
	- Day 18：插槽与业务组件封装
	  - `PageContainer` 已从单纯的 `title`、`description` props 展示，增强为支持标题区、操作区和默认内容区的业务页面容器
  - `PageContainer` 已新增 `title` 具名插槽，支持父组件自定义标题区；未传插槽时继续使用 `title`、`description` 作为默认内容
  - `PageContainer` 已新增 `actions` 具名插槽，用于承载页面级操作按钮
  - 默认插槽继续承载页面主体内容，例如查询区、筛选摘要、表格区、加载中、错误重试和空数据状态
  - 客户页面已通过 `actions` 插槽放置“新增客户”“导出列表”按钮
  - 订单页面已通过 `actions` 插槽放置“创建订单”“批量处理”按钮
	  - 用户页面已通过 `actions` 插槽放置“新增用户”“分配角色”按钮
	  - 已通过客户、订单、用户三个页面验证 `PageContainer` 当前插槽设计足够覆盖常见后台列表页
	  - 已记录插槽暴露过多会导致组件职责模糊、使用成本变高、父组件依赖内部结构、页面风格不统一等维护问题
	- Day 19：组合式函数 composable 接入
	  - 已新增 `src/composables/usePagination.ts`，统一管理列表分页状态和分页方法
	  - 已新增 `src/composables/useModal.ts`，统一管理新增/编辑弹窗的打开、关闭、模式和当前数据
	  - 已新增 `src/composables/useLoading.ts`，统一管理请求 loading 状态
	  - 客户列表已接入 `usePagination` 和 `useLoading`，请求参数使用 `currentPage.value`、`pageSize.value`
	  - 用户管理已接入 `usePagination`、`useModal`、`useLoading`，新增和编辑按钮可打开对应弹窗
	  - 订单列表已接入 `usePagination`、`useModal`、`useLoading`，创建和编辑按钮可打开对应弹窗
	  - 列表请求成功后统一通过 `setTotal(res.data.total)` 更新分页总数
	  - 查询重置时会调用 `reset()` 恢复分页状态
	  - 已通过客户、用户、订单列表验证 composable 返回值稳定性
	  - 主项目已通过 `pnpm build`
	- Day 20：自定义指令与按钮权限接入
	  - 已新增 `src/directives/permission.ts`，实现全局权限指令 `v-permission`
	  - 已新增 `src/directives/index.ts`，统一注册项目自定义指令
	  - `main.ts` 已在 Pinia 和 Router 注册后调用 `setupDirectives(app)`
	  - `auth store` 已在登录成功后模拟当前用户权限列表 `permissions`
	  - 用户管理页已在“新增用户”“分配角色”“编辑”按钮上应用 `v-permission`
	  - 系统管理页已在“新增配置”和表格“编辑”按钮上应用 `v-permission`
	  - 权限指令支持单个权限字符串和权限数组，内部统一转换为 `string[]` 后使用 `some` 判断
	  - 无权限按钮通过 `display: none` 隐藏，有权限按钮保持原有样式展示
	  - 已验证 `role:create` 无权限时“新增配置”隐藏，未加权限控制的“刷新缓存”仍正常展示
	  - 已记录前端按钮权限只控制展示，不能替代后端接口鉴权
- Day 22：项目骨架、Vite 配置与路径别名复盘
  - 已复盘中后台项目按职责拆目录的原因和目录边界
  - 已确认主项目具备 `api`、`assets`、`components`、`composables`、`constants`、`directives`、`layouts`、`router`、`stores`、`styles`、`types`、`utils`、`views` 基础目录
  - 已确认 `vite.config.ts` 中通过 `resolve.alias` 配置 `@` 指向 `src`
  - 已确认 `tsconfig.app.json` 中通过 `paths` 配置 `@/*` 指向 `./src/*`
  - 已明确 TypeScript 6 下不再依赖 `baseUrl`，路径映射目标使用 `./src/*`
  - 已梳理 `constants`、`types`、`utils` 的职责区别
  - 已输出项目目录设计文档：`docs/project-directory-design-v1.md`
  - 已沉淀 Day 22 学习笔记：`notes/day22-vite-project-structure-env-alias-notes.md`

## 目录结构

- src/views：页面组件
- src/components：通用组件
  - `PageContainer.vue`：业务页面容器
  - `AppSideMenu.vue`：侧边栏菜单组件
  - `AppToBar.vue`：顶部栏组件
  - `StatusTag.vue`：状态标签组件
- src/layouts：布局组件
- src/router：路由配置
- src/stores：状态管理
  - `auth.ts`：登录状态 store，集中管理 token、用户信息、角色、权限和登录退出动作
- src/composables：组合式函数
  - `usePagination.ts`：列表分页状态、总数、总页数和分页方法
  - `useModal.ts`：新增/编辑弹窗状态、模式和当前行数据
  - `useLoading.ts`：请求 loading 状态和切换方法
- src/directives：自定义指令
  - `permission.ts`：按钮权限指令 `v-permission`
  - `index.ts`：统一注册项目自定义指令
- src/api：接口请求
  - `request.ts`：统一请求入口和响应结构
  - `modules/auth.ts`：认证相关接口
  - `modules/user.ts`：用户相关接口
  - `modules/menu.ts`：菜单相关接口
  - `modules/customer.ts`：客户列表接口
  - `modules/order.ts`：订单列表接口
- src/constants：业务常量和映射
  - `status.ts`：订单状态、用户状态的文案和颜色映射
- src/utils：工具函数
- src/types：类型定义
  - `common.ts`：通用类型、统一响应结构、分页类型
  - `user.ts`：用户、角色、登录相关类型
  - `menu.ts`：菜单、权限菜单相关类型
  - `customer.ts`：客户列表相关类型
  - `order.ts`：订单列表相关类型
  - `approval.ts`：审批状态和审批信息相关类型
- src/styles：全局样式

## 工程配置

- `vite.config.ts`
  - 使用 `@vitejs/plugin-vue` 接入 Vue。
  - 通过 `resolve.alias` 将 `@` 指向 `src`。
  - 开发服务器固定使用 `5173` 端口，并自动打开浏览器。
- `tsconfig.app.json`
  - 开启 `strict`。
  - 通过 `paths` 配置 `@/*` 到 `./src/*`。
  - 使用 `types: ["vite/client"]` 让 TypeScript 识别 Vite 的 `import.meta.env` 类型。

当前路径别名写法：

```json
"paths": {
  "@/*": ["./src/*"]
}
```

注意：TypeScript 6 下 `baseUrl` 已弃用，当前项目不再依赖 `baseUrl` 配置。

## 当前路由

- `/`：重定向到 `/dashboard`
- `/login`：登录页
- `/dashboard`：首页 / 运营概览页
- `/customers`：客户管理页
- `/orders`：订单管理页
- `/users`：用户管理页
- `/system`：系统管理页
- `/:pathMatch(.*)*`：404 页面

其中 `/dashboard`、`/customers`、`/orders`、`/users`、`/system` 会进入 `BasicLayout`，在布局的内容区中展示对应页面。

## 当前已完成模块

- 项目基础工程：
  - Vite 项目初始化
  - TypeScript 配置
  - pnpm 依赖管理
- 页面基础结构：
  - `LoginView`
  - `DashboardView`
  - `CustomersView`
    - 客户查询状态使用 `CustomerQueryForm`
    - 客户查询摘要使用 `computed querySummary`
    - 客户查询条件变化后通过 `watch` 触发列表请求
    - 客户列表分页状态使用 `usePagination`
    - 客户列表加载状态使用 `useLoading`
  - `OrdersView`
    - 订单查询状态包含订单编号和订单状态
    - 订单查询摘要使用 `computed querySummary`
    - 订单查询条件变化后通过 `watch` 触发列表请求
    - 订单列表分页状态使用 `usePagination`
    - 订单列表加载状态使用 `useLoading`
    - 订单创建/编辑弹窗状态使用 `useModal`
  - `UsersView`
    - 用户列表分页状态使用 `usePagination`
    - 用户列表加载状态使用 `useLoading`
    - 用户新增/编辑弹窗状态使用 `useModal`
    - 新增用户、分配角色、编辑按钮接入 `v-permission`
  - `SystemView`
  - 系统管理页已统一使用 `PageContainer`，并接入 typed 查询状态和 mock 配置列表
  - 系统管理页新增配置、表格编辑按钮接入 `v-permission`
  - `NotFoundView`
- 通用组件：
  - `PageContainer`
  - 统一业务页面外层容器
  - 通过 `title` 插槽支持自定义标题区，并保留 `title`、`description` 默认内容
  - 通过 `actions` 插槽承载客户、订单、用户等页面的顶部操作按钮
  - 通过默认插槽承载页面自己的查询区、筛选摘要、表格区和状态提示
  - `AppSideMenu`
  - 使用 `MenuItem[]` 接收菜单数据
  - 使用 `select` 事件向布局层回传菜单路径
  - `AppToBar`
  - 使用 `title`、`username` 管理顶部栏展示内容
  - 使用 `logout` 事件通知布局层执行退出登录
  - `StatusTag`
  - 使用 `text` 展示状态文案
  - 使用 `StatusColor` 限制状态颜色范围
- 后台基础布局：
  - `BasicLayout`
  - 顶部栏
  - 侧边栏
  - 内容区
  - 通过菜单接口获取侧边栏菜单
- 路由基础能力：
  - Vue Router 安装
  - 路由表配置
  - `RouterView` 页面出口
  - `RouterLink` 页面跳转
  - 布局路由和页面路由的基础关系
- 请求层基础能力：
  - 统一响应结构 `ApiResponse<T>`
  - 统一错误结构 `ApiError`
  - 项目请求配置 `RequestConfig`
  - mock 请求配置 `MockRequestConfig<T>`
  - mock 请求函数 `request<T>()`
  - 认证接口模块 `auth`
  - 用户接口模块 `user`
  - 菜单接口模块 `menu`
  - 登录参数类型 `LoginParams`
  - 登录结果类型 `LoginResult`
  - 用户信息类型 `UserInfo`
  - 用户列表查询类型 `UserListQuery`
  - 删除用户参数类型 `DeleteUserParams`
  - 修改用户状态参数和结果类型 `UpdateUserStatusParams`、`UpdateUserStatusResult`
  - 客户信息和客户列表查询类型 `CustomerInfo`、`CustomerListQuery`
  - 菜单项类型 `MenuItem`
- 状态管理：
  - Pinia 已接入主应用
  - 登录状态 store `useAuthStore`
  - 登录状态类型 `AuthState`
  - 登录派生状态 `isLogin`、`username`
  - 登录动作 `login(params: LoginParams): Promise<void>`
  - 退出动作 `logout(): Promise<void>`
- 组合式函数：
  - `usePagination`
  - 返回 `currentPage`、`pageSize`、`total`、`totalPages`
  - 返回 `setPage`、`setPageSize`、`setTotal`、`reset`
  - `useModal`
  - 返回 `visible`、`mode`、`current`
  - 返回 `openCreate`、`openEdit`、`close`
  - `useLoading`
  - 返回 `loading`、`start`、`stop`、`toggle`
- 自定义指令：
  - `v-permission`
  - 从 `authStore.permissions` 读取当前用户权限列表
  - 支持 `v-permission="'user:create'"` 单权限写法
  - 支持 `v-permission="['user:create', 'admin']"` 多权限写法
  - 使用 `display: none` 控制无权限按钮展示
- 登录流程：
  - 登录页表单输入
  - 点击登录后调用 `authStore.login()`
  - 登录中禁用按钮
  - 登录失败展示错误信息
  - 登录成功保存 mock token
  - 登录成功跳转 `/dashboard`
  - 未登录访问后台页面时跳转 `/login`
  - 已登录访问 `/login` 时跳转 `/dashboard`
  - 点击退出登录后清理 token 并返回登录页
- 基础样式：
  - 页面容器
  - 登录面板
  - 登录错误提示
  - 指标卡片
  - 后台左右布局
  - 侧边栏菜单
  - 顶部栏
  - 顶部栏退出登录按钮
  - 内容区
  - 查询区占位
  - 操作按钮区
  - 表格区
  - 用户表格行
  - 用户状态标签
  - 表格内操作按钮
  - 移动端适配

## 后续模块计划

- 路由与菜单继续整理：
  - `RouteMeta`
  - 菜单权限和路由权限联动
- 业务页面细化：
  - 订单详情和订单处理动作
  - 系统设置真实接口数据和编辑动作
- 工程能力：
  - 路由拆分
  - 类型定义整理
  - 继续沉淀通用组件
  - 将 mock 请求替换为真实接口请求
- 状态管理：
  - 菜单权限

## 启动方式

```bash
pnpm install
pnpm dev
```

启动后访问 Vite 输出的本地地址，例如：

```text
http://localhost:5173/
```

## 演示流程

1. 打开本地地址后访问 `/dashboard`。
2. 如果浏览器里没有 token，会自动跳转到 `/login`。
3. 在登录页输入：

```text
账号：admin
密码：123456
```

4. 点击登录，登录成功后进入首页 `/dashboard`。
5. 点击侧边栏菜单，依次验证客户管理、订单管理、用户管理、系统管理页面可以正常切换。
6. 在客户列表验证加载态、分页展示和查询重置。
7. 在用户管理点击“新增用户”和“编辑”，确认弹窗可以打开和关闭。
8. 在订单列表点击“创建订单”和“编辑”，确认弹窗可以打开并展示当前订单。
9. 在用户管理确认“分配角色”按钮因缺少 `user:assign-role` 权限而隐藏。
10. 在系统管理确认“新增配置”因缺少 `role:create` 权限而隐藏，“刷新缓存”仍正常显示。
11. 访问一个不存在的路径，例如 `/not-exist`，确认进入 404 页面。
12. 点击顶部栏的退出按钮，确认清理登录状态并返回 `/login`。

## 构建检查

```bash
pnpm build
```

单独执行 Vue 类型检查：

```bash
pnpm exec vue-tsc -p tsconfig.app.json --noEmit
```

## 当前验证重点

- 首页能正常打开
- 点击侧边栏菜单能切换到客户管理、订单管理、用户管理、系统管理
- 当前菜单有高亮状态
- 客户、订单页面能展示统一的页面容器、查询区、操作按钮和表格占位区
- 用户页面能通过 mock 用户接口展示用户名称、角色、账号状态和操作按钮
- 用户列表查询表单使用 `UserQueryForm`，接口请求参数使用 `UserListQuery`
- 用户页面能展示加载中、错误重试和空数据状态
- 客户页面能通过 mock 客户接口展示客户名称、客户等级、联系人和行业
- 客户列表查询表单使用 `CustomerQueryForm`，接口请求参数使用 `CustomerListQuery`
- 客户页面能通过 `computed querySummary` 展示当前筛选摘要
- 客户页面能通过 `watch` 监听客户名称和客户等级变化，并自动刷新列表
- 客户页面能展示加载中、错误重试和空数据状态
- 订单页面能通过 mock 订单接口展示订单编号、客户名称、订单状态和操作按钮
- 订单页面能按订单编号、订单状态筛选数据
- 订单页面能通过 `computed querySummary` 展示当前筛选摘要
- 订单页面能通过 `watch` 监听订单编号和订单状态变化，并自动刷新列表
- 订单页面能展示加载中、错误重试和空数据状态
- 系统管理页使用 `PageContainer`，页面结构和客户、订单、用户页面保持一致
- 系统管理页查询表单使用 `SystemConfigQueryForm`
- 系统管理页列表数据使用 `SystemConfigInfo[]`
- 系统管理页能按配置名称和配置类型筛选配置列表
- 系统管理页点击重置后能恢复全部 mock 配置数据
- 订单状态和用户状态能通过统一状态映射展示中文文案和颜色标签
- `PageContainer`、`AppSideMenu`、`AppToBar`、`StatusTag` 的 props/emits 均有明确类型
- `StatusTag` 的颜色类型使用 `StatusColor`，避免写成过宽的 `string`
- 用户页和订单页能通过 `StatusTag` 复用状态标签展示
- Pinia 已通过 `createPinia()` 接入主应用
- `auth store` 的 `state`、`getters`、`actions` 均有明确类型
- `auth store` 能统一管理 `token`、`userInfo`、`roles`、`permissions`
- 登录页通过 `authStore.login()` 更新登录状态
- `vue-tsc` 类型检查通过
- `request<T>()` 返回 `Promise<ApiResponse<T>>`
- `auth.ts`、`user.ts`、`customer.ts` mock 接口有明确的入参和出参类型
- 列表接口查询参数使用 `params`，登录和修改类接口请求体使用 `data`
- 客户/订单列表能区分查询状态、筛选摘要和请求副作用：`reactive` 管理条件，`computed` 生成摘要，`watch` 触发请求
- 客户、用户、订单列表的分页状态来自 `usePagination`
- 客户、用户、订单列表的请求 loading 状态来自 `useLoading`
- 用户、订单页面的新增/编辑弹窗状态来自 `useModal`
- 列表请求参数使用 `currentPage.value`、`pageSize.value`，不再在页面中固定写死 `page: 1`、`pageSize: 10`
- 列表请求成功后通过 `setTotal(res.data.total)` 更新总数和总页数
- 查询重置时通过 `reset()` 恢复分页状态
- `v-permission` 已通过 `setupDirectives(app)` 注册为全局指令
- `v-permission` 从 `authStore.permissions` 判断当前用户是否拥有按钮权限
- 用户管理页中 `user:create`、`user:update` 对应按钮显示，`user:assign-role` 对应按钮隐藏
- 系统管理页中 `role:create` 对应按钮隐藏，未加权限控制的“刷新缓存”按钮正常显示
- 权限指令只控制前端按钮展示，不能替代后端接口鉴权
- mock 返回结果通过 `mockData` 提供，和请求参数分开
- 侧边栏菜单来自 `getUserMenus()`，不是组件内静态数组
- 登录页不显示后台布局
- 登录页输入 `admin` / `123456` 后能跳转 `/dashboard`
- 登录页输入错误账号或密码时能展示错误提示
- 登录过程中按钮进入禁用状态
- 未登录访问 `/dashboard`、`/customers`、`/orders`、`/users`、`/system` 会跳转登录页
- 登录成功后浏览器 `localStorage` 中会写入 `token`
- 点击退出登录后会清理 `token` 并返回登录页
- 不存在的路径能进入 404 页面

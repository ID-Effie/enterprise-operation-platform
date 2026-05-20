# Enterprise Operation Platform

一个基于 Vue 3、TypeScript、Vite 的中后台练习项目，用于逐步搭建企业运营平台的前端基础能力。

## 技术栈

- Vue 3
- TypeScript
- Vite
- pnpm
- Vue Router

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

## 目录结构

- src/views：页面组件
- src/components：通用组件，例如 `PageContainer`
- src/layouts：布局组件
- src/router：路由配置
- src/stores：状态管理
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
  - `OrdersView`
  - `UsersView`
  - `SystemView`
  - `NotFoundView`
- 通用组件：
  - `PageContainer`
  - 统一业务页面外层容器
  - 统一页面标题和描述展示
  - 通过 `slot` 承载页面自己的查询区、操作区和表格区
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
  - mock 请求函数 `request<T>()`
  - 认证接口模块 `auth`
  - 用户接口模块 `user`
  - 菜单接口模块 `menu`
  - 登录参数类型 `LoginParams`
  - 登录结果类型 `LoginResult`
  - 用户信息类型 `UserInfo`
  - 菜单项类型 `MenuItem`
- 登录流程：
  - 登录页表单输入
  - 点击登录后调用 mock 登录接口
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
  - 客户列表表格数据
  - 订单详情和订单处理动作
  - 系统设置表格数据
- 工程能力：
  - 路由拆分
  - 类型定义整理
  - 继续沉淀通用组件
  - 将 mock 请求替换为真实接口请求
- 状态管理：
  - 登录状态
  - 用户信息
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
5. 点击侧边栏菜单，依次验证客户管理、订单管理、用户管理页面可以正常切换。
6. 访问一个不存在的路径，例如 `/not-exist`，确认进入 404 页面。
7. 点击顶部栏的退出按钮，确认清理登录状态并返回 `/login`。

## 构建检查

```bash
pnpm build
```

## 当前验证重点

- 首页能正常打开
- 点击侧边栏菜单能切换到客户管理、订单管理、用户管理、系统管理
- 当前菜单有高亮状态
- 客户、订单页面能展示统一的页面容器、查询区、操作按钮和表格占位区
- 用户页面能通过 mock 用户接口展示用户名称、角色、账号状态和操作按钮
- 用户页面能展示加载中、错误重试和空数据状态
- 订单页面能通过 mock 订单接口展示订单编号、客户名称、订单状态和操作按钮
- 订单页面能按订单编号、订单状态筛选数据
- 订单页面能展示加载中、错误重试和空数据状态
- 订单状态和用户状态能通过统一状态映射展示中文文案和颜色标签
- 侧边栏菜单来自 `getUserMenus()`，不是组件内静态数组
- 登录页不显示后台布局
- 登录页输入 `admin` / `123456` 后能跳转 `/dashboard`
- 登录页输入错误账号或密码时能展示错误提示
- 登录过程中按钮进入禁用状态
- 未登录访问 `/dashboard`、`/customers`、`/orders`、`/users`、`/system` 会跳转登录页
- 登录成功后浏览器 `localStorage` 中会写入 `token`
- 点击退出登录后会清理 `token` 并返回登录页
- 不存在的路径能进入 404 页面

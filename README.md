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

## 目录结构

- src/views：页面组件
- src/components：通用组件，例如 `PageContainer`
- src/layouts：布局组件
- src/router：路由配置
- src/stores：状态管理
- src/api：接口请求
- src/utils：工具函数
- src/types：类型定义
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
  - 静态菜单
- 路由基础能力：
  - Vue Router 安装
  - 路由表配置
  - `RouterView` 页面出口
  - `RouterLink` 页面跳转
  - 布局路由和页面路由的基础关系
- 基础样式：
  - 页面容器
  - 登录面板
  - 指标卡片
  - 后台左右布局
  - 侧边栏菜单
  - 顶部栏
  - 内容区
  - 查询区占位
  - 操作按钮区
  - 表格区占位
  - 移动端适配

## 后续模块计划

- 路由与菜单类型整理：
  - `MenuItem`
  - `RouteMeta`
- 业务页面细化：
  - 客户列表表格数据
  - 订单列表表格数据
  - 用户管理表格数据
  - 系统设置表格数据
- 工程能力：
  - 路由拆分
  - 类型定义整理
  - 继续沉淀通用组件
  - 接口请求封装
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

## 构建检查

```bash
pnpm build
```

## 当前验证重点

- 首页能正常打开
- 点击侧边栏菜单能切换到客户管理、订单管理、用户管理、系统管理
- 当前菜单有高亮状态
- 客户、订单、用户页面能展示统一的页面容器、查询区、操作按钮和表格占位区
- 登录页不显示后台布局
- 不存在的路径能进入 404 页面

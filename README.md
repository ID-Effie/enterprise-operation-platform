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
- 已新增基础路由页面：
  - 登录页
  - 运营概览页
  - 404 页面
- 已建立基础路由表，支持页面切换

## 目录结构

- src/views：页面组件
- src/components：通用组件
- src/router：路由配置
- src/stores：状态管理
- src/api：接口请求
- src/utils：工具函数
- src/types：类型定义
- src/styles：全局样式

## 当前路由

- `/`：重定向到 `/dashboard`
- `/login`：登录页
- `/dashboard`：运营概览页
- `/:pathMatch(.*)*`：404 页面

## 当前已完成模块

- 项目基础工程：
  - Vite 项目初始化
  - TypeScript 配置
  - pnpm 依赖管理
- 页面基础结构：
  - `LoginView`
  - `DashboardView`
  - `NotFoundView`
- 路由基础能力：
  - Vue Router 安装
  - 路由表配置
  - `RouterView` 页面出口
  - `RouterLink` 页面跳转
- 基础样式：
  - 页面容器
  - 登录面板
  - 指标卡片
  - 导航按钮

## 后续模块计划

- 基础布局：
  - 顶部栏
  - 侧边栏
  - 内容区
- 业务页面：
  - 客户管理
  - 订单管理
  - 系统管理
- 工程能力：
  - 路由拆分
  - 类型定义整理
  - 通用组件沉淀
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

## 构建检查

```bash
pnpm build
```

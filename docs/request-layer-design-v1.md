# 请求层设计文档 V1

## 一、文档目标

本文档用于说明 `enterprise-operation-platform` 当前阶段的请求层设计。

当前项目已经从早期的 `mockData` 分支请求函数，升级为真正的 Axios 请求链路：

```text
页面 / store
  -> api/modules/*
  -> request<T>()
  -> Axios 实例 service
  -> 请求拦截器
  -> Axios adapter / 真实后端
  -> 响应拦截器
  -> ApiResponse<T>
```

设计目标：

- 所有接口调用都经过统一 `request<T>()`。
- token 注入、业务错误、401、500、网络错误集中处理。
- 页面层不重复处理全局请求错误。
- 开发阶段 mock 响应也走 Axios adapter，确保能验证拦截器行为。
- 后续接真实后端时，尽量只替换 adapter/mock 部分，不破坏页面和 store 调用方式。

一句话原则：

```text
请求层统一通信规则，业务模块描述接口，页面只处理页面状态。
```

## 二、当前文件结构

请求层相关文件如下：

```text
src/
  api/
    request.ts
    mockAdapter.ts
    modules/
      auth.ts
      customer.ts
      menu.ts
      order.ts
      user.ts
  types/
    common.ts
```

职责说明：

| 文件                          | 职责                                                 |
| ----------------------------- | ---------------------------------------------------- |
| `src/api/request.ts`          | 创建 Axios 实例、注册拦截器、导出统一 `request<T>()` |
| `src/api/mockAdapter.ts`      | 开发阶段用 Axios adapter 模拟后端响应                |
| `src/api/modules/auth.ts`     | 登录、退出、请求层验证接口                           |
| `src/api/modules/user.ts`     | 用户信息、用户列表、删除用户、修改状态接口           |
| `src/api/modules/customer.ts` | 客户列表接口                                         |
| `src/api/modules/order.ts`    | 订单列表接口                                         |
| `src/api/modules/menu.ts`     | 菜单接口                                             |
| `src/types/common.ts`         | `ApiResponse<T>`、`ApiError`、分页等通用类型         |

## 三、统一响应结构

当前项目使用统一响应结构：

```ts
export interface ApiResponse<T> {
  code: number
  message: string
  data: T
}
```

含义：

| 字段      | 含义                         |
| --------- | ---------------------------- |
| `code`    | 业务状态码，`0` 表示业务成功 |
| `message` | 后端返回的提示信息           |
| `data`    | 当前接口真正的业务数据       |

例子：

```ts
ApiResponse<UserInfo>
ApiResponse<PageResult<UserInfo>>
ApiResponse<LoginResult>
ApiResponse<null>
```

这里的 `T` 表示不同接口自己的业务数据类型。

## 四、RequestConfig 设计

当前项目请求配置：

```ts
export interface RequestConfig extends AxiosRequestConfig {
  showLoading?: boolean
  showError?: boolean
}
```

说明：

- `RequestConfig` 继承 Axios 原生请求配置。
- `showLoading`、`showError` 是项目预留扩展字段。
- 当前阶段暂未真正接入全局 loading/message 系统，只保留配置入口。

重要约束：

```text
RequestConfig 不再包含 mockData、success、delay。
```

原因：

- `mockData` 不是 Axios 原生配置。
- 如果 `request()` 内部判断 `mockData` 并直接返回 Promise，会绕过 Axios 拦截器。
- 当前项目希望 mock 请求也经过请求拦截器和响应拦截器。

## 五、Axios 实例设计

当前 `src/api/request.ts` 创建项目专用 Axios 实例：

```ts
const service = axios.create({
  baseURL: '/api',
  timeout: 10000
})
```

设计理由：

- 统一 `baseURL`。
- 统一超时时间。
- 后续可以统一扩展 headers、withCredentials、responseType 等配置。
- 避免页面和业务模块直接使用原始 `axios`。

约束：

```text
业务代码不直接 import axios。
业务代码统一 import { request } from "@/api/request"。
```

## 六、请求拦截器设计

请求拦截器在请求发出前执行。

当前职责：

```ts
service.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')

  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }

  return config
})
```

处理流程：

```text
读取 localStorage.token
  -> token 存在
  -> 写入 Authorization 请求头
  -> 返回 config
  -> 请求继续发出
```

设计约束：

- token 注入集中在请求层。
- 页面、store、api modules 不手动拼 `Authorization`。
- 请求拦截器必须返回 `config`。

## 七、响应拦截器设计

响应拦截器分为两个分支：

```text
HTTP 成功响应分支
HTTP 失败响应分支
```

### 1. HTTP 成功响应分支

当前逻辑：

```ts
service.interceptors.response.use((response) => {
  const res = response.data as ApiResponse<unknown>

  if (res.code !== 0) {
    console.error(res.message || '业务错误')
    return Promise.reject(res)
  }

  return response
})
```

处理的是业务错误。

业务错误通常是：

```text
HTTP status = 200
业务 code != 0
```

例子：

```json
{
  "code": 10001,
  "message": "账号或密码错误",
  "data": null
}
```

这种情况 HTTP 请求是成功的，但业务结果失败，所以由响应拦截器统一 `reject`。

### 2. HTTP 失败响应分支

当前逻辑：

```ts
const status = error.response?.status

if (status === 401) {
  localStorage.removeItem('token')
  window.location.href = `/login?redirect=${encodeURIComponent(window.location.pathname)}`
} else if (status === 500) {
  console.error('服务器错误')
} else {
  console.error('网络错误或请求失败')
}
```

处理策略：

| 状态          | 含义               | 当前处理                 |
| ------------- | ------------------ | ------------------------ |
| `401`         | 未登录或登录过期   | 清理 token，并跳转登录页 |
| `500`         | 服务器错误         | 打印服务器错误           |
| 无响应 / 其他 | 网络错误或请求失败 | 打印网络错误             |

后续可以扩展：

- `403` 跳转无权限页或展示无权限提示。
- 超时错误单独提示。
- 接入全局消息组件。
- 接入错误监控。

## 八、request<T>() 设计

统一请求函数：

```ts
export function request<T>(config: RequestConfig): Promise<ApiResponse<T>> {
  return service.request<ApiResponse<T>>(config).then((response) => response.data)
}
```

设计重点：

- 调用方通过泛型 `T` 指定 `data` 的业务类型。
- `request<T>()` 统一返回 `Promise<ApiResponse<T>>`。
- 响应拦截器返回完整 `AxiosResponse`，避免 TypeScript 类型不匹配。
- `request<T>()` 负责最终取 `response.data`。

为什么不在响应拦截器里直接 `return response.data`？

```text
Axios 响应拦截器默认类型要求返回 AxiosResponse。
直接返回 ApiResponse 会导致 TypeScript 报错。
```

当前做法是：

```text
响应拦截器负责拦截和判断。
request<T>() 负责拆出 response.data。
```

## 九、Axios adapter mock 设计

开发阶段使用：

```text
src/api/mockAdapter.ts
```

核心能力：

```ts
export function createMockAdapter<TData>(status: number, data: TData, delay = 300): AxiosAdapter
```

使用方式：

```ts
return request<LoginResult>({
  url: '/auth/login',
  method: 'POST',
  data: params,
  adapter: createMockAdapter(200, {
    code: 0,
    message: '登录成功',
    data: {
      token: 'mock-token-001',
      userInfo: {}
    }
  })
})
```

adapter mock 的价值：

- mock 响应仍然走 Axios 链路。
- 请求拦截器会执行。
- 响应拦截器会执行。
- 401、500 会进入 Axios 错误分支。
- 业务错误会进入响应成功分支，再由 `code !== 0` reject。

这比在 `request()` 中直接写 mock 分支更接近真实项目。

## 十、业务接口模块设计

业务接口放在：

```text
src/api/modules/*
```

示例：

```ts
export function getUserList(params: UserListQuery): Promise<ApiResponse<PageResult<UserInfo>>> {
  return request<PageResult<UserInfo>>({
    url: '/user/list',
    params,
    adapter: createMockAdapter(200, {
      code: 0,
      message: '请求成功',
      data: userListResult
    })
  })
}
```

约束：

- 接口函数命名表达业务含义，例如 `login`、`getUserList`。
- 接口函数返回 `Promise<ApiResponse<T>>`。
- 查询类接口使用 `params`。
- 登录、修改类接口使用 `data`。
- 返回结果通过泛型表达，例如 `PageResult<UserInfo>`。
- 页面不直接拼接口 URL。

## 十一、页面层职责边界

页面层可以做：

- loading 状态。
- 表格数据赋值。
- 空状态展示。
- 当前页面错误文案。
- 查询条件组装。
- 分页状态维护。

页面层不应该做：

- 401 清 token。
- 401 跳登录。
- 500 全局错误分类。
- 网络错误统一分类。
- 手动注入 token。
- 重复拆解全局响应结构。

页面中合理的代码：

```ts
try {
  start()
  errorMessage.value = ''

  const res = await getUserList(params)
  users.value = res.data.list
  setTotal(res.data.total)
} catch (error) {
  users.value = []
  errorMessage.value = getErrorMessage(error)
} finally {
  stop()
}
```

这里的 `catch` 处理的是当前页面展示状态，不是全局请求规则。

## 十二、错误处理策略

当前错误处理分层：

| 层级            | 负责内容                                |
| --------------- | --------------------------------------- |
| `request.ts`    | token、业务错误、401、500、网络错误     |
| `api/modules/*` | 描述业务接口、入参、出参                |
| `stores/*`      | 登录、退出、恢复会话等业务动作          |
| `views/*`       | loading、空状态、页面错误文案、表格状态 |

当前策略：

```text
全局错误先在 request.ts 分类。
页面只决定当前页面怎么展示失败状态。
```

## 十三、验证记录

已验证分支：

| 分支     | mock 方式                      | 结果                   |
| -------- | ------------------------------ | ---------------------- |
| 200 成功 | `status = 200`，`code = 0`     | 返回业务数据           |
| 业务错误 | `status = 200`，`code = 10001` | 响应拦截器 reject      |
| 500      | `status = 500`                 | 进入服务器错误分支     |
| 401      | `status = 401`                 | 清 token，并跳转登录页 |

已执行构建：

```bash
pnpm build
```

已检查旧 mock 分支：

```bash
rg -n "mockData|MockRequestConfig|if \\(\"mockData\"|success: isValid|delay:" src/api
```

当前 `src/api` 不再保留 `mockData` 请求配置和 `MockRequestConfig`。

已检查页面层重复全局错误逻辑：

```bash
rg -n "401|500|服务器错误|网络错误|业务错误|localStorage\\.removeItem|window\\.location|location\\.href|console\\.error|ElMessage|toast|message\\.error|alert\\(" src/views src/components src/stores src/router src/api -g '*.ts' -g '*.vue'
```

结论：

- 全局 401、500、网络错误处理集中在 `request.ts`。
- `authStore.logout()` 中清 token 是主动退出逻辑，不属于重复 401 处理。
- 页面层没有重复实现全局错误处理。

## 十四、后续演进方向

### 1. 接真实后端

当前开发阶段：

```ts
adapter: createMockAdapter(...)
```

后续接真实接口时，删除 adapter：

```ts
return request<LoginResult>({
  url: '/auth/login',
  method: 'POST',
  data: params
})
```

页面和 store 调用方式不需要变化。

### 2. 环境变量

后续可以把 `baseURL` 改成：

```ts
baseURL: import.meta.env.VITE_API_BASE_URL
```

并通过 `.env.development`、`.env.production` 管理不同环境接口地址。

### 3. 全局 message 策略

当前使用 `console.error`。

后续接入 UI 组件库后，可以统一替换为：

```text
ElMessage.error(...)
```

但要避免页面重复弹同一个错误。

### 4. loading 策略

当前 `showLoading` 只是预留字段。

后续可以设计：

```ts
request({
  url: '/user/list',
  showLoading: true
})
```

再由请求层或统一请求状态管理处理全局 loading。

### 5. 403 策略

当前路由层已有 `/403` 页面。

后续可以在请求层补充：

```text
HTTP 403 -> 跳转 /403 或展示无权限提示
```

但需要区分：

- 路由无权限。
- 接口无权限。

### 6. 错误监控

后续工程化阶段可以扩展：

- 上报接口错误。
- 记录 status、url、method、message。
- 过滤敏感信息。

## 十五、口述稿

这个项目的请求层设计核心是把通信规则集中在 `src/api/request.ts`。

首先通过 `axios.create()` 创建项目专用请求实例，统一配置 `baseURL` 和超时时间。然后通过请求拦截器在请求发出前读取本地 token，并写入 `Authorization` 请求头。这样页面和业务接口模块不用每次手动加 token。

响应拦截器分两类处理。HTTP 成功时，会检查后端统一响应结构里的 `code`，如果 `code !== 0`，就认为是业务错误并统一 reject。HTTP 失败时，会根据状态码处理，比如 401 清理 token 并跳登录页，500 识别为服务器错误，其他情况作为网络错误或请求失败处理。

业务接口按模块放在 `src/api/modules` 下，比如 `auth.ts`、`user.ts`、`customer.ts`。这些模块只描述具体接口的 URL、method、params、data 和返回类型，不处理全局错误逻辑。页面只调用这些接口，并处理自己的 loading、空状态和错误文案。

当前项目还没有真实后端，所以使用 `createMockAdapter()` 模拟后端响应。和早期 `mockData` 分支不同，Axios adapter mock 仍然会经过请求拦截器和响应拦截器，因此可以真实验证 200、业务错误、401、500 等分支。后续接真实后端时，只需要移除 adapter，保留 `request<T>()` 和业务接口函数结构即可。

## 十六、当前结论

当前请求层已经满足 Day 25 阶段目标：

- 有统一 Axios 实例。
- 有请求拦截器。
- 有响应拦截器。
- token 注入集中。
- 业务错误集中处理。
- 401、500、网络错误集中处理。
- mock 响应通过 Axios adapter 进入真实拦截器链路。
- 页面层没有重复处理全局错误逻辑。
- `pnpm build` 通过。

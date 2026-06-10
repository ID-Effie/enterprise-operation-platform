/**
 * admin / 123456     管理员
 * manager / 123456   经理
 * operator / 123456     员工
 */
import { request } from '../request'
import { createMockAdapter } from '../mockAdapter'
import type { ApiResponse } from '@/types/common'
import type { LoginParams, LoginResult, UserInfo, UserRole } from '@/types/user'

const userMap: Record<UserRole, string> = {
  admin: '123456',
  manager: '123456',
  operator: '123456'
}

const mockUserInfoMap: Record<UserRole, UserInfo> = {
  admin: {
    id: 1,
    username: 'admin',
    nickname: '平台管理员',
    role: 'admin',
    status: 'enabled',
    createdAt: '2026-05-18'
  },
  manager: {
    id: 2,
    username: 'manager',
    nickname: '运营经理',
    role: 'manager',
    status: 'enabled',
    createdAt: '2026-05-18'
  },
  operator: {
    id: 3,
    username: 'operator',
    nickname: '运营员工',
    role: 'operator',
    status: 'enabled',
    createdAt: '2026-05-18'
  }
}

function isUserRole(username: string): username is UserRole {
  return username in userMap
}

// Promise<ApiResponse<LoginResult>>：
// login 是一个异步函数，成功后返回统一响应结构，响应里的 data 是 LoginResult 类型
export function login(params: LoginParams): Promise<ApiResponse<LoginResult>> {
  // const isValid = params.username === 'admin' && params.password === '123456'

  const isValid = () => {
    if (!isUserRole(params.username)) {
      return false
    }

    return userMap[params.username] === params.password
  }

  const userRole = isUserRole(params.username) ? params.username : 'operator'

  return request<LoginResult>({
    url: '/auth/login',
    method: 'POST',
    data: params,
    adapter: createMockAdapter(200, {
      code: isValid() ? 0 : 10001,
      message: isValid() ? '登录成功' : '账号或密码错误',
      data: isValid()
        ? {
            token: `mock-token-${userRole}`,
            userInfo: mockUserInfoMap[userRole]
          }
        : null
    })
  })
}

export function mockUnauthorized(): Promise<ApiResponse<null>> {
  return request<null>({
    url: '/auth/unauthorized',
    method: 'GET',
    adapter: createMockAdapter(401, {
      message: 'Unauthorized'
    })
  })
}

export function mockServerError(): Promise<ApiResponse<null>> {
  return request<null>({
    url: '/auth/server-error',
    method: 'GET',
    adapter: createMockAdapter(500, {
      message: 'Internal Server Error'
    })
  })
}

export function mockBusinessError(): Promise<ApiResponse<null>> {
  return request<null>({
    url: '/auth/business-error',
    method: 'GET',
    adapter: createMockAdapter(200, {
      code: 10001,
      message: '业务错误测试',
      data: null
    })
  })
}

export function mockSuccess(): Promise<ApiResponse<{ name: string }>> {
  return request<{ name: string }>({
    url: '/auth/success',
    method: 'GET',
    adapter: createMockAdapter(200, {
      code: 0,
      message: 'success',
      data: {
        name: '200 success'
      }
    })
  })
}

export function logout(): Promise<ApiResponse<null>> {
  return request<null>({
    url: '/auth/logout',
    method: 'POST',
    adapter: createMockAdapter(200, {
      code: 0,
      message: '退出成功',
      data: null
    })
  })
}

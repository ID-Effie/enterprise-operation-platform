import { request } from '../request'
import { createMockAdapter } from '../mockAdapter'
import type { ApiResponse } from '@/types/common'
import type { LoginParams, LoginResult } from '@/types/user'

// Promise<ApiResponse<LoginResult>>：
// login 是一个异步函数，成功后返回统一响应结构，响应里的 data 是 LoginResult 类型
export function login(params: LoginParams): Promise<ApiResponse<LoginResult>> {
  const isValid = params.username === 'admin' && params.password === '123456'

  return request<LoginResult>({
    url: '/auth/login',
    method: 'POST',
    data: params,
    adapter: createMockAdapter(200, {
      code: isValid ? 0 : 10001,
      message: isValid ? '登录成功' : '账号或密码错误',
      data: isValid
        ? {
            token: 'mock-token-001',
            userInfo: {
              id: 1,
              username: 'admin',
              role: 'admin',
              status: 'enabled',
              createdAt: '2026-05-18'
            }
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

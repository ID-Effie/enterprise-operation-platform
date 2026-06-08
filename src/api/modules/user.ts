import { request } from '../request'
import { createMockAdapter } from '../mockAdapter'
import type { ApiResponse, PageResult } from '@/types/common'
import type {
  UserInfo,
  UserRole,
  UserListQuery,
  DeleteUserParams,
  UpdateUserStatusParams,
  UpdateUserStatusResult
} from '@/types/user'

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
  staff: {
    id: 3,
    username: 'staff',
    nickname: '运营员工',
    role: 'staff',
    status: 'enabled',
    createdAt: '2026-05-18'
  }
}

function getMockRoleFromToken(): UserRole {
  const token = localStorage.getItem('token')

  if (token === 'mock-token-manager') {
    return 'manager'
  }

  if (token === 'mock-token-staff') {
    return 'staff'
  }

  return 'admin'
}

export function getUserInfo(): Promise<ApiResponse<UserInfo>> {
  const role = getMockRoleFromToken()

  return request<UserInfo>({
    url: '/user/info',
    adapter: createMockAdapter(200, {
      code: 0,
      message: '请求成功',
      data: mockUserInfoMap[role]
    })
  })
}

// 获取用户列表
export function getUserList(params: UserListQuery): Promise<ApiResponse<PageResult<UserInfo>>> {
  const userListResult: PageResult<UserInfo> = {
    list: [
      {
        id: 1,
        username: 'admin',
        nickname: '平台管理员',
        role: 'admin',
        status: 'enabled',
        createdAt: '2026-05-18'
      },
      {
        id: 2,
        username: 'operator',
        nickname: '运营人员',
        role: 'staff',
        status: 'enabled',
        createdAt: '2026-05-18'
      }
    ],
    total: 2,
    page: params.page,
    pageSize: params.pageSize
  }
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

// 删除用户
export function deleteUser(params: DeleteUserParams): Promise<ApiResponse<null>> {
  return request<null>({
    url: `/user/${params.id}`,
    method: 'DELETE',
    adapter: createMockAdapter(200, {
      code: 0,
      message: '删除成功',
      data: null
    })
  })
}

// 修改用户状态
export function updateUserStatus(
  params: UpdateUserStatusParams
): Promise<ApiResponse<UpdateUserStatusResult>> {
  return request<UpdateUserStatusResult>({
    url: `/users/${params.id}/status`,
    method: 'PATCH',
    data: {
      status: params.status
    },
    adapter: createMockAdapter(200, {
      code: 0,
      message: '修改成功',
      data: {
        success: true,
        status: params.status,
        id: params.id,
        username: 'admin',
        nickname: '平台管理员',
        role: 'admin',
        createdAt: '2026-05-18'
      }
    })
  })
}

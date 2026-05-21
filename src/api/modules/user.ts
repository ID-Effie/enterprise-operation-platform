import { request } from "../request";
import type { ApiResponse, PageResult } from "@/types/common";
import type {
  UserInfo,
  UserListQuery,
  DeleteUserParams,
  UpdateUserStatusParams,
  UpdateUserStatusResult,
} from "@/types/user";

export function getUserInfo(): Promise<ApiResponse<UserInfo>> {
  return request<UserInfo>({
    url: "/user/info",
    mockData: {
      id: 1,
      username: "admin",
      nickname: "平台管理员",
      role: "admin",
      status: "enabled",
      createdAt: "2026-05-18",
    },
  });
}

// 获取用户列表
export function getUserList(
  params: UserListQuery,
): Promise<ApiResponse<PageResult<UserInfo>>> {
  const mockData: PageResult<UserInfo> = {
    list: [
      {
        id: 1,
        username: "admin",
        nickname: "平台管理员",
        role: "admin",
        status: "enabled",
        createdAt: "2026-05-18",
      },
      {
        id: 2,
        username: "operator",
        nickname: "运营人员",
        role: "staff",
        status: "enabled",
        createdAt: "2026-05-18",
      },
    ],
    total: 2,
    page: params.page,
    pageSize: params.pageSize,
  };
  return request<PageResult<UserInfo>>({
    url: "/user/list",
    params,
    mockData,
  });
}

// 删除用户
export function deleteUser(
  params: DeleteUserParams,
): Promise<ApiResponse<null>> {
  return request<null>({
    url: `/api/user/${params.id}`,
    method: "DELETE",
    mockData: null,
  });
}

// 修改用户状态
export function updateUserStatus(
  params: UpdateUserStatusParams,
): Promise<ApiResponse<UpdateUserStatusResult>> {
  return request<UpdateUserStatusResult>({
    url: `/api/users/${params.id}/status`,
    method: "PATCH",
    data: {
      status: params.status,
    },
    mockData: {
      success: true,
      status: params.status,
      id: params.id,
      username: "admin",
      nickname: "平台管理员",
      role: "admin",
      createdAt: "2026-05-18",
    },
  });
}

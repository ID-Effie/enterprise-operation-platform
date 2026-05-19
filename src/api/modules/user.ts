import { request } from "../request";
import type { ApiResponse, PageResult } from "@/types/common";
import type { UserInfo, UserListQuery } from "@/types/user";

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
    data: params,
    mockData,
  });
}

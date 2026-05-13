import { request, type ApiResponse } from "../request";

export interface UserInfo {
  id: number;
  username: string;
  name: string;
  role: string;
}

export function getUserInfo(): Promise<ApiResponse<UserInfo>> {
  return request<UserInfo>({
    url: "/user/info",
    mockData: {
      id: 1,
      username: "admin",
      name: "平台管理员",
      role: "admin",
    },
  });
}

export function getUserList(): Promise<ApiResponse<UserInfo[]>> {
  return request<UserInfo[]>({
    url: "/user/list",
    mockData: [
      {
        id: 1,
        username: "admin",
        name: "平台管理员",
        role: "admin",
      },
      {
        id: 2,
        username: "operator",
        name: "运营人员",
        role: "operator",
      },
    ],
  });
}

import { request, type ApiResponse } from "../request";

export interface LoginParams {
  username: string;
  password: string;
}

export interface LoginResult {
  token: string;
  username: string;
}

// Promise<ApiResponse<LoginResult>>：
// login 是一个异步函数，成功后返回统一响应结构，响应里的 data 是 LoginResult 类型
export function login(params: LoginParams): Promise<ApiResponse<LoginResult>> {
  const isValid = params.username === "admin" && params.password === "123456";

  return request<LoginResult>({
    url: "/auth/login",
    method: "POST",
    data: params,
    success: isValid,
    message: isValid ? "登录成功" : "账号或密码错误",
    mockData: {
      token: "mock-token-001",
      username: params.username,
    },
  });
}

export function logout(): Promise<ApiResponse<null>> {
  return request<null>({
    url: "/auth/logout",
    method: "POST",
    mockData: null,
  });
}

/*
 * @Description: 用户、角色、登录、用户信息相关类型
 * @Author: zhaoyang.sun@proinnova.com.cn
 * @Date: 2026-05-18 19:08:04
 */

import type { ID, ListQuery } from "./common";

export type UserRole = "admin" | "manager" | "staff";

export type UserStatus = "enabled" | "disabled";

// UserInfo 是用户信息对象，不要和登录参数混在一起。
export interface UserInfo {
  id: ID;
  username: string;
  nickname?: string;
  avatar?: string;
  role: UserRole;
  status: UserStatus;
  createdAt: string;
}

// LoginParams 是请求参数。
export interface LoginParams {
  username: string;
  password: string;
}

// LoginResult 是登录接口返回结果。
export interface LoginResult {
  token: string;
  userInfo: UserInfo;
}

// UserListQuery 是用户列表查询参数，页面筛选区和接口层共用这一份类型。
export interface UserListQuery extends ListQuery {
  username?: string;
  status?: UserStatus;
}

// 删除用户参数类型
export interface DeleteUserParams {
  id: number;
}

//修改用户状态参数类型
export interface UpdateUserStatusParams {
  id: number;
  status: UserStatus;
}
// 修改用户状态返回值类型
export interface UpdateUserStatusResult extends UserInfo {
  id: number;
  success: boolean;
}

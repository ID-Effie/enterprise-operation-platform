/*
 * @Description: 
    负责登录状态和登录逻辑
    其他页面负责读取 authStore
 * @Author: zhaoyang.sun@proinnova.com.cn
 * @Date: 2026-05-23 16:47:42
 */

import { defineStore } from "pinia";
import { login as loginApi, logout as logoutApi } from "@/api/modules/auth";
import type { UserInfo, UserRole, LoginParams } from "@/types/user";

interface AuthState {
  token: string;
  userInfo: UserInfo | null;
  roles: UserRole[];
  permissions: string[];
}

export const useAuthStore = defineStore("auth", {
  state: (): AuthState => ({
    /**
     * 为什么 token 要读 localStorage？
     * 因为刷新页面后，Pinia 内存状态会丢失。
     * 如果不从 localStorage 恢复，用户一刷新页面就像没登录一样。
     */
    // token 优先从 localStorage 里恢复
    token: localStorage.getItem("token") ?? "",
    userInfo: null,
    roles: [],
    permissions: [],
  }),

  // getters 是根据 state 算出来的状态
  getters: {
    // isLogin 的意思是：只要有 token，就认为当前是登录状态。
    isLogin: (state): boolean => Boolean(state.token),
    // username 是从 userInfo 里派生出来的展示字段。顶部栏、欢迎语都可以直接用它。
    username: (state): string => state.userInfo?.username ?? "",
  },

  // actions 用来写会修改状态的业务动作。
  actions: {
    async login(params: LoginParams): Promise<void> {
      // 1.调接口登录：
      const res = await loginApi(params);

      // 2.把接口返回的数据存进 store：
      this.token = res.data.token;
      this.userInfo = res.data.userInfo;
      // 因为你当前项目里的 UserInfo (line 14) 只有一个 role 字段，不是数组。
      // 但计划要求 store 里有 roles，所以这里先把单个角色包装成数组
      // 以后如果后端返回 roles: UserRole[]，这里再改就行。
      this.roles = [res.data.userInfo.role];
      this.permissions = [
        "user:create",
        "user:update",
        "user:assign-role",
        "role:create",
        "role:update",
      ];

      // 把 token 存进 localStorage，方便刷新后恢复：
      localStorage.setItem("token", res.data.token);
    },

    // 负责退出登录清理
    async logout(): Promise<void> {
      await logoutApi();

      // 清理所有登录相关状态
      // 否则会出现一种问题：token 没了，但页面上还残留用户名、角色、权限信息。
      this.token = "";
      this.userInfo = null;
      this.roles = [];
      this.permissions = [];

      localStorage.removeItem("token");
    },
  },
});

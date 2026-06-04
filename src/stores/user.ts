/*
 * @Description:
    管 userInfo、roles、username  
 * @Author: zhaoyang.sun@proinnova.com.cn
 * @Date: 2026-06-04 18:00:13
 */
import { defineStore } from "pinia";
import type { UserInfo } from "@/types/user";

export const useUserStore = defineStore("user", {
  state: () => ({
    userInfo: null as UserInfo | null,
  }),

  getters: {
    roles: (state) => (state.userInfo ? [state.userInfo.role] : []),
    username: (state): string => state.userInfo?.username ?? "",
  },

  actions: {
    setUserInfo(userInfo: UserInfo) {
      this.userInfo = userInfo;
    },

    clearUserInfo() {
      this.userInfo = null;
    },
  },
});

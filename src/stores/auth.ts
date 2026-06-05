/*
 * @Description: 
    负责登录状态和登录逻辑
    其他页面负责读取 authStore
    只管 token、login、logout
 * @Author: zhaoyang.sun@proinnova.com.cn
 * @Date: 2026-05-23 16:47:42
 */

import { defineStore } from 'pinia'
import { login as loginApi, logout as logoutApi } from '@/api/modules/auth'
import type { LoginParams } from '@/types/user'
import { useUserStore } from '@/stores/user'
import { usePermissionStore } from '@/stores/permission'

interface AuthState {
  token: string
}

export const useAuthStore = defineStore('auth', {
  state: (): AuthState => ({
    /**
     * 为什么 token 要读 localStorage？
     * 因为刷新页面后，Pinia 内存状态会丢失。
     * 如果不从 localStorage 恢复，用户一刷新页面就像没登录一样。
     */
    // token 优先从 localStorage 里恢复
    token: localStorage.getItem('token') ?? ''
  }),

  // getters 是根据 state 算出来的状态
  getters: {
    // isLogin 的意思是：只要有 token，就认为当前是登录状态。
    isLogin: (state): boolean => Boolean(state.token)
  },

  // actions 用来写会修改状态的业务动作。
  actions: {
    // 负责登录添加数据到 store，token 持久化
    async login(params: LoginParams): Promise<void> {
      const userStore = useUserStore()
      const permissionStore = usePermissionStore()
      // 1.调接口登录：
      const res = await loginApi(params)

      // 2.把接口返回的数据存进 store：
      this.token = res.data.token
      userStore.setUserInfo(res.data.userInfo)
      // 因为你当前项目里的 UserInfo (line 14) 只有一个 role 字段，不是数组。
      // 但计划要求 store 里有 roles，所以这里先把单个角色包装成数组
      // 以后如果后端返回 roles: UserRole[]，这里再改就行。
      permissionStore.setPermissions([
        'user:create',
        'user:update',
        'user:assign-role',
        'role:create',
        'role:update',
        'dashboard:view',
        'customer:list',
        'order:list',
        'user:list',
        'system:manage'
      ])

      // 把 token 存进 localStorage，方便刷新后恢复：
      localStorage.setItem('token', res.data.token)
    },

    //
    async restoreSession(): Promise<void> {
      const userStore = useUserStore()
      const permissionStore = usePermissionStore()

      if (!this.token) {
        return
      }

      userStore.setUserInfo({
        id: 1,
        username: 'admin',
        role: 'admin',
        status: 'enabled',
        createdAt: '2026-05-18'
      })

      /**
       * 有 token
          -> 请求 /me 获取 userInfo
          -> 请求 /permissions 获取 permissions
          -> 写入 userStore 和 permissionStore
      */
      permissionStore.setPermissions([
        'dashboard:view',
        'customer:list',
        'order:list',
        'user:list',
        'system:manage',
        'user:create',
        'user:update',
        'user:assign-role',
        'role:create',
        'role:update'
      ])
    },

    // 负责退出登录清理
    async logout(): Promise<void> {
      const userStore = useUserStore()
      const permissionStore = usePermissionStore()
      await logoutApi()

      // 清理所有登录相关状态
      // 否则会出现一种问题：token 没了，但页面上还残留用户名、角色、权限信息。
      this.token = ''
      userStore.clearUserInfo()
      permissionStore.clearPermission()

      localStorage.removeItem('token')
    }
  }
})

/*
 * @Description:
    管 permissions、hasPermission
 * @Author: zhaoyang.sun@proinnova.com.cn
 * @Date: 2026-06-04 18:00:24
 */
import { defineStore } from 'pinia'

export const usePermissionStore = defineStore('permission', {
  state: () => ({
    permissions: [] as string[],
    menus: [] as string[]
  }),

  actions: {
    setPermissions(permissions: string[]) {
      this.permissions = permissions
    },

    setMenus(menus: string[]) {
      this.menus = menus
    },

    hasPermissions(permission: string) {
      return this.permissions.includes(permission)
    },

    clearPermission() {
      this.permissions = []
      this.menus = []
    },

    hasRoutePermission(permission?: string) {
      if (!permission) {
        return true
      }
      return this.permissions.includes(permission)
    }
  }
})

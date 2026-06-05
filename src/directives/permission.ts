/*
 * @Description:
 * @Author: zhaoyang.sun@proinnova.com.cn
 * @Date: 2026-05-30 19:13:46
 */
import type { Directive } from 'vue'
import { usePermissionStore } from '@/stores/permission'

type PermissionValue = string | string[]

function hasPermission(value: PermissionValue) {
  const permissionStore = usePermissionStore()
  // 如果传进来的是数组：直接用;如果传进来的是字符串：包成数组
  const requiredPermissions = Array.isArray(value) ? value : [value]

  return requiredPermissions.some((permission) => permissionStore.hasPermissions(permission))
}

export const vPermission: Directive<HTMLElement, PermissionValue> = {
  mounted(el, binding) {
    el.style.display = hasPermission(binding.value) ? '' : 'none'
  },

  updated(el, binding) {
    el.style.display = hasPermission(binding.value) ? '' : 'none'
  }
}

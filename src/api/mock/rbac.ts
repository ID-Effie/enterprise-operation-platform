/*
 * @Description:
 * @Author: zhaoyang.sun@proinnova.com.cn
 * @Date: 2026-06-10 16:25:52
 */
import type { RolePermission } from '@/types/permission'

export const rolePermissions: RolePermission[] = [
  {
    role: 'admin',
    permissions: [
      'dashboard:view',
      'customer:list',
      'customer:create',
      'customer:export',
      'order:list',
      'order:create',
      'order:batch',
      'order:update',
      'user:list',
      'user:create',
      'user:update',
      'user:assign-role',
      'system:manage',
      'role:create',
      'role:update'
    ]
  },
  {
    role: 'manager',
    permissions: [
      'dashboard:view',
      'customer:list',
      'customer:create',
      'customer:export',
      'order:list',
      'order:create',
      'order:update',
      'user:list',
      'user:create',
      'user:update'
    ]
  },
  {
    role: 'operator',
    permissions: ['dashboard:view', 'customer:list', 'order:list']
  }
]

export function getPermissionsByRole(role: RolePermission['role']) {
  return rolePermissions.find((item) => item.role === role)?.permissions ?? []
}

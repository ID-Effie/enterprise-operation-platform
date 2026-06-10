import type { UserRole } from './user'

export type PermissionCode =
  | 'dashboard:view'
  | 'customer:list'
  | 'customer:create'
  | 'customer:export'
  | 'order:list'
  | 'order:create'
  | 'order:batch'
  | 'order:update'
  | 'user:list'
  | 'user:create'
  | 'user:update'
  | 'user:assign-role'
  | 'system:manage'
  | 'role:create'
  | 'role:update'

export interface PermissionItem {
  code: PermissionCode
  name: string
}

export interface RolePermission {
  role: UserRole
  permissions: PermissionCode[]
}

/*
 * @Description: 菜单、路由菜单、权限菜单相关类型
 * @Author: zhaoyang.sun@proinnova.com.cn
 * @Date: 2026-05-18 19:08:23
 */

import type { ID } from './common'
import type { PermissionCode } from './permission'

// MenuType 可以区分目录、菜单、按钮。
export type MenuType = 'catalog' | 'menu' | 'button'

export interface MenuItem {
  id: ID
  title: string
  path: string
  name?: string
  icon?: string
  type: MenuType
  parentId?: ID
  permission?: PermissionCode // permission 可以用于按钮权限,菜单上的权限码必须来自统一的 PermissionCode，不容易写错
  children?: MenuItem[] // children?: MenuItem[] 表示菜单可以递归嵌套
}

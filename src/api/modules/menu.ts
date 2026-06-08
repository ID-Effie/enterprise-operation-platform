/*
 * @Description:获取菜单的接口
 * @Author: zhaoyang.sun@proinnova.com.cn
 * @Date: 2026-05-18 20:08:55
 */

import { request } from '../request'
import { createMockAdapter } from '../mockAdapter'
import type { ApiResponse } from '@/types/common'
import type { MenuItem } from '@/types/menu'

export function getUserMenus(): Promise<ApiResponse<MenuItem[]>> {
  return request<MenuItem[]>({
    url: '/user/menus',
    adapter: createMockAdapter(200, {
      code: 0,
      message: '请求成功',
      data: [
        {
          id: 1,
          title: '首页',
          path: '/dashboard',
          type: 'menu',
          permission: 'dashboard:view' // 菜单数据本身知道“显示我需要什么权限”。
        },
        {
          id: 2,
          title: '客户管理',
          path: '/customers',
          type: 'menu',
          permission: 'customer:list'
        },
        {
          id: 3,
          title: '订单管理',
          path: '/orders',
          type: 'menu',
          permission: 'order:list'
        },
        {
          id: 4,
          title: '用户管理',
          path: '/users',
          type: 'menu',
          permission: 'user:list'
        },
        {
          id: 5,
          title: '系统管理',
          path: '/system',
          type: 'menu',
          permission: 'system:manage'
        }
      ]
    })
  })
}

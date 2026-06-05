/*
 * @Description: 客户类型：对应客户列表筛选区：客户名称、客户等级
 * @Author: zhaoyang.sun@proinnova.com.cn
 * @Date: 2026-05-19 14:37:04
 */

import type { ID, ListQuery } from './common'

export type CustomerLevel = 'vip' | 'normal' | 'trial'

export interface CustomerInfo {
  id: ID
  name: string
  level: CustomerLevel
  phone: string
  industry: string
  createdAt: string
}

export interface CustomerListQuery extends ListQuery {
  level?: CustomerLevel
}

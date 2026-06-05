/*
 * @Description:
 * 订单类型:对应订单列表筛选区：订单编号、订单状态。
 * @Author: zhaoyang.sun@proinnova.com.cn
 * @Date: 2026-05-19 14:42:12
 */

import type { ID, ListQuery } from './common'

export type OrderStatus = 'pending' | 'processing' | 'completed' | 'cancelled'

export interface OrderInfo {
  id: ID
  orderNo: string
  customerName: string
  status: OrderStatus
  amount: number
  createdAt: string
}

export interface OrderListQuery extends ListQuery {
  orderNo?: string
  status?: OrderStatus
}

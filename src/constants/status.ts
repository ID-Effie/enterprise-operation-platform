/*
 * @Description: 建立统一状态映射文件
constants 一般用来放项目里的固定枚举值、状态码、选项列表、业务常量。
 * @Author: zhaoyang.sun@proinnova.com.cn
 * @Date: 2026-05-20 15:57:13
 */

import type { OrderStatus } from '@/types/order'
import type { UserStatus } from '@/types/user'
import type { ApprovalStatus } from '@/types/approval'

export type StatusColor = 'green' | 'red' | 'orange' | 'blue' | 'gray'

// Record<OrderStatus, string> 最终结果是一个对象，对象的key 是OrderStatus，key对应的值是字符串
// 它的作用是：OrderStatus 有几个状态，映射对象就必须写几个 key。漏写、写错都会报错。
export const orderStatusText: Record<OrderStatus, string> = {
  pending: '待处理',
  processing: '处理中',
  completed: '已完成',
  cancelled: '已取消'
}

export const orderStatusColor: Record<OrderStatus, StatusColor> = {
  pending: 'orange',
  processing: 'blue',
  completed: 'green',
  cancelled: 'gray'
}

export const approvalStatusText: Record<ApprovalStatus, string> = {
  draft: '草稿',
  reviewing: '审核中',
  approved: '已通过',
  rejected: '已拒绝'
}

export const approvalStatusColor: Record<ApprovalStatus, StatusColor> = {
  draft: 'gray',
  reviewing: 'blue',
  approved: 'green',
  rejected: 'red'
}

export const userStatusText: Record<UserStatus, string> = {
  enabled: '启用',
  disabled: '禁用'
}

export const userStatusColor: Record<UserStatus, StatusColor> = {
  enabled: 'green',
  disabled: 'red'
}

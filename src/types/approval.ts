/*
 * @Description: 审批相关类型
 * @Author: zhaoyang.sun@proinnova.com.cn
 * @Date: 2026-05-20 15:51:03
 */

export type ApprovalStatus = 'draft' | 'reviewing' | 'approved' | 'rejected'

export interface ApprovalInfo {
  id: string | number
  title: string
  applicant: string
  status: ApprovalStatus
  createdAt: string
}

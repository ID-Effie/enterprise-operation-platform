/*
 * @Description: 通用类型，比如 ID、分页、接口响应结构
 * @Author: zhaoyang.sun@proinnova.com.cn
 * @Date: 2026-05-18 19:07:45
 */

export type ID = string | number;

// 后端接口统一返回结构。
// T 是泛型，表示 data 字段的具体类型由调用接口时决定。
export interface ApiResponse<T> {
  code: number;
  message: string;
  data: T;
}

// 只管分页
export interface PageParams {
  page: number;
  pageSize: number;
}

// 任意列表的分页返回结构
export interface PageResult<T> {
  list: T[];
  total: number;
  page: number;
  pageSize: number;
}

//分页 + 通用搜索条件
export interface ListQuery extends PageParams {
  keyword?: string;
}

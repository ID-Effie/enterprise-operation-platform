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

export interface PageParams {
  page: number;
  pageSize: number;
}

export interface PageResult<T> {
  list: T[];
  total: number;
  page: number;
  pageSize: number;
}

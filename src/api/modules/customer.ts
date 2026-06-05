/*
 * @Description: 客户接口模块
 * @Author: zhaoyang.sun@proinnova.com.cn
 * @Date: 2026-05-19 15:36:23
 */
import { request } from "../request";
import { createMockAdapter } from "../mockAdapter";
import type { ApiResponse, PageResult } from "@/types/common";
import type { CustomerInfo, CustomerListQuery } from "@/types/customer";

export function getCustomerList(
  params: CustomerListQuery,
): Promise<ApiResponse<PageResult<CustomerInfo>>> {
  return request<PageResult<CustomerInfo>>({
    url: "/customer/list",
    params,
    adapter: createMockAdapter(200, {
      code: 0,
      message: "请求成功",
      data: {
        list: [
          {
            id: 1,
            name: "星河科技",
            level: "vip",
            phone: "13800000001",
            industry: "软件服务",
            createdAt: "2026-05-19",
          },
        ],
        total: 1,
        page: params.page,
        pageSize: params.pageSize,
      },
    }),
  });
}

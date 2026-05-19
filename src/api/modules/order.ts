/*
 * @Description: 订单接口模块
 * @Author: zhaoyang.sun@proinnova.com.cn
 * @Date: 2026-05-19 15:25:18
 */
import { request } from "../request";
import type { ApiResponse, PageResult } from "@/types/common";
import type { OrderInfo, OrderListQuery } from "@/types/order";

export function getOrderList(
  params: OrderListQuery,
): Promise<ApiResponse<PageResult<OrderInfo>>> {
  return request<PageResult<OrderInfo>>({
    url: "/order/list",
    data: params,
    mockData: {
      list: [
        {
          id: 1,
          orderNo: "SO20260519001",
          customerName: "星河科技",
          status: "pending",
          amount: 12800,
          createdAt: "2026-05-19",
        },
      ],
      total: 1,
      page: params.page,
      pageSize: params.pageSize,
    },
  });
}

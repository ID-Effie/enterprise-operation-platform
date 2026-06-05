/*
 * @Description: 订单接口模块
 * @Author: zhaoyang.sun@proinnova.com.cn
 * @Date: 2026-05-19 15:25:18
 */
import { request } from "../request";
import { createMockAdapter } from "../mockAdapter";
import type { ApiResponse, PageResult } from "@/types/common";
import type { OrderInfo, OrderListQuery } from "@/types/order";

const mockOrders: OrderInfo[] = [
  {
    id: 1,
    orderNo: "SO20260519001",
    customerName: "星河科技",
    status: "pending",
    amount: 12800,
    createdAt: "2026-05-19",
  },
  {
    id: 2,
    orderNo: "SO20260519002",
    customerName: "音河科技",
    status: "processing",
    amount: 102800,
    createdAt: "2026-05-20",
  },
  {
    id: 3,
    orderNo: "SO20260519003",
    customerName: "汉得信息",
    status: "completed",
    amount: 80000,
    createdAt: "2026-05-20",
  },
  {
    id: 4,
    orderNo: "SO20260519004",
    customerName: "元年信息",
    status: "cancelled",
    amount: 128000,
    createdAt: "2026-05-20",
  },
];

export function getOrderList(
  params: OrderListQuery,
): Promise<ApiResponse<PageResult<OrderInfo>>> {
  const filteredOrders = mockOrders.filter((order) => {
    const matchesOrderNo = params.orderNo
      ? order.orderNo.includes(params.orderNo)
      : true;
    const matchesStatus = params.status ? order.status === params.status : true;

    return matchesOrderNo && matchesStatus;
  });

  return request<PageResult<OrderInfo>>({
    url: "/order/list",
    data: params,
    adapter: createMockAdapter(200, {
      code: 0,
      message: "请求成功",
      data: {
        list: filteredOrders,
        total: filteredOrders.length,
        page: params.page,
        pageSize: params.pageSize,
      },
    }),
  });
}

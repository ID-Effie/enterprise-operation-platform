<!--
 * @Description: 
 * @Author: zhaoyang.sun@proinnova.com.cn
 * @Date: 2026-05-11 14:17:17
-->
<template>
  <PageContainer
    title="订单列表"
    description="用于承载订单状态、订单金额和订单处理动作。"
  >
    <template #actions>
      <button type="button" class="primary-link" @click="openCreate">
        创建订单
      </button>
      <button type="button" class="secondary-link">批量处理</button>
    </template>

    <section class="query-panel" aria-label="订单查询区">
      <label>
        订单编号
        <input
          v-model="query.orderNo"
          type="text"
          placeholder="请输入订单编号"
        />
      </label>
      <label>
        订单状态
        <select v-model="query.status">
          <option value="">全部状态</option>
          <option
            v-for="option in orderStatusOptions"
            :key="option.value"
            :value="option.value"
          >
            {{ option.label }}
          </option>
        </select>
      </label>
      <button type="button" class="primary-link" @click="loadOrderList">
        查询
      </button>
      <button type="button" class="secondary-link" @click="resetQuery">
        重置
      </button>
    </section>

    <p class="query-summary">{{ querySummary }}</p>

    <section class="table-placeholder" aria-label="订单表格区">
      <div class="table-header">
        <span>订单编号</span>
        <span>客户名称</span>
        <span>订单状态</span>
        <!-- <span>金额</span>
        <span>创建时间</span> -->
        <span>操作</span>
      </div>
      <p v-if="loading" class="table-state">订单数据加载中...</p>
      <div v-else-if="errorMessage" class="table-state table-error">
        <span>{{ errorMessage }}</span>
        <button type="button" class="table-action" @click="loadOrderList">
          重试
        </button>
      </div>
      <div v-else-if="orders.length > 0" class="table-body">
        <div v-for="order in orders" :key="order.id" class="table-row">
          <span>{{ order.orderNo }}</span>
          <span>{{ order.customerName }}</span>
          <span>
            <StatusTag
              :text="orderStatusText[order.status]"
              :color="orderStatusColor[order.status]"
            />
          </span>
          <span>
            <button type="button" class="table-action" @click="openEdit(order)">
              编辑
            </button>
          </span>
        </div>
      </div>
      <p v-else class="table-state">暂无订单数据</p>
    </section>

    <div class="pagination-bar">
      <button
        type="button"
        class="secondary-link"
        :disabled="currentPage <= 1"
        @click="
          setPage(currentPage - 1);
          loadOrderList();
        "
      >
        上一页
      </button>

      <span>第 {{ currentPage }} / {{ totalPages }} 页，共 {{ total }} 条</span>

      <button
        type="button"
        class="secondary-link"
        :disabled="currentPage >= totalPages"
        @click="
          setPage(currentPage + 1);
          loadOrderList();
        "
      >
        下一页
      </button>
    </div>

    <div v-if="visible" class="modal-mask">
      <div class="modal-panel">
        <h3>{{ mode === "create" ? "新增订单" : "编辑订单" }}</h3>

        <p v-if="current">
          当前订单：{{ current.orderNo }} - {{ current.customerName }}
        </p>
        <p v-else>当前为新增订单</p>

        <button type="button" class="secondary-link" @click="close">
          关闭
        </button>
      </div>
    </div>
  </PageContainer>
</template>

<script setup lang="ts">
import PageContainer from "@/components/PageContainer.vue";
import StatusTag from "@/components/StatusTag.vue";
import { reactive, ref, computed, watch } from "vue";
import type { OrderInfo, OrderListQuery, OrderStatus } from "@/types/order";
import { getOrderList } from "@/api/modules/order";
import { orderStatusText, orderStatusColor } from "@/constants/status";
import { useModal } from "@/composables/useModal";
import { useLoading } from "@/composables/useLoading";
import { usePagination } from "@/composables/usePagination";

const orders = ref<OrderInfo[]>([]);
const errorMessage = ref("");

const { visible, mode, current, openCreate, openEdit, close } =
  useModal<OrderInfo>();
const { currentPage, pageSize, total, totalPages, setPage, setTotal, reset } =
  usePagination(1, 10);
const { loading, start, stop } = useLoading();

const orderStatusOptions: Array<{
  label: string;
  value: OrderStatus;
}> = [
  { label: orderStatusText.pending, value: "pending" },
  { label: orderStatusText.processing, value: "processing" },
  { label: orderStatusText.completed, value: "completed" },
  { label: orderStatusText.cancelled, value: "cancelled" },
];

const query = reactive<{
  orderNo: string;
  status: "" | OrderStatus;
}>({
  orderNo: "",
  status: "",
});

const querySummary = computed(() => {
  const conditions: string[] = [];

  if (query.orderNo.trim()) {
    conditions.push(`订单编号：${query.orderNo.trim()}`);
  }

  if (query.status) {
    conditions.push(`订单状态：${orderStatusText[query.status]}`);
  }

  return conditions.length > 0 ? conditions.join("，") : "当前为全部订单";
});

watch(
  () => [query.orderNo, query.status],
  () => {
    void loadOrderList();
  },
  {
    immediate: true,
  },
);

async function loadOrderList() {
  try {
    start();
    errorMessage.value = "";
    const params: OrderListQuery = {
      orderNo: query.orderNo.trim() || undefined,
      status: query.status || undefined,
      page: currentPage.value,
      pageSize: pageSize.value,
    };

    const res = await getOrderList(params);
    orders.value = res.data.list;
    setTotal(res.data.total);
  } catch (error: unknown) {
    orders.value = [];
    errorMessage.value = getErrorMessage(error);
  } finally {
    stop();
  }
}

// Error 类型收窄
function getErrorMessage(error: unknown) {
  if (
    typeof error === "object" &&
    error != null &&
    "message" in error &&
    typeof error.message === "string"
  ) {
    return error.message;
  }
  return "订单列表加载失败，请稍后重试";
}

// 重置
function resetQuery() {
  query.orderNo = "";
  query.status = "";
  reset();
  // void loadOrderList();
}
</script>

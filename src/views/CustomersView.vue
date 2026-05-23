<!--
 * @Description: 
 * @Author: zhaoyang.sun@proinnova.com.cn
 * @Date: 2026-05-11 14:17:01
-->
<template>
  <PageContainer
    title="客户列表"
    description="用于承载客户基础信息、客户分层和客户详情入口。"
  >
    <section class="query-panel" aria-label="客户查询区">
      <label>
        客户名称
        <input
          v-model="query.keyword"
          type="text"
          placeholder="请输入客户名称"
        />
      </label>
      <label>
        客户等级
        <select v-model="query.level">
          <option value="">全部等级</option>
          <option value="vip">VIP</option>
          <option value="normal">普通客户</option>
          <option value="trial">试用客户</option>
        </select>
      </label>
      <button type="button" class="primary-link" @click="loadCustomerList">
        查询
      </button>
      <button type="button" class="secondary-link" @click="resetQuery">
        重置
      </button>
    </section>

    <div class="table-toolbar">
      <button type="button" class="primary-link">新增客户</button>
      <button type="button" class="secondary-link">导出列表</button>
    </div>

    <section class="table-placeholder" aria-label="客户表格区">
      <div class="table-header">
        <span>客户名称</span>
        <span>客户等级</span>
        <span>联系人</span>
        <span>操作</span>
      </div>
      <p v-if="loading" class="table-state">数据加载中...</p>
      <div v-else-if="errorMessage" class="table-state table-error">
        <span>{{ errorMessage }}</span>
        <button type="button" class="table-action" @click="loadCustomerList">
          重试
        </button>
      </div>
      <div v-else-if="customers.length > 0" class="table-body">
        <div v-for="customer in customers" :key="customer.id" class="table-row">
          <span>{{ customer.name }}</span>
          <span>{{ customer.level }}</span>
          <span>{{ customer.phone }}</span>
          <span>{{ customer.industry }}</span>
        </div>
      </div>
      <p v-else class="table-state">暂无客户数据</p>
    </section>
  </PageContainer>
</template>

<script setup lang="ts">
import type {
  CustomerInfo,
  CustomerLevel,
  CustomerListQuery,
} from "@/types/customer";
import PageContainer from "../components/PageContainer.vue";
import { onMounted, reactive, ref } from "vue";
import { getCustomerList } from "@/api/modules/customer";

interface CustomerQueryForm {
  keyword: string;
  level: "" | CustomerLevel;
}

const customers = ref<CustomerInfo[]>([]);
const loading = ref(false);
const errorMessage = ref("");

// reactive 是 Vue 3 里的一个 API，用来把普通对象变成“响应式对象”。
// 用 reactive 包起来的对象，数据变了，页面会自动更新。
// reactive 适合：对象类型的数据，比如表单、查询条件、配置对象。
const query = reactive<CustomerQueryForm>({
  keyword: "",
  level: "",
});

onMounted(async () => {
  await loadCustomerList();
});

async function loadCustomerList() {
  try {
    loading.value = true;
    errorMessage.value = "";

    const params: CustomerListQuery = {
      keyword: query.keyword.trim() || undefined,
      level: query.level || undefined,
      page: 1,
      pageSize: 10,
    };

    const res = await getCustomerList(params);
    customers.value = res.data.list;
  } catch {
    customers.value = [];
    errorMessage.value = "客户列表加载失败，请稍后重试";
  } finally {
    loading.value = false;
  }
}

function resetQuery() {
  query.keyword = "";
  query.level = "";
  void loadCustomerList();
}
</script>

<!--
 * @Description: 
 * @Author: zhaoyang.sun@proinnova.com.cn
 * @Date: 2026-05-11 14:17:01
-->
<template>
  <PageContainer title="客户列表" description="用于承载客户基础信息、客户分层和客户详情入口。">
    <template #actions>
      <button v-permission="'customer:create'" type="button" class="primary-link">新增客户</button>
      <button v-permission="'customer:export'" type="button" class="secondary-link">
        导出列表
      </button>
    </template>

    <section class="query-panel" aria-label="客户查询区">
      <label>
        客户名称
        <input v-model="query.keyword" type="text" placeholder="请输入客户名称" />
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
      <button type="button" class="primary-link" @click="loadCustomerList">查询</button>
      <button type="button" class="secondary-link" @click="resetQuery">重置</button>
    </section>

    <p class="query-summary">{{ querySummary }}</p>

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
        <button type="button" class="table-action" @click="loadCustomerList">重试</button>
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
    <div class="pagination-bar">
      <button
        type="button"
        class="secondary-link"
        :disabled="currentPage <= 1"
        @click="handlePrevPage"
      >
        上一页
      </button>

      <span>第 {{ currentPage }} / {{ totalPages }} 页，共 {{ total }} 条</span>

      <button
        type="button"
        class="secondary-link"
        :disabled="currentPage >= totalPages"
        @click="handleNextPage"
      >
        下一页
      </button>
    </div>
  </PageContainer>
</template>

<script setup lang="ts">
import { reactive, ref, computed, watch } from 'vue'
import type { CustomerInfo, CustomerLevel, CustomerListQuery } from '@/types/customer'
import PageContainer from '../components/PageContainer.vue'
import { getCustomerList } from '@/api/modules/customer'
import { useLoading } from '@/composables/useLoading'
import { usePagination } from '@/composables/usePagination'

interface CustomerQueryForm {
  keyword: string
  level: '' | CustomerLevel
}

const { loading, start, stop } = useLoading()
const { currentPage, pageSize, total, totalPages, setPage, setTotal, reset } = usePagination(1, 10)

const customers = ref<CustomerInfo[]>([])
const errorMessage = ref('')

// reactive 是 Vue 3 里的一个 API，用来把普通对象变成“响应式对象”。
// 用 reactive 包起来的对象，数据变了，页面会自动更新。
// reactive 适合：对象类型的数据，比如表单、查询条件、配置对象。
/** 以前：
 * 输入框 / 下拉框
    ↓ v-model
query 查询状态
    ↓ 点击查询
CustomerListQuery 接口参数
    ↓
getCustomerList(params)
    ↓
customers 列表数据
 */
/**现在：
 * v-model 修改 query
    ↓
computed 自动生成 querySummary
    ↓
watch 监听 query.keyword / query.level
    ↓
loadCustomerList 请求列表
    ↓
customers 更新表格
 */
const query = reactive<CustomerQueryForm>({
  keyword: '',
  level: ''
})
// 加客户等级文案映射
const customerLevelText: Record<CustomerLevel, string> = {
  vip: 'VIP',
  normal: '普通客户',
  trial: '试用客户'
}

// 加 computed 查询摘要
const querySummary = computed(() => {
  const conditions: string[] = []

  if (query.keyword.trim()) {
    conditions.push(`客户名称：${query.keyword.trim()}`)
  }

  if (query.level) {
    conditions.push(`客户等级：${customerLevelText[query.level]}`)
  }

  return conditions.length > 0 ? conditions.join('，') : '当前为全部客户'
})

/**
 * 页面进入时立即请求一次
 * query.keyword 变化时重新请求
 * query.level 变化时重新请求
 */
watch(
  () => [query.keyword, query.level],
  () => {
    void loadCustomerList()
  },
  {
    immediate: true
  }
)

async function loadCustomerList() {
  try {
    start()
    errorMessage.value = ''

    const params: CustomerListQuery = {
      keyword: query.keyword.trim() || undefined,
      level: query.level || undefined,
      page: currentPage.value,
      pageSize: pageSize.value
    }

    const res = await getCustomerList(params)
    customers.value = res.data.list
    setTotal(res.data.total)
  } catch {
    customers.value = []
    errorMessage.value = '客户列表加载失败，请稍后重试'
  } finally {
    stop()
  }
}

function resetQuery() {
  query.keyword = ''
  query.level = ''
  reset()
  // void loadCustomerList();
}

function handlePrevPage() {
  setPage(currentPage.value - 1)
  void loadCustomerList()
}

function handleNextPage() {
  setPage(currentPage.value + 1)
  void loadCustomerList()
}
</script>

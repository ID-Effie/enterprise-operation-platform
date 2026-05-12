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
    <section class="query-panel" aria-label="订单查询区">
      <label>
        订单编号
        <input type="text" placeholder="请输入订单编号" />
      </label>
      <label>
        订单状态
        <input type="text" placeholder="全部状态" />
      </label>
      <button type="button" class="primary-link">查询</button>
      <button type="button" class="secondary-link">重置</button>
    </section>

    <div class="table-toolbar">
      <button type="button" class="primary-link">创建订单</button>
      <button type="button" class="secondary-link">批量处理</button>
    </div>

    <section class="table-placeholder" aria-label="订单表格区">
      <div class="table-header">
        <span>订单编号</span>
        <span>客户名称</span>
        <span>订单状态</span>
        <span>操作</span>
      </div>
      <p>订单列表数据将在后续接入接口后展示。</p>
    </section>
  </PageContainer>
</template>

<script setup lang="ts">
import PageContainer from "../components/PageContainer.vue";
</script>

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
        <input type="text" placeholder="请输入客户名称" />
      </label>
      <label>
        客户等级
        <input type="text" placeholder="全部等级" />
      </label>
      <button type="button" class="primary-link">查询</button>
      <button type="button" class="secondary-link">重置</button>
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
      <p>客户列表数据将在后续接入接口后展示。</p>
    </section>
  </PageContainer>
</template>

<script setup lang="ts">
import PageContainer from "../components/PageContainer.vue";
</script>

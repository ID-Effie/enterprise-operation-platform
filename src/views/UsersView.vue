<template>
  <PageContainer
    title="用户管理"
    description="用于承载后台用户、角色归属和账号状态维护。"
  >
    <section class="query-panel" aria-label="用户查询区">
      <label>
        用户名称
        <input type="text" placeholder="请输入用户名称" />
      </label>
      <label>
        账号状态
        <input type="text" placeholder="全部状态" />
      </label>
      <button type="button" class="primary-link">查询</button>
      <button type="button" class="secondary-link">重置</button>
    </section>

    <div class="table-toolbar">
      <button type="button" class="primary-link">新增用户</button>
      <button type="button" class="secondary-link">分配角色</button>
    </div>

    <section class="table-placeholder" aria-label="用户表格区">
      <div class="table-header">
        <span>用户名称</span>
        <span>角色</span>
        <span>账号状态</span>
        <span>操作</span>
      </div>
      <p>用户列表数据将在后续接入接口后展示。</p>
    </section>
  </PageContainer>
</template>

<script setup lang="ts">
import PageContainer from "../components/PageContainer.vue";
</script>

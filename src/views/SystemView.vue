<!--
 * @Description: 
 * @Author: zhaoyang.sun@proinnova.com.cn
 * @Date: 2026-05-11 14:17:38
-->
<template>
  <section class="content-section business-page">
    <div class="page-heading">
      <div>
        <h2>系统管理</h2>
        <p class="description">用于承载菜单配置、系统参数和平台基础设置。</p>
      </div>
    </div>

    <section class="query-panel" aria-label="系统配置查询区">
      <label>
        配置名称
        <input type="text" placeholder="请输入配置名称" />
      </label>
      <label>
        配置类型
        <input type="text" placeholder="全部类型" />
      </label>
      <button type="button" class="primary-link">查询</button>
      <button type="button" class="secondary-link">重置</button>
    </section>

    <div class="table-toolbar">
      <button type="button" class="primary-link">新增配置</button>
      <button type="button" class="secondary-link">刷新缓存</button>
    </div>

    <section class="table-placeholder" aria-label="系统配置表格区">
      <div class="table-header">
        <span>配置名称</span>
        <span>配置类型</span>
        <span>更新时间</span>
        <span>操作</span>
      </div>
      <p>系统配置数据将在后续接入接口后展示。</p>
    </section>
  </section>
</template>

<script setup lang="ts"></script>

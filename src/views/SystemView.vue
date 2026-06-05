<!--
 * @Description: 
 * @Author: zhaoyang.sun@proinnova.com.cn
 * @Date: 2026-05-11 14:17:38
-->
<template>
  <PageContainer title="系统管理" description="用于承载菜单配置、系统参数和平台基础设置。">
    <template #actions>
      <button v-permission="'role:create'" type="button" class="primary-link">新增配置</button>
      <button type="button" class="secondary-link">刷新缓存</button>
    </template>

    <section class="query-panel" aria-label="系统配置查询区">
      <label>
        配置名称
        <input v-model="query.keyword" type="text" placeholder="请输入配置名称" />
      </label>
      <label>
        配置类型
        <select v-model="query.type">
          <option value="">全部类型</option>
          <option value="menu">菜单配置</option>
          <option value="system">系统参数</option>
          <option value="permission">权限配置</option>
        </select>
      </label>
      <button type="button" class="primary-link" @click="loadConfigList">查询</button>
      <button type="button" class="secondary-link" @click="resetQuery">重置</button>
    </section>

    <section class="table-placeholder" aria-label="系统配置表格区">
      <div class="table-header">
        <span>配置名称</span>
        <span>配置类型</span>
        <span>更新时间</span>
        <span>操作</span>
      </div>
      <div v-if="configList.length > 0" class="table-body">
        <div v-for="config in configList" :key="config.id" class="table-row">
          <span>{{ config.name }}</span>
          <span>{{ configTypeText[config.type] }}</span>
          <span>{{ config.updatedAt }}</span>
          <span>
            <button v-permission="'role:update'" type="button" class="table-action">编辑</button>
          </span>
        </div>
      </div>
      <p v-else class="table-state">暂无系统配置数据</p>
    </section>
  </PageContainer>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import PageContainer from '@/components/PageContainer.vue'

type SystemConfigType = 'menu' | 'system' | 'permission'

interface SystemConfigQueryForm {
  keyword: string
  type: '' | SystemConfigType
}

interface SystemConfigInfo {
  id: number
  name: string
  type: SystemConfigType
  updatedAt: string
}

const configTypeText: Record<SystemConfigType, string> = {
  menu: '菜单配置',
  system: '系统参数',
  permission: '权限配置'
}

const query = reactive<SystemConfigQueryForm>({
  keyword: '',
  type: ''
})

const initialConfigList: SystemConfigInfo[] = [
  {
    id: 1,
    name: '后台菜单结构',
    type: 'menu',
    updatedAt: '2026-05-26'
  },
  {
    id: 2,
    name: '登录安全策略',
    type: 'system',
    updatedAt: '2026-05-25'
  },
  {
    id: 3,
    name: '角色权限模板',
    type: 'permission',
    updatedAt: '2026-05-24'
  }
]

const configList = ref<SystemConfigInfo[]>(initialConfigList)

function loadConfigList() {
  const keyword = query.keyword.trim()

  configList.value = initialConfigList.filter((config) => {
    const isKeywordMatched = keyword === '' || config.name.includes(keyword)
    const isTypeMatched = query.type === '' || config.type === query.type

    return isKeywordMatched && isTypeMatched
  })
}

function resetQuery() {
  query.keyword = ''
  query.type = ''
  configList.value = initialConfigList
}
</script>

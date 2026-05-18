<template>
  <PageContainer
    title="用户管理"
    description="用于承载后台用户、角色归属和账号状态维护。"
  >
    <section class="query-panel" aria-label="用户查询区">
      <label>
        用户名称
        <input
          v-model="query.username"
          type="text"
          placeholder="请输入用户名称"
        />
      </label>
      <label>
        账号状态
        <select v-model="query.status">
          <option value="">全部状态</option>
          <option value="enabled">启用</option>
          <option value="disabled">禁用</option>
        </select>
      </label>
      <button type="button" class="primary-link" @click="loadUserList">
        查询
      </button>
      <button type="button" class="secondary-link" @click="resetQuery">
        重置
      </button>
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
      <p v-if="loading" class="table-state">用户数据加载中...</p>
      <div v-else-if="errorMessage" class="table-state table-error">
        <span>{{ errorMessage }}</span>
        <button type="button" class="table-action" @click="loadUserList">
          重试
        </button>
      </div>
      <!-- users 来自 getUserList，模板中 ref 会自动解包，所以这里直接使用 users。 -->
      <div v-else-if="users.length > 0" class="table-body">
        <div v-for="user in users" :key="user.id" class="table-row">
          <span>{{ user.nickname ?? user.username }}</span>
          <span>{{ formatUserRole(user.role) }}</span>
          <span>
            <span class="status-pill" :class="`status-pill--${user.status}`">
              {{ formatUserStatus(user.status) }}
            </span>
          </span>
          <span>
            <button type="button" class="table-action">编辑</button>
          </span>
        </div>
      </div>
      <p v-else class="table-state">暂无用户数据</p>
    </section>
  </PageContainer>
</template>

<script setup lang="ts">
import PageContainer from "../components/PageContainer.vue";
import { reactive, ref, onMounted } from "vue";
import { getUserList } from "@/api/modules/user";
import type { UserInfo, UserListQuery, UserStatus } from "@/types/user";

const users = ref<UserInfo[]>([]);
const loading = ref(false);
const errorMessage = ref("");

// 查询表单使用页面状态承载，再转换成接口需要的 UserListQuery。
const query = reactive<{
  username: string;
  status: "" | UserStatus;
}>({
  username: "",
  status: "",
});

onMounted(async () => {
  await loadUserList();
});

async function loadUserList() {
  // 接口层返回 ApiResponse<UserInfo[]>，这里把 data 赋给页面状态。
  try {
    loading.value = true;
    errorMessage.value = "";

    const params: UserListQuery = {
      username: query.username.trim() || undefined,
      status: query.status || undefined,
    };
    const res = await getUserList(params);
    users.value = res.data;
  } catch (error: unknown) {
    users.value = [];
    errorMessage.value = getErrorMessage(error);
  } finally {
    loading.value = false;
  }
}

function resetQuery() {
  query.username = "";
  query.status = "";
  void loadUserList();
}

// 状态显示中文
function formatUserStatus(status: UserInfo["status"]) {
  return status === "enabled" ? "启用" : "禁用";
}

// 职责展示中文
function formatUserRole(role: UserInfo["role"]) {
  const roleMap: Record<UserInfo["role"], string> = {
    admin: "管理员",
    manager: "经理",
    staff: "员工",
  };
  return roleMap[role];
}

function getErrorMessage(error: unknown) {
  if (
    typeof error === "object" &&
    error !== null &&
    "message" in error &&
    typeof error.message === "string"
  ) {
    return error.message;
  }

  return "用户列表加载失败，请稍后重试";
}
</script>

<template>
  <PageContainer
    title="用户管理"
    description="用于承载后台用户、角色归属和账号状态维护。"
  >
    <template #actions>
      <button
        type="button"
        class="primary-link"
        @click="openCreate"
        v-permission="'user:create'"
      >
        新增用户
      </button>
      <button
        type="button"
        class="secondary-link"
        v-permission="'user:assign-role'"
      >
        分配角色
      </button>
    </template>

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
            <StatusTag
              :text="userStatusText[user.status]"
              :color="userStatusColor[user.status]"
            />
          </span>
          <span>
            <button
              v-permission="'user:update'"
              type="button"
              class="table-action"
              @click="openEdit(user)"
            >
              编辑
            </button>
          </span>
        </div>
      </div>
      <p v-else class="table-state">暂无用户数据</p>
    </section>

    <!-- 分页区 -->
    <div class="pagination-bar">
      <button
        type="button"
        class="secondary-link"
        :disabled="currentPage <= 1"
        @click="
          setPage(currentPage - 1);
          loadUserList();
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
          loadUserList();
        "
      >
        下一页
      </button>
    </div>

    <!-- modal框 -->
    <div v-if="visible" class="modal-mask">
      <div class="modal-panel">
        <h3>{{ mode === "create" ? "新增用户" : "编辑用户" }}</h3>

        <p v-if="current">
          当前用户：{{ current.nickname ?? current.username }}
        </p>
        <p v-else>当前为新增用户</p>

        <button type="button" class="secondary-link" @click="close">
          关闭
        </button>
      </div>
    </div>
  </PageContainer>
</template>

<script setup lang="ts">
import { reactive, ref, onMounted } from "vue";
import PageContainer from "../components/PageContainer.vue";
import StatusTag from "@/components/StatusTag.vue";
import { getUserList } from "@/api/modules/user";
import { userStatusText, userStatusColor } from "@/constants/status";
import type { UserInfo, UserListQuery, UserStatus } from "@/types/user";
import { useModal } from "@/composables/useModal";
import { useLoading } from "@/composables/useLoading";
import { usePagination } from "@/composables/usePagination";

const users = ref<UserInfo[]>([]);
const errorMessage = ref("");

const { visible, mode, current, openCreate, openEdit, close } =
  useModal<UserInfo>();
const { currentPage, pageSize, total, totalPages, setPage, setTotal, reset } =
  usePagination(1, 10);
const { loading, start, stop } = useLoading();

// 查询表单使用页面状态承载，再转换成接口需要的 UserListQuery。
// 筛选区的“全部状态”一般是空字符串，但接口参数里的状态应该是 UserStatus
interface UserQueryForm {
  username: string;
  status: "" | UserStatus;
}
const query = reactive<UserQueryForm>({
  username: "",
  status: "",
});

onMounted(async () => {
  await loadUserList();
});

async function loadUserList() {
  // 接口层返回 ApiResponse<PageResult<UserInfo>>，这里把分页结果中的 list 赋给页面状态。
  try {
    start();
    errorMessage.value = "";

    const params: UserListQuery = {
      username: query.username.trim() || undefined,
      status: query.status || undefined,
      page: currentPage.value,
      pageSize: pageSize.value,
    };
    const res = await getUserList(params);
    users.value = res.data.list;
    setTotal(res.data.total);
  } catch (error: unknown) {
    users.value = [];
    errorMessage.value = getErrorMessage(error);
  } finally {
    stop();
  }
}

function resetQuery() {
  query.username = "";
  query.status = "";
  reset();
  void loadUserList();
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

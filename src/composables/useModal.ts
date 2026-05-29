/*
 * @Description: 方法应该围绕状态提供明确动作。
 * @Author: zhaoyang.sun@proinnova.com.cn
 * @Date: 2026-05-29 16:54:31
 */
import { ref } from "vue";

type ModalMode = "create" | "edit";

export function useModal<T>() {
  const visible = ref(false);
  const mode = ref<ModalMode>("create");
  const current = ref<T | null>(null);

  // 方法命名建议用动作词
  const openCreate = () => {
    mode.value = "create";
    current.value = null;
    visible.value = true;
  };

  const openEdit = (record: T) => {
    mode.value = "edit";
    current.value = record;
    visible.value = true;
  };

  const close = () => {
    visible.value = false;
  };

  return {
    visible,
    mode,
    current,
    openCreate,
    openEdit,
    close,
  };
}

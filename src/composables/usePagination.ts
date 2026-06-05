/*
 * @Description: 分页状态
    返回 ref，而不是直接返回普通值
    不要在 composable 里直接操作模板
    不要把所有状态都塞进一个巨大 reactive 对象
    外部需要改的状态可以暴露，内部状态可以隐藏
 * @Author: zhaoyang.sun@proinnova.com.cn
 * @Date: 2026-05-29 16:46:28
 */
import { ref, computed } from 'vue'

export function usePagination(initialPage = 1, initialPageSize = 10) {
  const currentPage = ref(initialPage)
  const pageSize = ref(initialPageSize)
  const total = ref(0)

  const totalPages = computed(() => {
    return Math.ceil(total.value / pageSize.value)
  })

  const setPage = (page: number) => {
    currentPage.value = page
  }

  const setPageSize = (size: number) => {
    pageSize.value = size
    currentPage.value = 1
  }

  const setTotal = (value: number) => {
    total.value = value
  }

  const reset = () => {
    currentPage.value = initialPage
    pageSize.value = initialPageSize
  }

  return {
    // 返回 ref，而不是直接返回普通值
    currentPage,
    pageSize,
    total,
    totalPages,
    setPage,
    setTotal,
    reset,
    setPageSize
  }
}

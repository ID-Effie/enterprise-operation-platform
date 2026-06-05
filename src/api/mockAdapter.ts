import { AxiosError } from 'axios'
import type { AxiosAdapter, AxiosResponse } from 'axios'

// 专门用 Axios adapter 模拟后端响应
export function createMockAdapter<TData>(status: number, data: TData, delay = 300): AxiosAdapter {
  return async (config) => {
    await new Promise((resolve) => window.setTimeout(resolve, delay))

    const response: AxiosResponse<TData> = {
      data,
      status,
      statusText: String(status),
      headers: {},
      config
    }

    if (status >= 200 && status < 300) {
      return response
    }

    throw new AxiosError(
      `Request failed with status code ${status}`,
      undefined,
      config,
      undefined,
      response
    )
  }
}

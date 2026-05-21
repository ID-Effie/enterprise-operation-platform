import type { ApiResponse, ApiError } from "@/types/common";
import type { AxiosRequestConfig } from "axios";

/**  Axios 实际响应是：
 * {
  data: {
    code: 0,
    message: 'success',
    data: {
      id: 1,
      name: 'Tom'
    }
  },
  status: 200,
  statusText: 'OK',
  headers: {},
  config: {}
}
 */

/**
 * RequestConfig 拥有 Axios 原本的所有请求配置属性，再额外加上你自己项目里的 showLoading、showError。
 * {
  url?: string
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH' | ...
  baseURL?: string
  headers?: object
  params?: any    URL 查询参数
  data?: any     请求体 body
  timeout?: number
  withCredentials?: boolean
  responseType?: 'json' | 'text' | 'blob' | 'arraybuffer' | ...
  onUploadProgress?: (event) => void
  onDownloadProgress?: (event) => void
  signal?: AbortSignal
}
 */
export interface RequestConfig extends AxiosRequestConfig {
  showLoading?: boolean;
  showError?: boolean;
}

export interface MockRequestConfig<T> extends RequestConfig {
  // mockData 表示这次接口成功时返回的 data 数据。
  mockData: T;
  // success 用来控制这次 mock 请求成功还是失败。
  success?: boolean;
  // 自定义返回信息，不传时根据 success 自动生成。
  message?: string;
  // 模拟接口耗时，单位是毫秒。
  delay?: number;
}

// request 是所有接口的统一请求入口。
// 返回 Promise<ApiResponse<T>>，表示异步请求结束后会得到统一格式的响应。
export async function request<T>(
  config: MockRequestConfig<T>,
): Promise<ApiResponse<T>> {
  // 这里使用默认值，让调用方只传必要参数即可。
  const {
    url,
    method = "GET",
    mockData,
    success = true,
    message = success ? "请求成功" : "请求失败",
    delay = 500,
  } = config;

  console.log(`[mock request] ${method} ${url}`);

  return new Promise((resolve, reject) => {
    // 用 setTimeout 模拟真实接口请求需要等待一段时间。
    window.setTimeout(() => {
      const response: ApiResponse<T> = {
        code: success ? 0 : 500,
        message,
        data: mockData,
      };

      if (success) {
        // resolve 表示请求成功，外部可以通过 await 或 then 拿到结果。
        resolve(response);
        return;
      }

      const error: ApiError = {
        code: response.code,
        message: response.message,
      };
      reject(error);
    }, delay);
  });
}

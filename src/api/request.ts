// 后端接口统一返回结构。
// T 是泛型，表示 data 字段的具体类型由调用接口时决定。
export interface ApiResponse<T> {
  code: number;
  message: string;
  data: T;
}

// 当前项目还没有真实后端，所以这里先定义 mock 请求需要的参数。
interface MockRequestOptions<T> {
  // 请求地址，例如 /auth/login、/user/info。
  url: string;
  // 请求方法，不传时默认使用 GET。
  method?: "GET" | "POST" | "PUT" | "DELETE";
  // 请求参数，暂时只记录下来，后面接真实接口时会真正传给后端。
  data?: unknown;
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
export function request<T>(options: MockRequestOptions<T>): Promise<ApiResponse<T>> {
  // 这里使用默认值，让调用方只传必要参数即可。
  const {
    url,
    method = "GET",
    mockData,
    success = true,
    message = success ? "请求成功" : "请求失败",
    delay = 500,
  } = options;

  console.log(`[mock request] ${method} ${url}`);

  return new Promise((resolve, reject) => {
    // 用 setTimeout 模拟真实接口请求需要等待一段时间。
    window.setTimeout(() => {
      const response: ApiResponse<T> = {
        code: success ? 200 : 500,
        message,
        data: mockData,
      };

      if (success) {
        // resolve 表示请求成功，外部可以通过 await 或 then 拿到结果。
        resolve(response);
      } else {
        // reject 表示请求失败，外部可以通过 try/catch 或 catch 捕获错误。
        reject(response);
      }
    }, delay);
  });
}

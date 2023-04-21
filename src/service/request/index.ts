import axios from "axios"
import type { AxiosInstance } from "axios"
import type { Interceptors, RequestConfig } from "./type"

class Request {
  instance: AxiosInstance
  interceptors?: Interceptors
  showLoading?: boolean

  constructor(config: RequestConfig) {
    this.instance = axios.create(config)
    this.interceptors = config.interceptors

    //创建实例传入的过滤器
    this.instance.interceptors.request.use(
      this.interceptors?.requestInterceptor,
      this.interceptors?.requestInterceptorCatch
    )

    //创建实例传入的过滤器
    this.instance.interceptors.response.use(
      this.interceptors?.responseInterceptor,
      this.interceptors?.responseInterceptorCatch
    )

    //所有实例都经过的过滤器
    this.instance.interceptors.request.use(
      (config) => {
        return config
      },
      (err) => {
        return err
      }
    )

    //所有实例都经过的过滤器
    this.instance.interceptors.response.use(
      (res) => {
        return res.data
      },
      (err) => {
        return err
      }
    )
  }

  request<T>(config: RequestConfig): Promise<T> {
    return new Promise((resolve, reject) => {
      //单独请求传入的过滤器
      this.instance.interceptors.request.use(
        config.interceptors?.requestInterceptor,
        config.interceptors?.requestInterceptorCatch
      )

      //单独请求传入的过滤器
      this.instance.interceptors.response.use(
        config.interceptors?.responseInterceptor,
        config.interceptors?.responseInterceptorCatch
      )

      this.instance
        .request<any, T>(config)
        .then((res) => {
          resolve(res)
        })
        .catch((err) => {
          reject(err)
        })
    })
  }

  get<T>(config: RequestConfig): Promise<T> {
    return this.request<T>({ ...config, method: "GET" })
  }

  post<T>(config: RequestConfig): Promise<T> {
    return this.request<T>({ ...config, method: "POST" })
  }

  delete<T>(config: RequestConfig): Promise<T> {
    return this.request<T>({ ...config, method: "DELETE" })
  }

  patch<T>(config: RequestConfig): Promise<T> {
    return this.request<T>({ ...config, method: "PATCH" })
  }
}

export default Request

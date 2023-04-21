import type { AxiosRequestConfig, AxiosResponse } from "axios"

interface Interceptors {
  requestInterceptor?: (config: any) => any
  requestInterceptorCatch?: (error: any) => any
  responseInterceptor?: (res: AxiosResponse) => AxiosResponse
  responseInterceptorCatch?: (error: any) => any
}
interface RequestConfig extends AxiosRequestConfig {
  interceptors?: Interceptors
}

export type { Interceptors, RequestConfig }

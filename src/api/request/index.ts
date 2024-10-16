import axios from "axios";
import type { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";
// import useGlobalLoadingStore from "@/stores/loading";
let globalLoadingStore: any = null;

interface JHInstanceInterceptors<T = AxiosResponse> {
  requestInterceptor?: (config: AxiosRequestConfig) => AxiosRequestConfig;
  requestInterceptorCatch?: (err: any) => any;
  responseInterceptor?: (res: T) => T;
  responseInterceptorCatch?: (err: any) => any;
}

interface JHRequestConfig<T = AxiosResponse> extends AxiosRequestConfig {
  interceptors?: JHInstanceInterceptors<T>;
}

class JHRequest {
  instance: AxiosInstance;
  constructor(config: JHRequestConfig) {
    this.instance = axios.create(config);
    // 全局的拦截器
    this.instance.interceptors.request.use(
      config => {
        this.addLoading(config);
        return config;
      },
      err => {
        return err;
      }
    );

    this.instance.interceptors.response.use(
      res => {
        this.delLoading(res);
        return res.data;
      },
      err => {
        this.delLoading(err);
        return err;
      }
    );

    // 实例的拦截器
    this.instance.interceptors.request.use(
      config.interceptors?.requestInterceptor as any,
      config.interceptors?.requestInterceptorCatch
    );
    this.instance.interceptors.response.use(
      config.interceptors?.responseInterceptor,
      config.interceptors?.responseInterceptorCatch
    );
  }
  //单个接口请求如果传递了请求拦截，在此处填入。可提供给每个接口的一个自定义请求拦截
  request<T = any>(config: JHRequestConfig<T>) {
    if (config.interceptors?.requestInterceptor) {
      config = config.interceptors.requestInterceptor(config);
    }

    return new Promise<T>((resolve, reject) => {
      this.instance
        .request<any, T>(config)
        .then(res => {
          if (config.interceptors?.responseInterceptor) {
            res = config.interceptors.responseInterceptor(res);
          }
          resolve(res);
        })
        .catch((err: any) => {
          if (config.interceptors?.responseInterceptorCatch) {
            err = config.interceptors.responseInterceptorCatch(err);
          }
          reject(err);
        });
    });
  }
  addLoading(config: any) {
    if (globalLoadingStore === null) {
      // globalLoadingStore = useGlobalLoadingStore();
    }
    if (config.headers.loading && config.headers.loading === "none") {
      return;
    }
    // globalLoadingStore.add_pageLoading();
  }
  delLoading(res: any) {
    if (globalLoadingStore === null) {
      // globalLoadingStore = useGlobalLoadingStore();
    }
    if (res.config.headers.loading && res.config.headers.loading === "none") {
      return;
    }
    // globalLoadingStore.del_pageLoading();
  }
  get<T = any>(config: JHRequestConfig<T>) {
    return this.request<T>({ ...config, method: "GET" });
  }

  post<T = any>(config: JHRequestConfig<T>) {
    return this.request<T>({ ...config, method: "POST" });
  }

  delete<T = any>(config: JHRequestConfig<T>) {
    return this.request<T>({ ...config, method: "DELETE" });
  }

  patch<T = any>(config: JHRequestConfig<T>) {
    return this.request<T>({ ...config, method: "PATCH" });
  }

  put<T = any>(config: JHRequestConfig<T>) {
    return this.request<T>({ ...config, method: "PUT" });
  }
}

export default JHRequest;

import JHRequest from "./request";

export const appRequest = new JHRequest({
  baseURL: "/",
  timeout: 300000,
  withCredentials: true, //表示跨域请求时是否需要使用凭证
  responseType: "json", //表示服务器响应的数据类型，可以是 'arraybuffer', 'blob', 'document', 'json', 'text', 'stream'
  responseEncoding: "utf8",
  transformRequest: [
    function (data, headers) {
      let d = undefined;
      if (
        headers &&
        headers["Content-Type"] ==
          "application/x-www-form-urlencoded;charset=UTF-8"
      ) {
        console.log(123);
        // d = data
      } else if (
        headers &&
        headers["Content-Type"] == "application/x-www-form-urlencoded"
      ) {
        d = data;
      } else if (headers && headers["Content-Type"] == "multipart/form-data") {
        d = data;
      } else {
        d = JSON.stringify(data); //json格式序列化
      }
      return d;
    }
  ],
  headers: {
    "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"
  },
  interceptors: {
    requestInterceptor: config => {
      config.url = `/api/appform${config.url}`;
      return config;
    },
    requestInterceptorCatch: err => {
      return err;
    },
    responseInterceptor: res => {
      return res;
    },
    responseInterceptorCatch: err => {
      return err;
    }
  }
});

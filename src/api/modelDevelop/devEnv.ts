import { http } from "@/utils/http";

export type envResult = {
  success: boolean;
  data: {
    /** 头像 */
    avatar: string;
    /** 用户名 */
    username: string;
    /** 昵称 */
    nickname: string;
    /** 当前登录用户的角色 */
    roles: Array<string>;
    /** 按钮级别权限 */
    permissions: Array<string>;
    /** `token` */
    accessToken: string;
    /** 用于调用刷新`accessToken`的接口时所需的`token` */
    refreshToken: string;
    /** `accessToken`的过期时间（格式'xxxx/xx/xx xx:xx:xx'） */
    expires: Date;
  };
};

export type RefreshTokenResult = {
  success: boolean;
  data: {
    /** `token` */
    accessToken: string;
    /** 用于调用刷新`accessToken`的接口时所需的`token` */
    refreshToken: string;
    /** `accessToken`的过期时间（格式'xxxx/xx/xx xx:xx:xx'） */
    expires: Date;
  };
};

/** 查询开发环境列表 */
export const getEnvList = () => {
  return http.request<any>("post", `/jhai/devCenter/list`);
};

/** 停止环境 */
export const stop = (data?: object) => {
  return http.request<any>("post", "/jhai/devCenter/stop", {
    data
  });
};

/** 启动环境 */
export const start = (data?: object) => {
  return http.request<any>("post", "/jhai/devCenter/start", {
    data
  });
};

/** 删除环境 */
export const deleteEnv = (data?: object) => {
  return http.request<any>("post", "/jhai/devCenter/delete?deleteImage=", {
    data
  });
};

export function getUserAuthor() {
  return http.request("get", `/login/info`);
}

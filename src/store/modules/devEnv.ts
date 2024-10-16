import { defineStore } from "pinia";
import { store, storageLocal } from "../utils";
import {
  getEnvList,
  add,
  stop,
  start,
  save,
  deleteEnv,
  getNameSpace
} from "@/api/modelDevelop/devEnv";
import { type DataInfo, userKey } from "@/utils/auth";

export const useEnvStore = defineStore({
  id: "jhai-env",
  state: (): any => ({
    // 头像
    avatar: storageLocal().getItem<DataInfo<number>>(userKey)?.avatar ?? "",
    // 用户名
    username: storageLocal().getItem<DataInfo<number>>(userKey)?.username ?? "",
    // 昵称
    nickname: storageLocal().getItem<DataInfo<number>>(userKey)?.nickname ?? "",
    // 页面级别权限
    roles: storageLocal().getItem<DataInfo<number>>(userKey)?.roles ?? [],
    // 按钮级别权限
    mounts: [],
    // 是否勾选了登录页的免登录
    curEnv: {},
    // 登录页的免登录存储几天，默认7天
    loginDay: 7
  }),
  actions: {
    /** 存储头像 */
    SET_AVATAR(avatar: string) {
      this.avatar = avatar;
    },
    /** 存储用户名 */
    SET_USERNAME(username: string) {
      this.username = username;
    },
    /** 存储昵称 */
    SET_NICKNAME(nickname: string) {
      this.nickname = nickname;
    },
    /** 存储角色 */
    SET_ROLES(roles: Array<string>) {
      this.roles = roles;
    },
    /** 存储按钮级别权限 */
    SET_MOUNTS(mounts: Array<string>) {
      this.mounts = mounts;
    },
    /** 存储是否勾选了登录页的免登录 */
    SET_CURENV(env: any) {
      this.curEnv = env;
    },
    /** 设置登录页的免登录存储几天 */
    SET_LOGINDAY(value: number) {
      this.loginDay = Number(value);
    },
    /** 登入 */
    async getEnv() {
      return new Promise<any>((resolve, reject) => {
        getEnvList()
          .then(data => {
            resolve(data);
          })
          .catch(error => {
            reject(error);
          });
      });
    },
    /** 创建 */
    async createEnv(data) {
      return new Promise<any>((resolve, reject) => {
        add(data)
          .then(data => {
            resolve(data);
          })
          .catch(error => {
            reject(error);
          });
      });
    },
    /** 停止 */
    async stopEnv(data) {
      return new Promise<any>((resolve, reject) => {
        stop(data)
          .then(data => {
            resolve(data);
          })
          .catch(error => {
            reject(error);
          });
      });
    },
    /** 启动 */
    async startEnv(data) {
      return new Promise<any>((resolve, reject) => {
        start(data)
          .then(data => {
            resolve(data);
          })
          .catch(error => {
            reject(error);
          });
      });
    },
    /** 保存镜像 */
    async saveImage(data) {
      return new Promise<any>((resolve, reject) => {
        save(data)
          .then(data => {
            resolve(data);
          })
          .catch(error => {
            reject(error);
          });
      });
    },
    /** 删除 */
    async deleteDevEnv(data) {
      return new Promise<any>((resolve, reject) => {
        deleteEnv(data)
          .then(data => {
            resolve(data);
          })
          .catch(error => {
            reject(error);
          });
      });
    },
    /** 获取命名空间 */
    async queryNameSpace() {
      return new Promise<any>((resolve, reject) => {
        getNameSpace()
          .then(data => {
            resolve(data);
          })
          .catch(error => {
            reject(error);
          });
      });
    }
  }
});

export function useEnvStoreHook() {
  return useEnvStore(store);
}

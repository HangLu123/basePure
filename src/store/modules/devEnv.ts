import { defineStore } from "pinia";
import { store } from "../utils";
import {
  getEnvList,
  add,
  stop,
  start,
  save,
  deleteEnv,
  getNameSpace
} from "@/api/modelDevelop/devEnv";

export const useEnvStore = defineStore({
  id: "jhai-env",
  state: (): any => ({
    mounts: [],
    curEnv: {}
  }),
  actions: {
    /** 存储挂载 */
    SET_MOUNTS(mounts: Array<string>) {
      this.mounts = mounts;
    },
    /** 存储当前环境信息 */
    SET_CURENV(env: any) {
      this.curEnv = env;
    },
    /** 查询环境列表 */
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

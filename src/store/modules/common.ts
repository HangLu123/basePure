import { defineStore } from "pinia";
import { store } from "../utils";

export const useCommonStore = defineStore({
  id: "ai-common",
  state: (): any => ({
    showFileChoose: false
    // 浏览器窗口的可视区域大小
  }),
  actions: {
    toggleShowFileChoose(showFileChoose: boolean) {
      this.showFileChoose = showFileChoose;
    }
  }
});

export function useCommonStoreHook() {
  return useCommonStore(store);
}

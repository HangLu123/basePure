<template>
  <el-dialog
    v-model="useCommonStoreHook().showFileChoose"
    width="1300"
    :title="t('common.button.preview')"
  >
    <ChooseFile
      v-if="useCommonStoreHook().showFileChoose"
      ref="chooseFileRef"
      :requestInstall="appRequest"
      :user="loginUserName"
      :language="languageType"
    />
    <template #footer>
      <el-button @click="cancelChooseFile">{{
        t("common.button.cancel")
      }}</el-button>
      <el-button @click="getChooseFile">{{
        t("common.button.submit")
      }}</el-button>
    </template>
  </el-dialog>
</template>
<script setup lang="ts" name="fileDialog">
import { appRequest } from "@/api/index";
import { languageType } from "@/utils/language-set";
import { ref, computed } from "vue";
import { useI18n } from "vue-i18n";
const { t } = useI18n();
import { useCommonStoreHook } from "@/store/modules/common";
import { ElMessage } from "element-plus";
const emit = defineEmits<{
  (e: "update-dataList", path: string): void;
}>();
const chooseFileRef = ref();
let loginUserName = "jhadmin";
const cookie = document.cookie.split("; ");
cookie.forEach(item => {
  if (item.startsWith("logonUser=")) {
    loginUserName = item.split("=")[1];
  }
});
/**
 * 取消选择
 */
function cancelChooseFile() {
  useCommonStoreHook().toggleShowFileChoose(false);
}

/**
 * 获取选择的文件
 */
const getChooseFile = async () => {
  const files = chooseFileRef.value.getChoosePath();
  if (files && files.length == 1) {
    if (files[0].mime !== "directory") {
      ElMessage("请选择文件夹。");
      return;
    }
    emit("update-dataList", files[0].canonicalPath);
    useCommonStoreHook().toggleShowFileChoose(false);
  }
};
</script>
<style lang="less" scoped></style>

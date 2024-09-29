<script setup lang="ts">
import { useI18n } from "vue-i18n";
const { t } = useI18n();
import { useRouter } from "vue-router";
import { ref, reactive, toRaw, onMounted, onBeforeUnmount } from "vue";
const router = useRouter();
import { useTranslationLang } from "@/layout/hooks/useTranslationLang";
import { useUserStoreHook } from "@/store/modules/user";
import { languageType } from "@/utils/language-set";
import { localForage } from "@/utils/localforage";
const { translationCh, translationEn } = useTranslationLang();
if (languageType == "zh") {
  translationCh();
} else {
  translationEn();
}
defineOptions({
  name: "Welcome"
});
const addModel = () => {
  localForage().setItem("name", "leon");
  router.push("/model/create");
};
const goDetail = () => {
  router.push("/model/detail");
};
const tableData = [
  {
    date: "2016-05-03",
    name: "Tom",
    address: "No. 189, Grove St, Los Angeles"
  },
  {
    date: "2016-05-02",
    name: "Tom",
    address: "No. 189, Grove St, Los Angeles"
  },
  {
    date: "2016-05-04",
    name: "Tom",
    address: "No. 189, Grove St, Los Angeles"
  },
  {
    date: "2016-05-01",
    name: "Tom",
    address: "No. 189, Grove St, Los Angeles"
  }
];

onMounted(() => {
  useUserStoreHook()
    .getNameSpace()
    .then((res: any) => {});
});
</script>

<template>
  <h1>{{ t("aiWealth.dataSet.name") }}</h1>
  <el-button @click="goDetail">打开详情页 </el-button>
  <el-button @click="addModel">新建模型 </el-button>
  <el-table :data="tableData" style="width: 100%">
    <el-table-column prop="date" label="Date" width="180" />
    <el-table-column prop="name" label="Name" width="180" />
    <el-table-column prop="address" label="Address" />
  </el-table>
</template>

<script setup lang="ts">
import { useI18n } from "vue-i18n";
const { t } = useI18n();
import { useRouter } from "vue-router";
const router = useRouter();
import { useTranslationLang } from "@/layout/hooks/useTranslationLang";
import { languageType } from "@/utils/language-set";
const { translationCh, translationEn } = useTranslationLang();
if (languageType == "zh") {
  translationCh();
} else {
  translationEn();
}
defineOptions({
  name: "Welcome"
});
const goDetail = () => {
  router.push("/detail");
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
</script>

<template>
  <h1>{{ t("login.pureUsername") }}</h1>
  <el-button @click="goDetail">打开详情页 </el-button>
  <el-table :data="tableData" style="width: 100%">
    <el-table-column prop="date" label="Date" width="180" />
    <el-table-column prop="name" label="Name" width="180" />
    <el-table-column prop="address" label="Address" />
  </el-table>
</template>

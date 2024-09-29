<script setup lang="ts">
import { useI18n } from "vue-i18n";
const { t } = useI18n();
import { useRouter } from "vue-router";
const router = useRouter();
defineOptions({
  name: "Welcome"
});
const goDetail = () => {
  router.push("/model");
};
</script>

<template>
  <h1>{{ t("login.pureUsername") }}</h1>
  <h1>新建模型</h1>
  <el-button @click="goDetail">返回列表页 </el-button>
</template>

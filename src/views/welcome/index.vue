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
const goPermisstion = () => {
  router.push("/permission");
};
</script>

<template>
  <h1>{{ t("login.pureUsername") }}</h1>
  <el-button @click="goPermisstion">123</el-button>
</template>

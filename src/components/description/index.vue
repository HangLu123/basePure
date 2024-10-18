<template>
  <div class="show-info bg-white p-4 rounded shadow-sm flex flex-col">
    <el-descriptions
      v-for="(config, i) in props.detailInfo"
      :key="i"
      :title="config.label"
      :column="config.column || 3"
      class="mb-8"
    >
      <el-descriptions-item
        v-for="(param, index) in config.value"
        :key="index"
        label-class-name="font-medium text-gray-700"
        class="px-4"
      >
        <template #label>
          <el-text class="w-52 inline-block">{{ param.label }}</el-text>
        </template>
        <template #default>
          <span v-if="!param.type">{{ param.value }}</span>
          <span v-if="param.type && param.type === 'copy'">
            {{ param.value }}
            <span
              class="inline-block ml-2 cursor-pointer"
              @click="copy(param.value)"
            >
              <IconifyIconOffline
                :icon="Copy"
                class="text-primary w-[16px] h-[16px]"
            /></span>
          </span>
          <span v-if="param.type && param.type === 'password'">
            <el-text v-if="showPassword">{{ param.value }}</el-text>
            <el-text v-else>******</el-text>
            <span
              class="inline-block ml-2 cursor-pointer"
              @click="showPassword = !showPassword"
            >
              <IconifyIconOffline
                :icon="showPassword ? Eye : EyeOff"
                class="w-[12px] h-[12px]"
            /></span>
            <span
              class="inline-block ml-2 cursor-pointer"
              @click="copy(param.value)"
            >
              <IconifyIconOffline
                :icon="Copy"
                class="text-primary w-[16px] h-[16px]"
            /></span>
          </span>
          <span v-if="param.type && param.type === 'dataSet'">
            <a
              v-for="(dataSet, index) in props.detailInfo.dataSets"
              :key="index"
              class="text-blue-600 cursor-pointer"
              @click="view(dataSet.pathSql)"
            >
              {{ dataSet.name
              }}<span v-if="index < props.detailInfo.dataSets.length - 1"
                >,
              </span>
            </a>
          </span>
        </template>
      </el-descriptions-item>
    </el-descriptions>
  </div>
</template>

<script setup lang="ts" name="showInfo">
import dayjs from "dayjs";
// import { getDataFile } from "@/service/job/workRequest";
import { computed, ref } from "vue";
// import useGlobalLoadingStore from "@/stores/loading";
import Copy from "@iconify-icons/ep/copy-document";
import Eye from "@iconify-icons/ri/eye-line";
import EyeOff from "@iconify-icons/ri/eye-off-line";

import { useI18n } from "vue-i18n";
import { ElMessage } from "element-plus";
const { t } = useI18n();

const showPassword = ref(false);

const props = defineProps<{
  detailInfo: any;
}>();

const copy = (value: string) => {
  navigator.clipboard.writeText(value);
  ElMessage({
    message: t("common.modal.copySuccess"),
    type: "success"
  });
};

// const globalLoadingStore = useGlobalLoadingStore();
async function view(pathSql: string) {
  // const res = await getDataFile(pathSql);
  // globalLoadingStore.open_iframe(
  //   t("common.modal.preview"),
  //   `/appform/views/fm/elfinder.jsp?isTreeDisabled=1&amp;hideTree=true&amp;selfHeight=528&amp;isInteractive=0&amp;rootDir=${res.data}&amp;isInJHShareBaseElfinder=true`
  // );
}
</script>

<style scoped>
.show-info {
  height: 100%;
  font-family: "Source Han Sans CN", sans-serif;
}
</style>

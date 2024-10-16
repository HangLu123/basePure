<script setup lang="ts">
import { useColumns } from "./columns";
import Empty from "./empty.svg?component";
import { ReText } from "@/components/ReText";
import { useRenderIcon } from "@/components/ReIcon/src/hooks";
import AddFill from "@iconify-icons/ep/plus";
import Delete from "@iconify-icons/ep/minus";
import Origin from "@iconify-icons/ep/folder-opened";

const props = defineProps<Props>();
const { curId, columns, dataList, onAdd, onDel, openFile, updataList } =
  useColumns(props);
import FileDialog from "@/components/fileDialog/index.vue";
import { watch } from "vue";
interface Props {
  modelValue: any;
}

// 基于类型
const emit = defineEmits<{
  (e: "update:modelValue", mounts: any): void;
}>();
watch(
  dataList,
  newV => {
    console.log(2222);
    emit("update:modelValue", newV as any);
  },
  { deep: true }
);
</script>

<template>
  <div class="flex w-full">
    <pure-table
      row-key="id"
      align-whole="center"
      :header-cell-style="{
        background: 'var(--el-fill-color-light)',
        color: 'var(--el-text-color-primary)'
      }"
      :data="dataList"
      :columns="columns"
      :border="false"
    >
      <template #empty>
        <Empty fill="var(--el-svg-monochrome-grey)" class="m-auto" />
      </template>
      <template #name="{ row, index }">
        <el-button class="w-30" :disabled="index < 2" @click="openFile(row)"
          ><span class="flex">
            <IconifyIconOffline
              :icon="Origin"
              class="text-primary w-[24px] h-[16px]"
          /></span>
        </el-button>
        <el-button
          tag="div"
          class="w-4/5 h-full"
          :disabled="index < 2"
          @click="openFile(row, index < 2)"
        >
          <ReText class="flex-1">{{ row.name }}</ReText>
        </el-button>
      </template>
      <template #operation="{ row, index }">
        <el-button
          v-if="index === dataList.length - 1"
          link
          class="reset-margin"
          :icon="useRenderIcon(AddFill)"
          @click="onAdd"
        />
        <el-button
          v-if="index > 1"
          class="reset-margin"
          link
          type="primary"
          :icon="useRenderIcon(Delete)"
          @click="onDel(row)"
        />
      </template>
    </pure-table>
  </div>
  <FileDialog @update-dataList="updataList" />
</template>

<style scoped>
:deep(.el-table__inner-wrapper::before) {
  height: 0;
}
:deep(.el-button > span) {
  width: 100%;
}
.origin {
  background-color: #cfd5de;
}
</style>

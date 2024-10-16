<template>
  <div class="cascader-container">
    <JhResourceCombo
      v-model="resourceCombo"
      v-model:name="resourceComboName"
      v-model:gpuTypeFileter="gpuSpecification"
      :typeList="typeList"
    />
  </div>
</template>
<script setup lang="ts" name="resourceCombo">
import { ref, watch } from "vue";
import { JhResourceCombo } from "jh-web-components";
import "jh-web-components/dist/style.css";

interface Props {
  modelValue: string;
}

const props = defineProps<Props>();
const typeList: any = ref(["CPU", "GPU"]);
const resourceComboName = ref(
  props.modelValue.includes("##") ? props.modelValue.split("##")[2] : ""
);
const resourceCombo = ref(
  props.modelValue.includes("##") ? props.modelValue.split("##")[1] : ""
);
const gpuSpecification = ref(
  props.modelValue.includes("##") ? props.modelValue.split("##")[0] : ""
);

// 基于类型
const emit = defineEmits<{
  (e: "update:modelValue", value: string): void;
}>();

watch(
  resourceCombo,
  (newV: any) => {
    emit(
      "update:modelValue",
      newV
        ? `${gpuSpecification.value}##${newV}##${resourceComboName.value}`
        : ""
    );
  },
  { deep: true, immediate: true }
);
</script>

<style scoped lang="scss">
.cascader-container {
  display: flex;
  width: 100%;
}
</style>

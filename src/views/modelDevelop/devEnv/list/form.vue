<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useEnvStoreHook } from "@/store/modules/devEnv";

// 声明 props 类型
export interface FormProps {
  formInline: {
    image: string;
    namespace: number;
    namespaceList: any;
    version: string;
  };
}

// 声明 props 默认值
// 推荐阅读：https://cn.vuejs.org/guide/typescript/composition-api.html#typing-component-props
const props = withDefaults(defineProps<FormProps>(), {
  formInline: () => ({
    image: "",
    version: "",
    namespace: 0,
    namespaceList: []
  })
});

// vue 规定所有的 prop 都遵循着单向绑定原则，直接修改 prop 时，Vue 会抛出警告。此处的写法仅仅是为了消除警告。
// 因为对一个 reactive 对象执行 ref，返回 Ref 对象的 value 值仍为传入的 reactive 对象，
// 即 newFormInline === props.formInline 为 true，所以此处代码的实际效果，仍是直接修改 props.formInline。
// 但该写法仅适用于 props.formInline 是一个对象类型的情况，原始类型需抛出事件
// 推荐阅读：https://cn.vuejs.org/guide/components/props.html#one-way-data-flow
const newFormInline: any = ref(props.formInline);
const nameSpaceList = ref([]);
onMounted(() => {
  useEnvStoreHook()
    .queryNameSpace()
    .then((res: any) => {
      if (res.isSuccess && res.data.length) {
        newFormInline.value.namespace = res.data[0].id;
        newFormInline.value.namespaceList = nameSpaceList.value = res.data.map(
          (item: any) => {
            return {
              label: item.aliasName,
              value: item.id
            };
          }
        );
      } else {
      }
    })
    .finally();
});
</script>

<template>
  <el-alert
    title="提示：如果镜像名称和版本与已存在镜像相同，则会覆盖已有镜像！"
    type="warning"
  />
  <el-form
    :model="newFormInline"
    label-position="left"
    label-width="auto"
    style="padding: 0 30px"
  >
    <el-form-item label="目标命名空间" class="mt-5">
      <el-select
        v-model="newFormInline.namespace"
        class="!w-[220px]"
        placeholder="请选择命名空间"
      >
        <el-option
          v-for="(space, index) in nameSpaceList"
          :key="index"
          :label="space.label"
          :value="space.value"
        />
      </el-select>
    </el-form-item>
    <el-form-item label="镜像名称">
      <el-input
        v-model="newFormInline.image"
        class="!w-[220px]"
        placeholder="请输入姓名"
      />
    </el-form-item>
    <el-form-item label="版本">
      <el-input
        v-model="newFormInline.version"
        class="!w-[220px]"
        placeholder="请输入姓名"
      />
    </el-form-item>
  </el-form>
</template>

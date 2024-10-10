<script setup lang="ts">
import { ref } from "vue";

// 声明 props 类型
export interface FormProps {
  formInline: {
    user: string;
    region: string;
  };
}

// 声明 props 默认值
// 推荐阅读：https://cn.vuejs.org/guide/typescript/composition-api.html#typing-component-props
const props = withDefaults(defineProps<FormProps>(), {
  formInline: () => ({ user: "", region: "" })
});

// vue 规定所有的 prop 都遵循着单向绑定原则，直接修改 prop 时，Vue 会抛出警告。此处的写法仅仅是为了消除警告。
// 因为对一个 reactive 对象执行 ref，返回 Ref 对象的 value 值仍为传入的 reactive 对象，
// 即 newFormInline === props.formInline 为 true，所以此处代码的实际效果，仍是直接修改 props.formInline。
// 但该写法仅适用于 props.formInline 是一个对象类型的情况，原始类型需抛出事件
// 推荐阅读：https://cn.vuejs.org/guide/components/props.html#one-way-data-flow
const newFormInline = ref(props.formInline);
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
        v-model="newFormInline.region"
        class="!w-[220px]"
        placeholder="请选择命名空间"
      >
        <el-option label="jhinno" value="0" />
      </el-select>
    </el-form-item>
    <el-form-item label="镜像名称">
      <el-input
        v-model="newFormInline.user"
        class="!w-[220px]"
        placeholder="请输入姓名"
      />
    </el-form-item>
    <el-form-item label="版本">
      <el-input
        v-model="newFormInline.user"
        class="!w-[220px]"
        placeholder="请输入姓名"
      />
    </el-form-item>
  </el-form>
</template>

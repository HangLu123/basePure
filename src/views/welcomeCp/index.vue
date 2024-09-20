<script setup lang="ts">
import { useRouter } from "vue-router";
const router = useRouter();
defineOptions({
  name: "WelcomeCp"
});
const goPermisstion = () => {
  router.push("/welcome");
};
</script>

<template>
  <h1>我的镜像</h1>
  <el-button @click="goPermisstion">123</el-button>
</template>

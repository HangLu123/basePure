<script setup lang="ts">
import router from "@/router";
import Back from "@iconify-icons/ep/back";

interface Props {
  home: string;
  link: string;
  title: string;
  pageName?: string;
  myclass?: string;
}

const props = defineProps<Props>();

const linkBack = () => {
  router.go(-1);
};
</script>

<template>
  <div
    class="backNav border-b border-gray-300 p-5 box-border"
    :class="props.myclass ? 'myDetail' : ''"
  >
    <!-- 面包屑导航 -->
    <el-breadcrumb separator="/" class="text-sm">
      <el-breadcrumb-item :to="{ path: props.link }">{{
        props.home
      }}</el-breadcrumb-item>
      <el-breadcrumb-item>{{ props.title }}</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="backBtnContainer flex justify-between items-center">
      <!-- 返回标题部分 -->
      <div class="backNavTitle flex items-center">
        <div
          class="back flex items-center cursor-pointer text-blue-500 hover:text-blue-400 hover:bg-gray-200 rounded-full transition duration-300 ease-linear"
        >
          <IconifyIconOffline
            :icon="Back"
            width="24"
            height="24"
            class="backIcon"
            @click="linkBack"
          />
        </div>
        <el-text class="title ml-4 font-bold text-lg">
          {{ props.pageName || props.title }}</el-text
        >
      </div>
      <div>
        <slot name="detailBtn" />
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.backNav {
  box-sizing: border-box;
  padding: 20px 20px 7px 20px;
  :deep(.ivu-breadcrumb) {
    font-size: 12px;
  }
  .backBtnContainer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .backNavTitle {
      display: flex;
      align-items: center;
      justify-content: flex-start;
      font-family: Source Han Sans CN;
      font-size: 16px;
      font-weight: 500;
      line-height: 17px;
      letter-spacing: 0em;
      padding: 14px 0;
      .back {
        display: flex;
        align-items: center;
        .backIcon {
          cursor: pointer;
          color: #2d8cf0;
          border-radius: 9999px;
          transition: all 0.3s linear; /* 过渡效果 */
        }
        .backIcon:hover {
          color: #57a3f3;
          background-color: rgba(0, 0, 0, 0.1);
        }
      }
      .title {
        display: inline-block;
        margin-left: 18px;
        font-size: 16px;
        font-weight: bold;
      }
      .status {
        min-width: 300px;
      }
    }
  }
}
.myDetail {
  border: none;
}
</style>

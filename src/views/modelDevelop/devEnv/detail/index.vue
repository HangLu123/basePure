<script setup lang="ts">
import { ref, reactive, computed } from "vue";
import { useRouter } from "vue-router";
import type { ComponentSize, FormInstance, FormRules } from "element-plus";
import { JhCustomImageSelect } from "jh-web-components";
import ResourceCombo from "@/components/resourceCombo/ResourceCombo.vue";
import Mount from "@/components/mount/index.vue";
import "jh-web-components/dist/style.css";
import { useEnvStoreHook } from "@/store/modules/devEnv";

import BackNav from "@/layout/components/lay-navbar/index.vue";

const router = useRouter();
import { useI18n } from "vue-i18n";
const { t } = useI18n();
interface EnvForm {
  name: string;
  envType: string;
  image: string;
  ssh: boolean;
  shmSize: string;
  mounts: string;
  resource: string;
  desc: string;
}

const formSize = ref<ComponentSize>("default");
const envFormRef = ref<FormInstance>();
const envForm = reactive<EnvForm>({
  name: "Hello",
  envType: "JupyterLab",
  image: "",
  ssh: false,
  shmSize: "",
  mounts: "",
  resource: "",
  desc: ""
});

const envTypes = [
  {
    value: "JupyterLab",
    label: "JupyterLab"
  },
  {
    value: "VSCode",
    label: "VSCode"
  },
  {
    value: "Desktop",
    label: "桌面"
  },
  {
    value: "SSH",
    label: "Web终端"
  }
];

const labels = computed(() => {
  return [envForm.envType];
});

const tab = ref("showInfo");

const rules = reactive<FormRules<EnvForm>>({
  name: [
    { required: true, message: "Please input Activity name", trigger: "blur" },
    { min: 3, max: 5, message: "Length should be 3 to 5", trigger: "blur" }
  ],
  image: [
    {
      required: true,
      message: "Please select Image",
      trigger: "change"
    }
  ],
  resource: [
    {
      required: true,
      message: "Please select activity resource",
      trigger: "change"
    }
  ]
});

const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  await formEl.validate((valid, fields) => {
    if (valid) {
      // loading.value = true;
      const data = {
        serviceType: envForm.envType,
        image: envForm.image,
        resource: envForm.resource,
        mounts: envForm.mounts,
        desc: envForm.desc
      };
      useEnvStoreHook()
        .createEnv(data)
        .then((res: any) => {
          if (res.isSuccess) {
            console.log(res.data);
          } else {
          }
        })
        .finally(() => {
          // loading.value = false;
        });
    } else {
      console.log("error submit!", fields);
    }
  });
};
</script>

<template>
  <div class="envDetail flex flex-col w-full h-full">
    <BackNav
      :title="t('modelDevelop.devEnv.detail')"
      :home="t('modelDevelop.devEnv.name')"
      :pageName="useEnvStoreHook()?.curEnv.serviceName"
      link="/devEnv"
      myclass="true"
    >
      <template #detailBtn>
        <div class="btnContainer">
          <el-button class="jhTableCustomBtn">
            {{ t("modelDevelop.devEnv.connectBtn") }}
          </el-button>

          <el-button class="jhTableCustomBtn">
            {{ t("modelDevelop.devEnv.startBtn") }}
          </el-button>
          <el-button class="jhTableCustomBtn">
            {{ t("modelDevelop.devEnv.modifyBtn") }}
          </el-button>
          <el-button class="jhTableCustomBtn">
            {{ t("modelDevelop.devEnv.saveImage") }}
          </el-button>
          <el-button class="jhTableCustomBtn">
            {{ t("modelDevelop.devEnv.downloadLog") }}
          </el-button>
        </div>
      </template>
    </BackNav>
    <div class="tabContainer">
      <el-tabs v-model="tab" :animated="false">
        <el-tab-pane
          :label="t('job.detail.title')"
          class="el-tab-pane thinScrollbar"
          name="showInfo"
        >
          <!-- <ShowInfo :detailInfo="detailInfo" /> -->
        </el-tab-pane>
        <el-tab-pane
          :label="t('job.detail.checkpoint')"
          class="el-tab-pane thinScrollbar"
          name="checkPoint"
        >
          <!-- <CheckPoint :id="curJob" :tab="tab" /> -->
        </el-tab-pane>
        <el-tab-pane
          :label="t('task.evaluation.pageName')"
          class="el-tab-pane thinScrollbar"
          name="Evaluation"
        >
          <!-- <Evaluation :id="curJob" :tab="tab" /> -->
        </el-tab-pane>
        <el-tab-pane
          :label="t('job.detail.trainLog')"
          class="el-tab-pane thinScrollbar"
          name="trainLog"
        >
          <!-- <TrainLog :id="curJob" :tab="tab" :jobId="detailInfo.scheduleJobId" /> -->
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<style scoped lang="scss">
.envDetail {
  display: flex;
  flex-direction: column;
  background: #fff;
  position: relative;
  border-radius: 4px;
  height: 100vh;
  overflow: hidden;
  font-family: Source Han Sans CN;
  .btnContainer {
    .jhTableCustomBtn {
      a {
        text-decoration: none; /* 去除下划线 */
        color: inherit; /* 继承父元素的字体颜色 */
      }
    }
  }
  :deep(.ivu-select-selection) {
    border: none;
  }
  :deep(.ivu-select-selected-value) {
    font-size: 16px;
    line-height: 31px;
  }
  .topArea {
    padding: 20px 20px 0 20px;
  }
  .tabContainer {
    height: calc(100% - 108px);
    flex: 1;

    :deep(.ivu-tabs-nav-container) {
      padding: 0 20px;
    }
    .tabPane {
      height: calc(100vh - 144px);
    }
  }
}
.modalContent {
  display: flex;
  margin: 20px 10px;
  .iconClass {
    color: #f90;
    margin: 0 30px;
  }
}
.modalBtn {
  display: flex;
  justify-content: center;
}
</style>

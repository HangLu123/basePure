<script setup lang="ts">
import { ref, reactive, onMounted, computed } from "vue";
import { useRouter } from "vue-router";
import type { ComponentSize, FormInstance, FormRules } from "element-plus";
import { JhCustomImageSelect } from "jh-web-components";
import Description from "@/components/description/index.vue";
import Terminal from "@/components/terminal/index.vue";
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

onMounted(() => {
  queryDetail(useEnvStoreHook().curEnv);
});
function queryDetail(curEnv: any) {
  const basicValue = [
    {
      label: t("modelDevelop.devEnv.envName"),
      value: curEnv.serviceName
    },
    {
      label: t("modelDevelop.devEnv.creater"),
      value: curEnv.submitTime
    },
    {
      label: t("modelDevelop.devEnv.serviceType"),
      value: curEnv.serviceType
    },
    {
      label: t("modelDevelop.devEnv.jobNum"),
      value: curEnv.jobId
    },
    {
      label: t("modelDevelop.devEnv.createTime"),
      value: curEnv.submitTime
    },
    {
      label: t("modelDevelop.devEnv.resourceCombo"),
      value: curEnv.resourceComboName
    },
    {
      label: t("modelDevelop.devEnv.shmSize"),
      value:
        (curEnv.devCenterExternal && curEnv.devCenterExternal.shmSize) || ""
    },
    {
      label: t("modelDevelop.devEnv.status"),
      value: curEnv.status
    },
    {
      label: t("modelDevelop.devEnv.node"),
      value: curEnv.node
    },
    {
      label: t("modelDevelop.devEnv.description"),
      value: curEnv.description
    },
    {
      label: t("modelDevelop.devEnv.servicePort"),
      value: curEnv.serviceContainerPort
    }
  ];
  curEnv.conf
    ? basicValue.push({
        label: t("modelDevelop.devEnv.secretlevel"),
        value: t(`modelDevelop.devEnv.secretlevel${curEnv.conf}`)
      })
    : "";
  detailInfo.value = [
    {
      label: t("modelDevelop.devEnv.basicInfo"),
      value: basicValue
    },
    {
      label: t("modelDevelop.devEnv.imageInfo"),
      value: [
        {
          label: t("modelDevelop.devEnv.imageName"),
          value: curEnv.imageName
        }
      ]
    },
    {
      label: t("modelDevelop.devEnv.mountInfo"),
      value: [
        {
          label: t("modelDevelop.devEnv.dateSet"),
          value: curEnv.dataSets
        }
      ]
    }
  ];
  if (curEnv.status == "运行" && curEnv.devCenterExternal.ssh !== null) {
    detailInfo.value.push({
      label: t("modelDevelop.devEnv.sshInfo"),
      column: 1,
      value: [
        {
          label: t("modelDevelop.devEnv.sshConnect"),
          value: `ssh ${curEnv.devCenterExternal.ssh.sshName}@${curEnv.devCenterExternal.ssh.sshIp} -p ${curEnv.devCenterExternal.ssh.sshPort}`,
          type: "copy"
        },
        {
          label: t("modelDevelop.devEnv.password"),
          value: curEnv.devCenterExternal.ssh.sshPassword,
          type: "password"
        }
      ]
    });
  }
}

const detailInfo = ref([]);

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
      <el-tabs v-model="tab" :animated="false" class="h-full">
        <el-tab-pane
          :label="t('modelDevelop.devEnv.title')"
          class="el-tab-pane thinScrollbar h-full"
          name="showInfo"
        >
          <Description :detailInfo="detailInfo" />
        </el-tab-pane>
        <el-tab-pane
          :label="t('modelDevelop.devEnv.envLog')"
          class="el-tab-pane thinScrollbar"
          name="checkPoint"
        >
          <!-- <CheckPoint :id="curJob" :tab="tab" /> -->
        </el-tab-pane>
        <el-tab-pane
          :label="t('modelDevelop.devEnv.webTerminal')"
          class="el-tab-pane thinScrollbar h-full"
          name="Evaluation"
        >
          <Terminal />
        </el-tab-pane>
        <el-tab-pane
          :label="t('modelDevelop.devEnv.resourceMonitor')"
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
    // .tabPane {
    //   height: calc(100vh - 144px);
    // }
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

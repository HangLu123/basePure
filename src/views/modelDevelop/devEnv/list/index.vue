<script setup lang="tsx">
import { useI18n } from "vue-i18n";
const { t } = useI18n();
import { useRouter } from "vue-router";
import { ref, computed, h, onMounted } from "vue";
const router = useRouter();
import { useTranslationLang } from "@/layout/hooks/useTranslationLang";
import { RefreshRight } from "@element-plus/icons-vue";
import { useEnvStoreHook } from "@/store/modules/devEnv";
import forms, { type FormProps } from "./form.vue";
import log from "./log.vue";
import { message } from "@/utils/message";
import { ChartLine } from "../charts";
import { languageType } from "@/utils/language-set";
import { formatUnit, openServer } from "@/utils/pub-use";
import Search from "@iconify-icons/ep/search";
import { ElMessageBox, ElMessage } from "element-plus";
import { Icon as IconifyIcon } from "@iconify/vue";
import { addDialog } from "@/components/ReDialog";
import desktopClientIcon from "@/assets/devEnv/desktop_client.svg?component";
import desktopIcon from "@/assets/devEnv/desktop_web.svg?component";
const { translationCh, translationEn } = useTranslationLang();
if (languageType == "zh") {
  translationCh();
} else {
  translationEn();
}
defineOptions({
  name: "Welcome"
});
const goDetail = (env: any) => {
  useEnvStoreHook().SET_CURENV(env);
  router.push("/devEnv/detail");
};
const envs = ref([]);
const loading = ref(false);

const operations = [
  {
    name: "jupyter",
    icon: "IF-icon-imageManage"
  },
  {
    name: "ADMIN_TEST",
    icon: "IF-icon-imageManage"
  }
];

const searchQuery = ref("");
const filteredEnvs = computed(() => {
  return envs.value.filter(env => env.serviceName.includes(searchQuery.value));
});

const onSearch = async () => {
  loading.value = true;
  useEnvStoreHook()
    .getEnv()
    .then((res: any) => {
      if (res.isSuccess) {
        envs.value = res.data;
        console.log(res.data);
      } else {
      }
    })
    .finally(() => {
      loading.value = false;
    });
};

const createNewEnv = () => {
  console.log("新建开发环境");
  router.push("/devEnv/create");
};
const stop = (id, lastSave) => {
  addDialog({
    title: "停止环境",
    sureBtnLoading: true,
    contentRenderer: () => (
      <>
        <p className="flex items-center flex-row">
          <IconifyIcon icon="ep:info-filled" />
          <p className="ml-2">
            停止开发环境会导致环境中的所有改动丢失，建议您在停止前保存开发环境。
          </p>
        </p>
        <p className="ml-6 mt-2">
          注：保存开发环境需要先
          <a
            className="mr-2 ml-2"
            style={{ color: "#0052d9" }}
            onClick={() => saveSnapshot(id, lastSave)}
          >
            保存镜像
          </a>
          。
        </p>
      </>
    ),
    beforeSure: (done, { options, index }) => {
      useEnvStoreHook()
        .stopEnv({ id })
        .then((res: any) => {
          if (res.isSuccess) {
            setTimeout(function () {
              onSearch();
              done();
            }, 3000);
          } else {
          }
        })
        .finally();
      // done(); // 需要关闭把注释解开即可
    }
  });
};
const start = id => {
  loading.value = true;
  useEnvStoreHook()
    .startEnv({ id })
    .then((res: any) => {
      if (res.isSuccess) {
        setTimeout(function () {
          onSearch();
          loading.value = false;
        }, 3000);
      } else {
      }
    })
    .finally(() => {});
};
const modifyEnv = index => {
  console.log("新建开发环境");
  router.push("/devEnv/create");
};
const saveSnapshot = (id, lastSave) => {
  // 如果 lastSave 不是 null 并且可以被分割成数组
  const formValues = lastSave ? lastSave.split(/[:\/]/) : [];

  addDialog({
    width: "30%",
    title: "保存镜像",
    contentRenderer: () => forms,
    props: {
      // 赋默认值
      formInline: {
        image: formValues[1] || "", // 如果 formValues 长度不够，使用默认值 ""
        version: formValues[2] || "", // 如果 formValues 长度不够，使用默认值 ""
        namespace: formValues[0] || 0 // 如果 formValues 长度不够，使用默认值 0
      }
    },
    beforeSure: (done, { options, index }) => {
      const { formInline } = options.props as FormProps;
      const nameSpace = formInline.namespaceList.find(
        item => item.value === formInline.namespace
      ).label;
      useEnvStoreHook()
        .saveImage({
          id,
          repository: formInline.image,
          repositoryID: formInline.namespace,
          nameSpace,
          tag: formInline.version
        })
        .then((res: any) => {
          if (res.isSuccess) {
            onSearch();
            done();
          } else {
          }
        })
        .finally();
      // done(); // 需要关闭把注释解开即可
    }
  });
};
const viewLog = index => {
  addDialog({
    width: "60%",
    title: "环境日志",
    contentRenderer: () => log,
    props: {
      // 赋默认值
      formInline: {
        user: "",
        region: "0"
      }
    },
    closeCallBack: ({ options, args }) => {}
  });
};
const deleteEnv = (id, status, serviceName, lastSave) => {
  addDialog({
    title: "删除开发环境",
    sureBtnLoading: true,
    contentRenderer: () => (
      <>
        <p className="flex items-center flex-row">
          <IconifyIcon icon="ep:info-filled" />
          <p className="ml-2">
            删除开发环境会导致环境中的所有改动丢失，建议您在删除前保存开发环境。
          </p>
        </p>
        {status === "运行" && (
          <p className="ml-6 mt-2">
            注：保存开发环境需要先
            <a
              className="mr-2 ml-2"
              style={{ color: "#0052d9" }}
              onClick={() => saveSnapshot(id, lastSave)}
            >
              保存镜像
            </a>
            。
          </p>
        )}
      </>
    ),
    beforeSure: (done, { options, index }) => {
      useEnvStoreHook()
        .deleteDevEnv({ id, serviceName })
        .then((res: any) => {
          if (res.isSuccess) {
            onSearch();
            done();
          } else {
          }
        })
        .finally();
      // done(); // 需要关闭把注释解开即可
    }
  });
};

const dialogVisible = ref(false);

const dialogMessage = ref("");

const handleClose = (done: () => void) => {
  ElMessageBox.confirm("Are you sure to close this dialog?")
    .then(() => {
      done();
    })
    .catch(() => {
      // catch error
    });
};

onMounted(() => {
  onSearch();
});
</script>

<template>
  <div v-loading="loading" class="flex flex-col">
    <!-- 顶部新建环境按钮和右侧搜索、刷新 -->
    <el-row justify="space-between" class="top-bar">
      <el-button type="primary" @click="createNewEnv">新建开发环境</el-button>
      <div class="top-right">
        <el-input
          v-model="searchQuery"
          placeholder="请输入环境名称..."
          clearable
        >
          <template #suffix>
            <IconifyIconOffline
              :icon="Search"
              class="text-primary w-[36px] h-[16px]"
            />
          </template>
        </el-input>
        <el-button :icon="RefreshRight" @click="onSearch" />
      </div>
    </el-row>

    <!-- 环境列表 -->
    <el-scrollbar height="calc(100vh - 210px)">
      <el-row class="env-list">
        <el-col v-for="(env, index) in filteredEnvs" :key="index" :span="24">
          <el-card class="mb-2.5">
            <div class="env-header">
              <div class="env-title">
                <span>环境名称: </span>
                <el-link
                  class="mr-2 ml-2"
                  :underline="false"
                  type="primary"
                  @click="goDetail(env)"
                  >{{ env.serviceName }}</el-link
                >
                <span class="">({{ env.status }})</span>
                <div class="button-group">
                  <el-button
                    v-if="env.status === '退出'"
                    class="first"
                    @click="start(env.id)"
                    >启动</el-button
                  >
                  <el-button
                    v-else
                    class="first"
                    @click="stop(env.id, env.devCenterExternal.saveImageName)"
                    >停止</el-button
                  >
                  <el-button
                    :disabled="env.status === '运行'"
                    @click="modifyEnv(index)"
                    >修改</el-button
                  >
                  <el-button
                    :disabled="env.status !== '运行'"
                    @click="
                      saveSnapshot(env.id, env.devCenterExternal.saveImageName)
                    "
                    >保存镜像</el-button
                  >
                  <el-button @click="viewLog(index)">环境日志</el-button>
                  <el-button
                    class="end"
                    @click="
                      deleteEnv(
                        env.id,
                        env.status,
                        env.serviceName,
                        env.devCenterExternal.saveImageName
                      )
                    "
                    >删除</el-button
                  >
                </div>
              </div>
              <el-descriptions class="env-info" :column="4">
                <el-descriptions-item label="作业号:">{{
                  env.jobId
                }}</el-descriptions-item>
                <el-descriptions-item label="镜像名称:">{{
                  env.imageName
                }}</el-descriptions-item>
                <el-descriptions-item label="环境类型:">{{
                  env.serviceType
                }}</el-descriptions-item>
                <el-descriptions-item label="创建时间:">
                  {{ env.submitTime }}
                </el-descriptions-item>
                <el-descriptions-item label="GPU(卡):">
                  {{ env.gpu }}
                </el-descriptions-item>
                <el-descriptions-item v-if="env.cpuUsageRate" label="CPU(核):">
                  {{ `${env.cpu},使用率：${env.cpuUsageRate.toFixed(2)}%` }}
                </el-descriptions-item>
                <el-descriptions-item v-if="env.memUsageRate" label="内存:">
                  {{
                    `${formatUnit(env.memUsage)}/${formatUnit(env.memLimit)},使用率${env.memUsageRate.toFixed(2)}%`
                  }}
                </el-descriptions-item>
              </el-descriptions>
            </div>

            <!-- VSCode 和 SSH 图标 -->
            <div class="env-actions relative">
              <el-card
                v-if="
                  env.serviceType === 'JupyterLab' ||
                  env.serviceType === 'VSCode'
                "
                class="cursor-pointer"
                :class="env.status === '运行' ? 'run' : 'notRun'"
                @click="openServer(env.serviceUrl, env.serviceName)"
              >
                <div
                  class="flex flex-row w-44 h-10 justify-between items-center"
                >
                  <img
                    v-if="env.serviceType === 'JupyterLab'"
                    src="@/assets/devEnv/jupyter.png"
                  />
                  <img
                    v-if="env.serviceType === 'VSCode'"
                    src="@/assets/devEnv/vscode.png"
                  />
                  <div>
                    <p>{{ env.serviceType }}</p>
                  </div>
                  <img src="@/assets/devEnv/jiantou.png" />
                </div>
              </el-card>
              <el-card
                v-if="env.serviceType === 'Desktop'"
                class="cursor-pointer"
                :class="env.status === '运行' ? 'run' : 'notRun'"
                @click="openServer(env.serviceUrl, env.serviceName)"
              >
                <div
                  v-if="env.serviceType === 'Desktop'"
                  class="flex flex-row w-44 h-10 justify-between items-center"
                  @click="
                    openServer(
                      `/dockerServiceEntrance/desktop?id=${env.id}`,
                      `Web终端${env.id}`
                    )
                  "
                >
                  <desktopClientIcon class="w-14 h-14" />
                  <div>
                    <p>{{ env.serviceType }}</p>
                    <p class="text-sm">Open in client</p>
                  </div>
                  <img src="@/assets/devEnv/jiantou.png" />
                </div>
              </el-card>
              <el-card
                v-if="env.serviceType === 'Desktop'"
                class="cursor-pointer"
                :class="env.status === '运行' ? 'run' : 'notRun'"
                @click="
                  openServer(
                    `/dockerServiceEntrance/desktop?id=${env.id}`,
                    `Web终端${env.id}`
                  )
                "
              >
                <div
                  class="flex flex-row w-44 h-10 justify-between items-center"
                >
                  <desktopIcon class="w-14 h-14" />
                  <div>
                    <p>{{ env.serviceType }}</p>
                    <p class="text-sm">Open in browser</p>
                  </div>
                  <img src="@/assets/devEnv/jiantou.png" class="ml-2" />
                </div>
              </el-card>
              <el-card
                class="cursor-pointer"
                :class="env.status === '运行' ? 'run' : 'notRun'"
                @click="
                  openServer(
                    `/dockerServiceEntrance/command?id=${env.id}`,
                    `Web终端${env.id}`
                  )
                "
              >
                <div
                  class="flex flex-row w-44 h-10 justify-between items-center"
                >
                  <img src="@/assets/devEnv/terminal.png" />
                  <div class="w-20">Web终端</div>
                  <img src="@/assets/devEnv/jiantou.png" />
                </div>
              </el-card>
              <!-- 资源chart -->
              <div
                v-if="false"
                class="w-1/3 flex justify-center h-60 absolute -bottom-12 -right-28"
              >
                <ChartLine
                  class="!w-1/2"
                  :category="['A', 'B', 'C', 'D', 'E']"
                  :series="[
                    {
                      data: [10, 22, 28, 43, 49],
                      type: 'line',
                      stack: 'x'
                    },
                    {
                      data: [5, 4, 3, 5, 10],
                      type: 'line',
                      stack: 'y'
                    },
                    {
                      data: [1, 8, 13, 25, 10],
                      type: 'line',
                      stack: 'z'
                    }
                  ]"
                />
              </div>
            </div>
          </el-card>
        </el-col>
      </el-row>
    </el-scrollbar>
  </div>
</template>
<style scoped>
.top-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 90px;
}

.top-right {
  display: flex;
  gap: 10px;
}

.env-title {
  display: flex;
  align-items: center;
}

.env-info {
  margin-top: 10px;
}

.env-actions {
  margin-top: 20px;
  display: flex;
  gap: 10px;
  align-items: center;
}

.link {
  color: #0052d9;
}

.env-chart {
  margin-top: 20px;
}

.button-group {
  margin-left: 20px;
  display: flex;
}

.el-button {
  margin-left: 0 !important;
  border-radius: 0;
}

.first {
  border-radius: 5px 0 0 5px !important;
  border-right: none;
}
.end {
  border-radius: 0 5px 5px 0 !important;
  border-left: none;
}

.run {
  opacity: 1;
}

.notRun {
  opacity: 0.5;
}

.notRun:hover {
  cursor: not-allowed;
}
</style>

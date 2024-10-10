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
import { useRenderIcon } from "@/components/ReIcon/src/hooks";
import { localForage } from "@/utils/localforage";
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
const addModel = () => {
  localForage().setItem("name", "leon");
  router.push("/model/create");
};
const goDetail = () => {
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
const stop = id => {
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
            onClick={saveSnapshot}
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
const saveSnapshot = index => {
  addDialog({
    width: "30%",
    title: "保存镜像",
    contentRenderer: () => forms,
    props: {
      // 赋默认值
      formInline: {
        user: "",
        region: "0"
      }
    },
    closeCallBack: ({ options, args }) => {
      // options.props 是响应式的
      const { formInline } = options.props as FormProps;
      const text = `姓名：${formInline.user} 城市：${formInline.region}`;
      if (args?.command === "cancel") {
        // 您点击了取消按钮
        message(`您点击了取消按钮，当前表单数据为 ${text}`);
      } else if (args?.command === "sure") {
        message(`您点击了确定按钮，当前表单数据为 ${text}`);
      } else {
        message(
          `您点击了右上角关闭按钮或空白页或按下了esc键，当前表单数据为 ${text}`
        );
      }
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
    closeCallBack: ({ options, args }) => {
      // options.props 是响应式的
      const { formInline } = options.props as FormProps;
      const text = `姓名：${formInline.user} 城市：${formInline.region}`;
      if (args?.command === "cancel") {
        // 您点击了取消按钮
        message(`您点击了取消按钮，当前表单数据为 ${text}`);
      } else if (args?.command === "sure") {
        message(`您点击了确定按钮，当前表单数据为 ${text}`);
      } else {
        message(
          `您点击了右上角关闭按钮或空白页或按下了esc键，当前表单数据为 ${text}`
        );
      }
    }
  });
};
const deleteEnv = (id, status, serviceName) => {
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
              onClick={saveSnapshot}
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
        />
        <el-button :icon="RefreshRight" @click="onSearch" />
      </div>
    </el-row>

    <!-- 环境列表 -->
    <el-scrollbar height="calc(100vh - 180px)">
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
                  @click="goDetail"
                  >{{ env.serviceName }}</el-link
                >
                <span class="">({{ env.status }})</span>
                <div class="button-group">
                  <el-button
                    v-if="env.status !== '运行'"
                    class="first"
                    @click="start(env.id)"
                    >启动</el-button
                  >
                  <el-button v-else class="first" @click="stop(env.id)"
                    >停止</el-button
                  >
                  <el-button
                    :disabled="env.status === '运行'"
                    @click="modifyEnv(index)"
                    >修改</el-button
                  >
                  <el-button
                    :disabled="env.status !== '运行'"
                    @click="saveSnapshot(index)"
                    >保存镜像</el-button
                  >
                  <el-button @click="viewLog(index)">环境日志</el-button>
                  <el-button
                    class="end"
                    @click="deleteEnv(env.id, env.status, env.serviceName)"
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
                <el-descriptions-item label="CPU:">
                  {{ env.image }}
                </el-descriptions-item>
                <el-descriptions-item label="内存:">
                  {{ env.memory }}
                </el-descriptions-item>
                <el-descriptions-item label="GPU:">
                  {{ env.image }}
                </el-descriptions-item>
              </el-descriptions>
            </div>

            <!-- VSCode 和 SSH 图标 -->
            <div class="env-actions relative">
              <el-card
                v-if="env.serviceType !== 'SSH'"
                class="cursor-pointer"
                :class="env.status === '运行' ? 'run' : 'notRun'"
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
                  <desktopClientIcon
                    v-if="env.serviceType === 'Desktop'"
                    class="w-14 h-14"
                  />
                  <div>
                    <p>{{ env.serviceType }}</p>
                    <p v-if="env.serviceType === 'Desktop'" class="text-sm">
                      Open in client
                    </p>
                  </div>
                  <img src="@/assets/devEnv/jiantou.png" />
                </div>
              </el-card>
              <el-card
                v-if="env.serviceType === 'Desktop'"
                class="cursor-pointer"
                :class="env.status === '运行' ? 'run' : 'notRun'"
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

.env-list {
  padding: 0 20px;
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

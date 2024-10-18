<script setup lang="ts">
import { ref, reactive, computed, watch } from "vue";
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
  mounts: any;
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
  mounts: [
    {
      id: 1,
      name: "家目录",
      point: "/home/users/DEV/jhadmin"
    },
    {
      id: 2,
      name: "工作目录",
      point: "/apps/appform/data/spooler/jhadmin"
    }
  ],
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

const rules = reactive<FormRules<EnvForm>>({
  name: [
    { required: true, message: "Please input Activity name", trigger: "blur" },
    { min: 3, max: 5, message: "Length should be 3 to 5", trigger: "blur" }
  ],
  image: [
    {
      required: true,
      message: "Please select Image",
      trigger: ["blur"]
    }
  ],
  resource: [
    {
      required: true,
      message: "Please select activity resource",
      trigger: ["change", "blur"]
    }
  ],
  //mounts这个数组的验证规则，name和point都不能为空，且point要已/开头。
  mounts: [
    {
      validator: (rule, value, callback) => {
        if (!Array.isArray(value) || value.length === 0) {
          callback(new Error("Mounts array cannot be empty"));
          return;
        }

        for (const item of value) {
          if (!item.name) {
            callback(new Error("Name cannot be empty"));
            return;
          }
          if (!item.point) {
            callback(new Error("Point cannot be empty"));
            return;
          }
          if (!item.point.startsWith("/")) {
            callback(new Error("Point must start with '/'"));
            return;
          }
        }

        // If all validations passed
        callback();
      },
      trigger: "blur"
    }
  ]
});

const path = ref("");

watch(
  () => [envForm.image, envForm.resource],
  newVal => {
    ["image", "resource"].forEach(prop => {
      envFormRef.value.validateField(prop);
    });
  },
  { deep: true }
);
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
  <div class="createTask flex flex-col w-full h-full">
    <BackNav
      :title="t('modelDevelop.devEnv.createBtn')"
      :home="t('modelDevelop.devEnv.name')"
      link="/devEnv"
    />
    <el-scrollbar class="createContainer thinScrollbar flex-1 shadow-lg">
      <el-form
        ref="envFormRef"
        style="max-width: 1000px"
        :model="envForm"
        :rules="rules"
        label-width="auto"
        label-position="left"
        :size="formSize"
        status-icon
      >
        <el-form-item label="环境名称" prop="name">
          <el-input v-model="envForm.name" placeholder="请输入环境名称" />
        </el-form-item>
        <el-form-item label="环境类型">
          <el-select v-model="envForm.envType" placeholder="">
            <el-option
              v-for="item in envTypes"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="选择镜像" prop="image">
          <JhCustomImageSelect
            v-model="envForm.image"
            :labels="labels"
            style="width: 100%"
          />
        </el-form-item>
        <el-form-item label="SSH连接">
          <el-switch v-model="envForm.ssh" />
        </el-form-item>
        <el-form-item label="资源规格" prop="resource">
          <ResourceCombo v-model="envForm.resource" />
        </el-form-item>
        <el-form-item label="共享内存(shm-size)">
          <el-input v-model="envForm.shmSize" />
        </el-form-item>
        <el-form-item label="挂载目录">
          <Mount v-model="envForm.mounts" />
        </el-form-item>
        <el-form-item label="环境描述">
          <el-input v-model="envForm.desc" type="textarea" />
        </el-form-item>
      </el-form>
    </el-scrollbar>

    <!-- 底部按钮 -->
    <div
      class="footer flex items-center h-16 w-full bg-gray-100 border-t border-gray-200"
    >
      <div class="buttonContainer flex justify-start w-full h-8 px-10">
        <el-button
          class="px-4"
          type="primary"
          @click="submitForm(envFormRef)"
          >{{ t("modelDevelop.devEnv.createBtn") }}</el-button
        >
        <el-button class="px-4 ml-2" @click="router.push('/devEnv')">{{
          t("modelDevelop.devEnv.cancel")
        }}</el-button>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.createTask {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  .createContainer {
    flex: 1;
    max-height: calc(100vh - 308px);
    overflow-y: auto;
    margin: 20px;
    padding: 30px;
    box-shadow:
      0px 1px 5px 0px rgba(0, 0, 0, 0.2),
      0px 3px 1px 0px rgba(0, 0, 0, 0.12),
      0px 2px 2px 0px rgba(0, 0, 0, 0.14);
    :deep(.el-popper) {
      width: 500px !important;
    }
  }
  .footer {
    display: flex;
    align-items: center;
    height: 70px;
    width: 100%;
    background: rgba(0, 0, 0, 0.02);
    box-sizing: border-box;
    border-width: 1px 0px 0px 0px;
    border-style: solid;
    border-color: rgba(0, 0, 0, 0.15);
    .buttonContainer {
      display: flex;
      justify-content: flex-start;
      height: 30px;
      width: 100%;
      padding: 0 40px;
    }
  }
}
</style>

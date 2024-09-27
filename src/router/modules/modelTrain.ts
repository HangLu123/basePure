import { $t } from "@/plugins/i18n";
const { VITE_HIDE_HOME } = import.meta.env;

export default [
  {
    path: "/batchSubmit",
    name: "BatchSubmit",
    component: () => import("@/views/aiWealth/model/list/index.vue"),
    meta: {
      title: "批作业提交",
      showLink: false
    },
    children: [
      {
        path: "/model/detail",
        name: "ModelDetail",
        component: () => import("@/views/aiWealth/model/detail/index.vue"),
        meta: {
          title: $t("aiWealth.model"),
          showLink: false,
          activePath: "/model"
        }
      },
      {
        path: "/model/create",
        name: "ModelCreate",
        component: () => import("@/views/aiWealth/model/create/index.vue"),
        meta: {
          title: $t("aiWealth.model"),
          showLink: false,
          activePath: "/model"
        }
      }
    ]
  },
  {
    path: "/train",
    name: "Train",
    component: () => import("@/views/detail/page/index.vue"),
    meta: {
      title: "大模型训练",
      showLink: VITE_HIDE_HOME === "true" ? false : true
    }
  },
  {
    path: "/experimentManagement",
    name: "ExperimentManagement",
    component: () => import("@/views/detail/page/index.vue"),
    meta: {
      title: "实验管理",
      showLink: VITE_HIDE_HOME === "true" ? false : true
    }
  }
] satisfies Array<RouteConfigsTable>;

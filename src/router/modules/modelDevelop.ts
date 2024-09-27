import { $t } from "@/plugins/i18n";
const { VITE_HIDE_HOME } = import.meta.env;

export default [
  {
    path: "/devEnv",
    name: "DevEnv",
    component: () => import("@/views/aiWealth/model/list/index.vue"),
    meta: {
      title: "开发环境",
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
    path: "/visualModel",
    name: "VisualModel",
    component: () => import("@/views/detail/page/index.vue"),
    meta: {
      title: "可视化模型",
      showLink: VITE_HIDE_HOME === "true" ? false : true
    }
  }
] satisfies Array<RouteConfigsTable>;

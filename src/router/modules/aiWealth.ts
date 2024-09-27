import { $t } from "@/plugins/i18n";
const { VITE_HIDE_HOME } = import.meta.env;

export default [
  {
    path: "/model",
    name: "Model",
    component: () => import("@/views/aiWealth/model/list/index.vue"),
    meta: {
      title: $t("aiWealth.model.name"),
      showLink: false
    },
    children: [
      {
        path: "/model/detail",
        name: "ModelDetail",
        component: () => import("@/views/aiWealth/model/detail/index.vue"),
        meta: {
          title: $t("aiWealth.model.name"),
          showLink: false,
          activePath: "/model"
        }
      },
      {
        path: "/model/create",
        name: "ModelCreate",
        component: () => import("@/views/aiWealth/model/create/index.vue"),
        meta: {
          title: $t("aiWealth.model.name"),
          showLink: false,
          activePath: "/model"
        }
      }
    ]
  },
  {
    path: "/detail",
    name: "Detail",
    component: () => import("@/views/detail/page/index.vue"),
    meta: {
      title: $t("aiWealth.dataSet.name"),
      showLink: VITE_HIDE_HOME === "true" ? false : true
    }
  },
  {
    path: "/code",
    name: "Code",
    component: () => import("@/views/detail/page/index.vue"),
    meta: {
      title: $t("aiWealth.code.name"),
      showLink: VITE_HIDE_HOME === "true" ? false : true
    }
  }
] satisfies Array<RouteConfigsTable>;

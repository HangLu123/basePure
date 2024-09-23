import { $t } from "@/plugins/i18n";
const { VITE_HIDE_HOME } = import.meta.env;
const Layout = () => import("@/layout/index.vue");

export default [
  {
    path: "/",
    name: "Home",
    component: Layout,
    redirect: "/model",
    meta: {
      title: $t("aiWealth.model"),
      rank: 0
    }
  },
  {
    path: "/model",
    name: "Model",
    component: () => import("@/views/aiWealth/model/list/index.vue"),
    meta: {
      title: $t("aiWealth.model"),
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
    path: "/detail",
    name: "Detail",
    component: () => import("@/views/detail/page/index.vue"),
    meta: {
      title: $t("aiWealth.dataSet"),
      showLink: VITE_HIDE_HOME === "true" ? false : true
    }
  },
  {
    path: "/code",
    name: "Code",
    component: () => import("@/views/detail/page/index.vue"),
    meta: {
      title: $t("aiWealth.code"),
      showLink: VITE_HIDE_HOME === "true" ? false : true
    }
  }
] satisfies Array<RouteConfigsTable>;

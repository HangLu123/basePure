import { $t } from "@/plugins/i18n";
const { VITE_HIDE_HOME } = import.meta.env;
const Layout = () => import("@/layout/index.vue");

export default [
  {
    path: "/",
    name: "Home",
    component: Layout,
    redirect: "/devEnv",
    meta: {
      title: $t("modelDevelop.devEnv"),
      icon: "ep:home-filled",
      rank: 0
    }
  },
  {
    path: "/devEnv",
    name: "DevEnv",
    component: () => import("@/views/modelDevelop/devEnv/list/index.vue"),
    meta: {
      title: "开发环境",
      icon: "IF-icon-devCenter",
      showLink: false
    },
    children: [
      {
        path: "/devEnv/detail",
        name: "devEnvDetail",
        component: () => import("@/views/modelDevelop/devEnv/detail/index.vue"),
        meta: {
          title: $t("modelDevelop.devEnv"),
          showLink: false,
          activePath: "/devEnv"
        }
      },
      {
        path: "/devEnv/create",
        name: "devEnvCreate",
        component: () => import("@/views/modelDevelop/devEnv/create/index.vue"),
        meta: {
          title: $t("modelDevelop.devEnv"),
          showLink: false,
          activePath: "/devEnv"
        }
      }
    ]
  },
  {
    path: "/visualModel",
    name: "visualModel",
    component: () => import("@/views/modelDevelop/visualModel/list/index.vue"),
    meta: {
      title: "可视化模型",
      icon: "IF-icon-imageManage",
      showLink: VITE_HIDE_HOME === "true" ? false : true
    },
    children: [
      {
        path: "/visualModel/detail",
        name: "ModelDetail",
        component: () =>
          import("@/views/modelDevelop/visualModel/detail/index.vue"),
        meta: {
          title: $t("modelDevelop.visualModel"),
          showLink: false,
          activePath: "/visualModel"
        }
      },
      {
        path: "/visualModel/create",
        name: "ModelCreate",
        component: () =>
          import("@/views/modelDevelop/visualModel/create/index.vue"),
        meta: {
          title: $t("modelDevelop.visualModel"),
          showLink: false,
          activePath: "/visualModel"
        }
      }
    ]
  }
] satisfies Array<RouteConfigsTable>;

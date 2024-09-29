import { $t } from "@/plugins/i18n";
const Layout = () => import("@/layout/index.vue");
export default [
  {
    path: "/",
    name: "Home",
    component: Layout,
    redirect: "/model",
    meta: {
      title: $t("aiWealth.model"),
      icon: "ep:home-filled",
      rank: 0
    }
  },
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
    path: "/dataSet",
    name: "DataSet",
    component: () => import("@/views/aiWealth/dataSet/list/index.vue"),
    meta: {
      title: $t("aiWealth.dataSet.name"),
      showLink: false
    },
    children: [
      {
        path: "/dataSet/detail",
        name: "ModelDetail",
        component: () => import("@/views/aiWealth/dataSet/detail/index.vue"),
        meta: {
          title: $t("aiWealth.dataSet.name"),
          showLink: false,
          activePath: "/dataSet"
        }
      },
      {
        path: "/dataSet/create",
        name: "ModelCreate",
        component: () => import("@/views/aiWealth/dataSet/create/index.vue"),
        meta: {
          title: $t("aiWealth.dataSet.name"),
          showLink: false,
          activePath: "/dataSet"
        }
      }
    ]
  },
  {
    path: "/code",
    name: "Code",
    component: () => import("@/views/aiWealth/code/list/index.vue"),
    meta: {
      title: $t("aiWealth.code.name"),
      showLink: false
    },
    children: [
      {
        path: "/code/detail",
        name: "ModelDetail",
        component: () => import("@/views/aiWealth/code/detail/index.vue"),
        meta: {
          title: $t("aiWealth.code.name"),
          showLink: false,
          activePath: "/code"
        }
      },
      {
        path: "/code/create",
        name: "ModelCreate",
        component: () => import("@/views/aiWealth/code/create/index.vue"),
        meta: {
          title: $t("aiWealth.code.name"),
          showLink: false,
          activePath: "/code"
        }
      }
    ]
  }
] satisfies Array<RouteConfigsTable>;

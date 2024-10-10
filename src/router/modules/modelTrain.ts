import { $t } from "@/plugins/i18n";
const { VITE_HIDE_HOME } = import.meta.env;
const Layout = () => import("@/layout/index.vue");

export default [
  {
    path: "/",
    name: "Home",
    component: Layout,
    redirect: "/batchSubmit",
    meta: {
      title: $t("modelTrain.batchSubmit"),
      icon: "ep:home-filled",
      rank: 0
    }
  },
  {
    path: "/batchSubmit",
    name: "BatchSubmit",
    component: () => import("@/views/modelTrain/batchSubmit/list/index.vue"),
    meta: {
      title: "批作业提交",
      icon: "IF-icon-trainCenter",
      showLink: false
    },
    children: [
      {
        path: "/batchSubmit/detail",
        name: "ModelDetail",
        component: () =>
          import("@/views/modelTrain/batchSubmit/detail/index.vue"),
        meta: {
          title: $t("modelTrain.batchSubmit"),
          showLink: false,
          activePath: "/batchSubmit"
        }
      },
      {
        path: "/batchSubmit/create",
        name: "ModelCreate",
        component: () =>
          import("@/views/modelTrain/batchSubmit/create/index.vue"),
        meta: {
          title: $t("modelTrain.batchSubmit"),
          showLink: false,
          activePath: "/batchSubmit"
        }
      }
    ]
  },
  {
    path: "/train",
    name: "Train",
    component: () => import("@/views/modelTrain/train/list/index.vue"),
    meta: {
      title: "大模型训练",
      icon: "IF-icon-imageManage",
      showLink: VITE_HIDE_HOME === "true" ? false : true
    }
  },
  {
    path: "/experimentManagement",
    name: "ExperimentManagement",
    component: () =>
      import("@/views/modelTrain/experimentManagement/list/index.vue"),
    meta: {
      title: "实验管理",
      icon: "IF-icon-job",
      showLink: VITE_HIDE_HOME === "true" ? false : true
    }
  }
] satisfies Array<RouteConfigsTable>;

import { $t } from "@/plugins/i18n";
const Layout = () => import("@/layout/index.vue");

export default [
  {
    path: "/",
    name: "Home",
    component: Layout,
    redirect: "/myService",
    meta: {
      title: $t("aiWealth.model"),
      icon: "ep:home-filled",
      rank: 0
    }
  },
  {
    path: "/myService",
    name: "MyService",
    component: () => import("@/views/aiWealth/model/list/index.vue"),
    meta: {
      title: "我的服务",
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
  }
] satisfies Array<RouteConfigsTable>;

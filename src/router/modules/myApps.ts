import { $t } from "@/plugins/i18n";

export default [
  {
    path: "/myApps",
    name: "MyApps",
    component: () => import("@/views/aiWealth/model/list/index.vue"),
    meta: {
      title: "Ai应用",
      showLink: false
    }
  }
] satisfies Array<RouteConfigsTable>;

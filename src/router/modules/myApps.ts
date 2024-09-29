import { $t } from "@/plugins/i18n";
const Layout = () => import("@/layout/index.vue");

export default [
  {
    path: "/",
    name: "Home",
    component: Layout,
    redirect: "/myApps",
    meta: {
      title: $t("aiWealth.model"),
      icon: "ep:home-filled",
      rank: 0
    }
  },
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

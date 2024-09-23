import { $t } from "@/plugins/i18n";

export default [
  {
    path: "/login",
    name: "Login",
    component: () => import("@/views/login/index.vue"),
    meta: {
      title: $t("aiWealth.menus.pureLogin"),
      showLink: false,
      rank: 101
    }
  }
] satisfies Array<RouteConfigsTable>;

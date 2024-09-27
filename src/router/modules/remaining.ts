import { $t } from "@/plugins/i18n";

export default [
  {
    path: "/login",
    name: "Login",
    component: () => import("@/views/login/index.vue"),
    redirect: "",
    meta: {
      title: $t("aiWealth.menus.pureLogin"),
      icon: "",
      showLink: false,
      rank: 101
    }
  }
] satisfies Array<RouteConfigsTable>;

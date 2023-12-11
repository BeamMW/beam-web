import { RouteRecordName } from "vue-router";
export const getRouteName = (routeName?: RouteRecordName | null) =>
  typeof routeName === "string" ? routeName.split("___")[0] : "";

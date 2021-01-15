import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import Landing from "../views/Landing.vue";
import OldUrl from "../views/OldUrl.vue";
import Map from "../views/Map.vue";
Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: "/map",
    name: "Map",
    component: Map
  },
  { 
    //landing/thailand/100.55532/13.98083/17/51/60/0/0
    path: "/landing/:country/:long/:lat/:zoom/:bearing/:pitch/:floor/:building",
    name: "Landing",
    component: Landing
  },
  { 
    //landing/thailand/100.55532/13.98083/17/51/60/0/0
    path: "/oldurl/country",
    name: "OldUrl",
    component: OldUrl
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;

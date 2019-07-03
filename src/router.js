import Vue from "vue";
import Router from "vue-router";
import MainView from "./views/main.vue";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      name: "main",
      component: MainView
    },

    {
      path: "/wait",
      name: "wait",
      component: () => import(/* webpackChunkName: "wait" */ "./views/wait.vue")
    },
    {
      path: "/core/:id",
      name: "core",
      component: () => import(/* webpackChunkName: "core" */ "./views/core.vue")
    },
    {
      path: "*",
      component: () =>
        import(/* webpackChunkName: "error" */ "./views/error.vue")
    }
  ]
});

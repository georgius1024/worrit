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
      path: "/landing",
      name: "landing",
      component: () =>
        import(/* webpackChunkName: "landing" */ "./views/landing.vue")
    },
    {
      path: "/succes",
      name: "success",
      component: () =>
        import(/* webpackChunkName: "success" */ "./views/success.vue")
    }
  ]
});

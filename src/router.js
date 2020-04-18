import Vue from 'vue'
import Router from 'vue-router'
import MainView from './views/main.vue'

Vue.use(Router)

const routes = [
  {
    path: '/',
    name: 'main',
    component: MainView
  },
  {
    path: '/wait',
    name: 'wait',
    component: () => import(/* webpackChunkName: "wait" */ './views/wait.vue')
  },
  {
    path: '/about',
    name: 'about',
    component: () => import(/* webpackChunkName: "about" */ './views/about.vue')
  },
  {
    path: '/core',
    name: 'core',
    component: () => import(/* webpackChunkName: "core" */ './views/core.vue')
  },
  {
    path: '*',
    component: () => import(/* webpackChunkName: "error" */ './views/error.vue')
  }
]

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router

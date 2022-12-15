import Vue from "vue";
import VueRouter from "vue-router";
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';

import Todo from '../components/Todo/Todo';




Vue.use(BootstrapVue)
Vue.use(IconsPlugin) 

Vue.use(VueRouter);
const routes = [
  {
    path: "/",
    name: "Todo",
    component: Todo,
  }  
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((_, from, next) => {
  window.scrollTo(0, 0)
  next()
})
export default router;

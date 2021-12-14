import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import Home from "../views/Home.vue";
import RandomJoke from "../views/RandomJoke.vue";
import MyJoke from "../views/MyJoke.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/random-jokes",
    name: "RandomJokes",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/RandomJokes.vue"),
  },
  {
    path: "/random-jokes/:id",
    name: "RandomJoke",
    component: RandomJoke,
  },
  {
    path: "/joke/:id",
    name: "MyJoke",
    component: MyJoke,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;

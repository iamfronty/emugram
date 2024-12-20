import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: () => import("../views/Home.vue"),
    },
    {
      path: "/engine/:id",
      name: "engine",
      component: () => import("../views/Engine.vue"),
    },
    {
      path: "/game/:consoleType/:gameName",
      name: "game",
      component: () => import("../views/Game.vue"),
    },
  ],
});

export default router;

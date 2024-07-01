import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "MainLayout",
      component: () => import("@/layouts/MainLayout.vue"),
      children: [
        {
          path: "/",
          name: "HomeView",
          component: () => import("@/views/HomeView.vue"),
        },
        {
          path: "/diary",
          name: "DiaryView",
          component: () => import("@/views/DiaryView.vue"),
        },
        {
          path: "/settings",
          name: "SettingsView",
          component: () => import("@/views/SettingsView.vue"),
        },
      ],
    },
  ],
});

export default router;

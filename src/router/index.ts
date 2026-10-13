import GameSessionProvider from "@/components/providers/GameSessionProvider.vue";
import GameView from "@/views/GameView.vue";
import HomeView from "@/views/HomeView.vue";
import { createRouter, createWebHistory } from "vue-router";

export const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/:pathMatch(.*)*", component: HomeView },
    { path: "/", component: HomeView },
    {
      path: "/game/:lobbyName/:lobbyCode?",
      component: GameSessionProvider,
      children: [{ path: "", component: GameView }],
    },
  ],
});

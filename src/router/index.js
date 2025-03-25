import { createRouter, createWebHistory } from "vue-router"
import Game from "@/views/Game.vue"
import Leaderboard from "@/views/Leaderboard.vue"

const routes = [
  { path: "/", component: Game },
  { path: "/leaderboard", component: Leaderboard },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router

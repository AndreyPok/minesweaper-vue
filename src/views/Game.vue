<template>
  <SettingsModal :levels="levels" :changeLevel="changeLevel" />
  <WinModal v-model:userName="userName" :saveRecord="saveRecord" />
  <div class="game">
    <div class="game-container">
      <Menu
        :selectedLevel="selectedLevel"
        :leaderboard="leaderboard"
        :restartGame="restartGame"
        :time="time"
        :counterFlagged="counterFlagged"
      />
      <Board
        :isDisabled="isDisabled"
        :field="field"
        :handleMouse="handleMouse"
        :width="width"
      />
    </div>
  </div>
</template>

<script>
import SettingsModal from "../components/Modals/SettingsModal.vue"
import WinModal from "../components/Modals/WinModal.vue"
import Menu from "../components/Menu.vue"
import Board from "../components/Board.vue"
import { useGame } from "../composables/useGame"

export default {
  components: {
    SettingsModal, // Регистрация компонента
    WinModal, // Регистрация компонента
    Menu,
    Board,
  },
  setup() {
    return useGame()
  },
}
</script>

<style scoped>
.game {
  height: 100vh;
  min-height: max-content;
  display: grid;
  place-items: center; /* Центрирует game-container */
  background-color: #1e1e1e; /* Тёмный фон для контраста продублировал в html*/
  box-sizing: border-box;
  overflow-y: hidden;
}

.game-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #2c3e50;
  border: 2px solid rgba(255, 255, 255, 0.2);
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
  box-sizing: border-box;
}
</style>

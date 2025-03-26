<template>
  <div class="menu">
    <div class="option mb-3">
      <button
        type="button"
        data-bs-toggle="modal"
        data-bs-target="#settingsModal"
      >
        Настройки
      </button>
      <button type="button" @click="leaderboard">Таблица лидеров</button>
    </div>
    <div class="game-menu mb-1">
      <div class="timer">
        <div class="time">{{ time }}</div>
      </div>
      <b-button variant="secondary" @click="restartGame">Рестарт</b-button>
      <div class="mines-counter">
        {{ selectedLevel.mines - counterFlagged }}
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  selectedLevel: Object,
  leaderboard: Function,
  restartGame: Function,
  time: String,
  counterFlagged: Number,
})
</script>

<style scoped>
.menu {
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #2d3e50;
  height: 250px;
  min-width: 400px;
  width: 100%;
  max-width: 80%;
  padding: 20px;
  border-radius: 15px;
  color: white;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1); /* Легкая тень */
  margin-bottom: 20px;
  text-align: center;
  box-sizing: border-box;
}

.option {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
}

button {
  background-color: #3b5771;
  color: white;
  padding: 12px 22px;
  margin: 6px;
  border: none;
  border-radius: 8px; /* Немного более округлые углы */
  cursor: pointer;
  font-size: 16px;
  font-weight: 500; /* Легкий акцент на шрифт */
  transition: background-color 0.3s ease, transform 0.1s ease;
}

button:hover {
  background-color: #2b4253;
  transform: translateY(-2px); /* Мягкое поднятие кнопки при наведении */
}

button:active {
  transform: translateY(1px); /* Слегка опускаем при нажатии */
}

.game-menu {
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-top: 15px;
  align-items: center;
}

.timer,
.mines-counter {
  min-width: 90px; /* Умеренный размер */
  min-height: 45px; /* Умеренная высота */
  background-color: #444;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px; /* Более округлые углы */
  color: white;
  font-size: 18px;
  font-weight: 600; /* Более жирный шрифт для лучшей видимости */
  border: 2px solid #2d3e50;
  margin: 0 12px;
}

.timer {
  background-color: #333;
}

.mines-counter {
  background-color: #444;
}

.b-button {
  background-color: #2b4253;
  color: white;
  border: none;
  padding: 10px 20px;
  font-size: 14px;
  border-radius: 8px;
  transition: background-color 0.3s ease, transform 0.1s ease;
}

.b-button:hover {
  background-color: #1f2c38;
  transform: translateY(-2px);
}

.b-button:active {
  transform: translateY(1px);
}
</style>

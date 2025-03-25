<template>
  <div class="records">
    <div class="records-container">
      <h1 class="text-center">Топ - 10</h1>
      <div class="buttons">
        <button @click="setLevel(0)">Простой</button>
        <button @click="setLevel(1)">Средний</button>
        <button @click="setLevel(2)">Сложный</button>
      </div>
      <div class="records-value">
        <div v-for="(record, index) in records.slice(0, 10)" class="ml-3">
          {{ index + 1 }}. {{ record }}
        </div>
      </div>
      <div class="back-button">
        <button class="back-button" @click="game">Назад</button>
      </div>
    </div>
  </div>
</template>

<script>
import { useRouter } from "vue-router"
import { ref } from "vue"
export default {
  setup() {
    const router = useRouter()

    const game = () => router.push({ path: "/" })

    const levels = [
      { name: "Простой", size: "8x8", mines: 10 },
      { name: "Средний", size: "16x16", mines: 40 },
      { name: "Сложный", size: "32x16", mines: 100 },
    ]

    const selectedLevel = ref(levels[0])

    const records = ref(
      JSON.parse(localStorage.getItem(selectedLevel.value.name))
    )

    if (records.value) {
      records.value.sort()
    } else {
      records.value = []
    }

    function setLevel(index) {
      selectedLevel.value = levels[index]
      records.value = JSON.parse(localStorage.getItem(selectedLevel.value.name))
      if (records.value) {
        records.value.sort()
      } else {
        records.value = []
      }
    }

    return { selectedLevel, records, levels, setLevel, game }
  },
}
</script>

<style scoped>
.records {
  width: 100vw;
  height: 100vh;
  display: grid;
  align-items: center;
  justify-content: center;
  background-color: #1e1e1e;
}

.records-container {
  width: 400px;
  background-color: #2d3e50;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
  color: white;
}

h1 {
  text-align: center;
  color: white;
  margin-bottom: 20px;
}

.buttons {
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
}

button {
  background-color: #3b5771;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.3s ease, transform 0.1s ease;
  width: 100px; /* Устанавливаем ширину для равномерного распределения */
}

button:hover {
  background-color: #2b4253;
  transform: scale(1.05);
}

button:active {
  transform: scale(0.98);
}

.records-value {
  max-height: 300px;
  overflow-y: auto;
  margin-top: 10px;
  padding: 10px;
}

.record-item {
  margin: 10px 0;
  font-size: 18px;
  color: #fff;
}

.back-button {
  display: flex;
  justify-content: center;
  align-items: center;
}

.back-button button {
  background-color: #2b4253;
  color: white;
  padding: 10px 20px;
  font-size: 14px;
  border-radius: 5px;
  transition: background-color 0.3s ease, transform 0.1s ease;
}

.back-button button:hover {
  background-color: #1f2c38;
  transform: scale(1.05);
}

.back-button button:active {
  transform: scale(0.98);
}
</style>

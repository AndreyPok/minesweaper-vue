<template>
  <div :class="{ disabled: isDisabled }" class="board">
    <div
      class="minefield"
      :style="{
        gridTemplateColumns: `repeat(${width}, ${cellSize}px)`,
      }"
      @mousedown="handleMouse"
      @contextmenu.prevent
    >
      <div
        v-for="(cell, index) in field"
        :key="index"
        class="cell"
        :class="{
          open: cell.isOpen,
          mine: cell.isMine,
          flagged: cell.isFlagged,
          issue: cell.isIssue,
        }"
        :data-index="index"
        :style="{
          height: `${cellSize}px`,
        }"
      >
        <span v-if="cell.isOpen && cell.isMine">💣</span>
        <span v-if="cell.isOpen && !cell.isMine">{{
          cell.surroundingMines === 0 ? "" : cell.surroundingMines
        }}</span>
        <span v-if="!cell.isOpen && cell.isFlagged">🚩</span>
        <span v-if="!cell.isOpen && cell.isIssue">❓</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue"

const props = defineProps({
  isDisabled: Boolean,
  width: Number,
  field: Array,
  handleMouse: Function,
})
const cellSize = computed(() => (props.width <= 8 ? 50 : 30))
</script>

<style scoped>
.disabled {
  pointer-events: none;
  opacity: 0.5;
}

.minefield {
  display: grid;
  padding: 5px;
  background-color: #2c3e50;
  border-radius: 8px;
  box-shadow: inset 0 0 8px rgba(0, 0, 0, 0.3);
}

.cell {
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  font-weight: bold;
  color: white;
  background-color: #34495e;
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 4px;
  transition: background-color 0.1s ease-in-out, transform 0.05s;
  user-select: none;
}

.cell:hover {
  background-color: #3b5771;
  transition: background-color 0.1s;
  cursor: pointer;
}

.cell:active {
  transform: scale(0.97);
  transition: transform 0.05s;
}

.cell.open {
  background-color: #bdc3c7;
  color: black;
  transition: background-color 0.2s ease-in-out;
}

.mine.open {
  background-color: red;
  color: white;
  font-size: 24px;
}

.flagged {
  background-color: yellow !important;
}

.issue {
  background-color: orange !important;
}
</style>

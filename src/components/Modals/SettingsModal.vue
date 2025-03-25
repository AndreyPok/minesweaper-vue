<template>
  <div
    class="modal fade"
    id="settingsModal"
    tabindex="-1"
    aria-labelledby="settingsModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="settingsModal">Настройки</h1>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Закрыть"
          ></button>
        </div>
        <div class="modal-body">
          <button
            v-for="(level, index) in levels"
            class="mb-2"
            @click="changeLevel(index)"
            data-bs-dismiss="modal"
          >
            {{ level.name }}: {{ level.size }}, кол-во мин: {{ level.mines }}
          </button>
        </div>
        <div class="modal-footer">
          <button
            type="button"
            class="btn btn-secondary"
            data-bs-dismiss="modal"
          >
            Закрыть
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineProps } from "vue"

defineProps({
  levels: Array,
  changeLevel: Function,
})
</script>

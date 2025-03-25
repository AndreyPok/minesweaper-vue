<template>
  <div
    class="modal fade"
    id="winModal"
    tabindex="-1"
    aria-labelledby="winModalLabel"
    aria-hidden="true"
    data-bs-backdrop="static"
    data-bs-keyboard="false"
  >
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="winModalLabel">Новый рекорд!</h1>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Закрыть"
          ></button>
        </div>
        <div class="modal-body">
          <label for="userName">Введите свое имя: </label>
          <input
            type="text"
            id="userName"
            v-model="localUserName"
            placeholder="Начните ввод..."
            @input="updateUserName"
          />
        </div>
        <div class="modal-footer">
          <button
            type="button"
            class="btn btn-secondary"
            data-bs-dismiss="modal"
          >
            Закрыть
          </button>
          <button
            type="button"
            class="btn btn-primary"
            @click="saveRecord"
            :disabled="userName.trim() === ''"
          >
            Сохранить рекорд
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineProps, defineEmits } from "vue"
import { ref } from "vue" // Добавьте этот импорт

// Получаем пропсы
const props = defineProps({
  userName: String,
  saveRecord: Function,
})

// Эмитим обновление userName через событие
const emit = defineEmits(["update:userName"])

// Локальная переменная для userName
console.log(props.userName)
const localUserName = ref(props.userName)

// Эмитим изменение имени
function updateUserName() {
  emit("update:userName", localUserName.value)
}
</script>

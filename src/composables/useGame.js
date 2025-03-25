import { useRouter } from "vue-router"
import { reactive, ref, computed, onMounted } from "vue"
import { Modal } from "bootstrap"

export function useGame() {
  const router = useRouter()

  const leaderboard = () => router.push({ path: "/leaderboard" })

  const winModal = ref(null)
  const userName = ref("") // переменная для инпута
  const records = ref([]) // localStorage рекорды

  onMounted(() => {
    setMines()
    countMines()

    const modalElement = document.getElementById("winModal")

    if (modalElement) winModal.value = new Modal(modalElement)

    const saveRecords = localStorage.getItem(selectedLevel.value.name)

    if (saveRecords) {
      records.value = JSON.parse(saveRecords)
    }
  })

  const levels = [
    { name: "Простой", size: "8x8", mines: 10 },
    { name: "Средний", size: "16x16", mines: 40 },
    { name: "Сложный", size: "32x16", mines: 100 },
  ]

  const selectedLevel = ref(levels[0])

  function changeLevel(index) {
    selectedLevel.value = levels[index]
    restartGame()
  }

  const width = computed(
    () => selectedLevel.value.size.split("x").map(Number)[0]
  )
  const height = computed(
    () => selectedLevel.value.size.split("x").map(Number)[1]
  )

  const isDisabled = ref(false)

  let counterFlagged = ref(0)
  let counterOpenCells = 0

  const field = reactive(createField())

  function createField() {
    const field = []
    for (let i = 0; i < width.value * height.value; i++) {
      field.push({
        surroundingMines: 0,
        isMine: false,
        isOpen: false,
        isFlagged: false,
        isIssue: false,
      })
    }
    return field
  }

  let timerId = null
  let firstClick = true

  function setMines(numMines = selectedLevel.value.mines) {
    let mines = 0
    while (mines < numMines) {
      let randomIndex = Math.floor(field.length * Math.random())
      if (!field[randomIndex].isMine) {
        field[randomIndex].isMine = true
        mines++
      }
    }
  }

  function countMines() {
    for (let i = 0; i < field.length; i++) {
      if (!field[i].isMine) continue

      const neighbors = getNeighbors(i)

      neighbors.forEach((index) => {
        if (field[index]) field[index].surroundingMines++
      })
    }
  }

  function resetCountMines() {
    for (let i = 0; i < field.length; i++) {
      field[i].surroundingMines = 0
    }
  }

  function getNeighbors(i) {
    const neighbors = []
    const isLeftEdge = i % width.value === 0
    const isRightEdge = (i + 1) % width.value === 0
    const isTopEdge = i < width.value
    const isBottomEdge = i >= field.length - width.value

    if (!isLeftEdge) {
      neighbors.push(i - 1) // Слева
      if (!isTopEdge) neighbors.push(i - 1 - width.value) // Слева сверху
      if (!isBottomEdge) neighbors.push(i - 1 + width.value) // Слева снизу
    }
    if (!isRightEdge) {
      neighbors.push(i + 1) // Справа
      if (!isTopEdge) neighbors.push(i + 1 - width.value) // Справа сверху
      if (!isBottomEdge) neighbors.push(i + 1 + width.value) // Справа снизу
    }
    if (!isTopEdge) neighbors.push(i - width.value) // Сверху
    if (!isBottomEdge) neighbors.push(i + width.value) // Снизу

    return neighbors
  }

  function handleMouse(event) {
    let button = event.button
    if (button === 0) {
      openCell(event)
    } else if (button === 1) {
      event.preventDefault()
      checkAroundCell(event)
    } else if (button === 2) {
      changeState(event)
    }
  }

  function openCell(event) {
    if (!event.target.closest(".cell")) return

    const index = Number(event.target.closest(".cell").dataset.index)

    if (firstClick) {
      if (field[index].isMine) {
        resetCountMines()
        setMines(1)
        field[index].isMine = false
        countMines()
      }

      startTimer()
      firstClick = false
    }

    if (field[index].isOpen || field[index].isFlagged || field[index].isIssue)
      return

    field[index].isOpen = true
    checkWin()

    if (field[index].isMine) {
      field[index].isMine = true
      gameOver(index)
    } else if (field[index].surroundingMines === 0) {
      openEmptyCells(index)
    }
  }

  function checkAroundCell(event) {
    if (!event.target.closest(".cell")) return

    const index = Number(event.target.closest(".cell").dataset.index)

    if (
      !field[index].isOpen ||
      field[index].isFlagged ||
      field[index].isIssue
    ) {
      return
    }

    openAroundCells(index)
  }

  function openAroundCells(index) {
    const neighbors = getNeighbors(index)

    let countFlagged = 0
    neighbors.forEach((i) => {
      if (field[i].isFlagged) countFlagged++
    })

    if (field[index].surroundingMines !== countFlagged) return

    console.log(field[index].surroundingMines, countFlagged)

    neighbors.forEach((i) => {
      if (field[i].isOpen) return

      if (field[i].isMine && !field[i].isFlagged) {
        field[i].isOpen = true
        gameOver(i)
      } else {
        if (field[i].isFlagged) return
        field[i].isOpen = true
        checkWin()
        if (field[i].surroundingMines === 0) {
          openEmptyCells(i)
        }
      }
    })
  }

  function changeState(event) {
    if (!event.target.closest(".cell")) return

    if (firstClick) {
      startTimer()
      firstClick = false
    }

    const index = Number(event.target.closest(".cell").dataset.index)

    if (field[index].isOpen) return

    if (!field[index].isFlagged && !field[index].isIssue) {
      field[index].isFlagged = true
      counterFlagged.value++
    } else if (field[index].isFlagged) {
      field[index].isFlagged = false
      counterFlagged.value--
      field[index].isIssue = true
    } else {
      field[index].isIssue = false
    }
  }

  function openAllCells() {
    for (let i = 0; i < field.length; i++) {
      field[i].isOpen = true
    }
  }

  function gameOver() {
    clearInterval(timerId)
    isDisabled.value = true
    //После отрисовки ячейки
    setTimeout(() => {
      alert("💥 Вы проиграли!")
      openAllCells()
    })
  }

  function checkWin() {
    counterOpenCells++
    if (counterOpenCells === field.length - selectedLevel.value.mines) {
      win()
    }
  }

  function win() {
    clearInterval(timerId)
    isDisabled.value = true
    //После отрисовки ячейки
    setTimeout(() => {
      if (confirm("🏆 Вы победили. Хотите записать свой рекорд?")) setRecord()
      document.getElementById("winModal").removeAttribute("aria-hidden")
      openAllCells()
    })
  }

  function setRecord() {
    if (winModal.value) {
      document.getElementById("winModal").setAttribute("aria-hidden", "true")
      winModal.value.show()
    }
  }

  function saveRecord() {
    const newRecord = `${time.value} - ${userName.value}`

    records.value.push(newRecord)

    localStorage.setItem(
      selectedLevel.value.name,
      JSON.stringify(records.value)
    )

    winModal.value.hide()
    alert("Рекорд сохранен", newRecord)
  }

  function openEmptyCells(index) {
    const neighbors = getNeighbors(index)

    neighbors.forEach((i) => {
      if (field[i] && !field[i].isOpen) {
        field[i].isOpen = true
        checkWin()
        if (field[i].surroundingMines === 0) {
          openEmptyCells(i)
        }
      }
    })
  }

  let time = ref("00:00")

  function startTimer() {
    if (timerId) clearInterval(timerId)

    let seconds = 0
    timerId = setInterval(() => {
      seconds++
      let minutes = Math.floor(seconds / 60)
      let sec = seconds % 60
      time.value = `${String(minutes).padStart(2, "0")}:${String(sec).padStart(
        2,
        "0"
      )}`
    }, 1000)
  }

  function restartGame() {
    field.splice(0, field.length)
    Object.assign(field, createField())
    setMines()
    countMines()

    counterOpenCells = 0
    counterFlagged.value = 0
    firstClick = true
    isDisabled.value = false

    if (timerId) {
      clearInterval(timerId)
      time.value = "00:00"
    }
  }

  return {
    leaderboard,
    selectedLevel,
    levels,
    field,
    width,
    handleMouse,
    restartGame,
    counterFlagged,
    time,
    isDisabled,
    changeState,
    changeLevel,
    userName,
    saveRecord,
  }
}

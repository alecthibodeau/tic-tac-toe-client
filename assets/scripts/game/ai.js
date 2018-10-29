'use strict'

let randomCell = null

const randomCellRun = (cells) => {
  randomCell = Math.floor(Math.random() * 9)
  cellCheck(cells)
}

const cellCheck = (cells, onClickCell) => {
  if (cells[randomCell] === '') {
    makeAiCellPlayed(cells, onClickCell)
  } else {
    randomCellRun(cells, randomCell)
  }
}

const makeAiCellPlayed = (cells, onClickCell) => {
  cells[randomCell] = 'o'
  $(`#cell-${randomCell}`).addClass('o').addClass('played').unbind('click', onClickCell).html('o')
}

const aiTurn = (cells, onClickCell) => {
  // Play center square if it's available…
  if (cells[4] === '') {
    cells[4] = 'o'
    $('#cell-4').addClass('o').addClass('played').unbind('click', onClickCell).html('o')
  // Otherwise play an available random square…
  } else {
    randomCellRun(cells)
  }
}

module.exports = {
  aiTurn
}

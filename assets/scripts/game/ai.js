'use strict'

const events = require('./events')

let randomCell = null

const randomCellRun = (cells) => {
  console.log(`randomCell = ${randomCell}`)
  console.log('randomCellRun')
  randomCell = Math.floor(Math.random() * 9)
  console.log(`randomCell = ${randomCell}`)
  cellCheck(cells)
}

const cellCheck = (cells, onClickCell) => {
  console.log('cellCheck')
  console.log(`cells = ${cells}`)
  console.log(`randomCell = ${randomCell}`)
  if (randomCell === undefined) {
    console.log(randomCell)
  } else if (cells[randomCell] === '') {
    makeAiCellPlayed(cells, onClickCell)
  } else {
    randomCellRun(cells, randomCell)
  }
}

const makeAiCellPlayed = (cells, onClickCell) => {
  console.log('makeAiCellPlayed')
  cells[randomCell] = 'o'
  $(`#cell-${randomCell}`).addClass('o').addClass('played').unbind('click', events.onClickCell).html('o')
}

const aiTurn = (cells, onClickCell) => {
  if (cells[4] === '') {
    cells[4] = 'o'
    $('#cell-4').addClass('o').addClass('played').unbind('click', events.onClickCell).html('o')
    console.log(cells)
  } else {
    // countEmptyCells()
    randomCellRun(cells)
    console.log(`randomCell = ${randomCell}`)
    console.log(cells)
  }
}

module.exports = {
  aiTurn
}

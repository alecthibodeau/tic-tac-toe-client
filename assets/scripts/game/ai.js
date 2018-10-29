'use strict'

const logic = require('./logic')
let randomCell = null

// randomCellRun picks a random number between 0 and 8, \
// Then runs cellCheck with that number as randomCell…
const randomCellRun = (cells) => {
  console.log('randomCellRun runs')
  randomCell = Math.floor(Math.random() * 9)
  cellCheck(cells)
}

// cellCheck checks if the cell is unplayed. \
// It runs makeAiCellPlayed if unplayed
// It runs randomCellRun again if played…
const cellCheck = (cells, onClickCell) => {
  console.log('cellCheck runs')
  if (cells[randomCell] === '') {
    makeAiCellPlayed(cells, onClickCell)
  } else {
    randomCellRun(cells, randomCell)
  }
}

// makeAiCellPlayed 'plays' O's turn, \\
// By modifying the cells array \
// And the look and playability of the cell's square
const makeAiCellPlayed = (cells, onClickCell) => {
  console.log('makeAiCellPlayed runs')
  cells[randomCell] = 'o'
  $(`#cell-${randomCell}`).addClass('o').addClass('played').unbind('click', onClickCell).html('o')
  console.log(cells)
}

// aiTurn runs the AI's turn with a 1-second delay…
const aiTurn = (cells, over, turnCounter, gameData, cellsIndex, playerPiece, onClickCell) => {
  console.log('aiTurn runs')
  // Play center square if it's available…
  setTimeout(function () {
    if (cells[4] === '') {
      cells[4] = 'o'
      $('#cell-4').addClass('o').addClass('played').unbind('click', onClickCell).html('o')
      // Otherwise play an available random square…
    } else {
      randomCellRun(cells)
    }
    logic.checkForMatch(cells, over, turnCounter, gameData, cellsIndex, playerPiece, onClickCell)
  }, 1000)
}

module.exports = {
  aiTurn
}

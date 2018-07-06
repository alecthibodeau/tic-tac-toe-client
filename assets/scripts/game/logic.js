'use strict'

const api = require('./api')
const ui = require('./ui')

const checkForMatch = function (cells, winValue, over, turnCounter, gameData, cellsIndex, playerPiece, onClickCell) {
  for (let i = 0; i <= 6; i = i + 3) {
    if ((cells[i] !== '') && (cells[i] === cells[i + 1]) && (cells[i] === cells[i + 2])) {
      winValue = cells[i] // rows win
      over = true
    }
  }
  for (let i = 0; i <= 2; i = i + 1) {
    if ((cells[i] !== '') && (cells[i] === cells[i + 3]) && (cells[i] === cells[i + 6])) {
      winValue = cells[i] // columns win
      over = true
    }
  }
  if ((cells[4] !== '') && (((cells[0] === cells[4]) && (cells[0] === cells[8])) || ((cells[2] === cells[4]) && (cells[2] === cells[6])))) {
    winValue = cells[4] // diagonals win
    over = true
  } else if (turnCounter === 9) { // draw
    over = true
  }
  api.updateGame(gameData, cellsIndex, playerPiece, over)
    .then((result) => {
      console.log(result)
    })
    .catch((err) => {
      console.log(err)
    })
  if (over === true) {
    ui.gameNotice(winValue, over, onClickCell)
  }
}

// I realize I'm repeating here the code from above (for active games that require repeat checking).
// But I havent yet found a way to merge the same logic into one function for games that are either active or over.
const checkStatsForMatch = function (cells, statsWinValue) {
  for (let i = 0; i <= 6; i = i + 3) {
    if ((cells[i] !== '') && (cells[i] === cells[i + 1]) && (cells[i] === cells[i + 2])) {
      statsWinValue = cells[i].toUpperCase() + ' won'// rows win
    }
  }
  for (let i = 0; i <= 2; i = i + 1) {
    if ((cells[i] !== '') && (cells[i] === cells[i + 3]) && (cells[i] === cells[i + 6])) {
      statsWinValue = cells[i].toUpperCase() + ' won'// columns win
    }
  }
  if ((cells[4] !== '') && (((cells[0] === cells[4]) && (cells[0] === cells[8])) || ((cells[2] === cells[4]) && (cells[2] === cells[6])))) {
    statsWinValue = cells[4].toUpperCase() + ' won'// diagonals win
  }
  // } else if ((winValue !== 'x') || (winValue !== 'o')) { // draw
  //   winValue = 'draw'
  // }
  return statsWinValue
}

module.exports = {
  checkForMatch,
  checkStatsForMatch
}

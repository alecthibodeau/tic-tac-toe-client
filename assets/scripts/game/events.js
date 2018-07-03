'use strict'

let over = false
let turnCounter = 0
let playerPiece = null
let winValue = null
let cells = ['', '', '', '', '', '', '', '', '']

const gameNotice = function () {
  if ((winValue === 'x') || (winValue === 'o')) {
    $('.board-grid').addClass(`${winValue}-won`)
    document.querySelector('#new-game').innerHTML = `player ${winValue} wins!`
    return endNotice()
  } else if (turnCounter === 9) {
    document.querySelector('#new-game').innerHTML = `it's a draw!`
    endNotice()
  }
}

const endNotice = function () {
  over = true
  // console.log(`Is game REALLY over? ${over}`)
  $('.board-cell').off('click', onClickCell)
  $('.board-cell').addClass('game-over')
  setTimeout(function () { document.querySelector('#new-game').innerHTML = 'new game' }, 5000)
}

const checkForMatch = function (event) {
  for (let i = 0; i <= 6; i = i + 3) {
    if ((cells[i] !== '') && (cells[i] === cells[i + 1]) && (cells[i] === cells[i + 2])) {
      winValue = cells[i] // rows win
    }
  }
  for (let i = 0; i <= 2; i = i + 1) {
    if ((cells[i] !== '') && (cells[i] === cells[i + 3]) && (cells[i] === cells[i + 6])) {
      winValue = cells[i] // columns win
    }
  }
  if ((cells[4] !== '') && (((cells[0] === cells[4]) && (cells[0] === cells[8])) || ((cells[2] === cells[4]) && (cells[2] === cells[6])))) {
    winValue = cells[4] // diagonals win
  }
  gameNotice()
}

const onClickCell = function (event) {
  event.preventDefault()
  turnCounter % 2 === 0 ? playerPiece = 'x' : playerPiece = 'o'
  cells[this.getAttribute('data-id')] = playerPiece
  $(this).addClass(`${playerPiece}`)
  $(this).addClass('played')
  $(this).unbind('click', onClickCell)
  document.querySelector('#' + this.getAttribute('id')).innerHTML = playerPiece
  console.log(`cell index: ${this.getAttribute('data-id')}`)
  console.log(`Win value: ${winValue}`)
  console.log(`Cells array: ${cells}`)
  console.log(`Game is over? ${over}`)
  turnCounter++
  if (turnCounter >= 5) {
    checkForMatch()
  }
}

const onClickNewGame = function (event) {
  event.preventDefault()
  newGame()
  $('.board-cell').on('click', onClickCell)
}

const newGame = function (event) {
  $('.board-grid').removeClass(`${winValue}-won`)
  over = false
  turnCounter = 0
  winValue = null
  cells = ['', '', '', '', '', '', '', '', '']
  document.querySelector('#game-board').innerHTML = ''
  for (let i = 0; i < cells.length; i++) {
    const cellElement = document.createElement('div')
    cellElement.setAttribute('class', 'board-cell')
    cellElement.setAttribute('data-id', i)
    cellElement.setAttribute('id', 'cell-' + i)
    document.getElementById('game-board').appendChild(cellElement)
  }
  console.log('Board created. New game is ready.')
}

module.exports = {
  newGame,
  onClickCell,
  onClickNewGame
}

// event listeners which bind handlers to events on elements
// two types:
//   API request handlers
//   UI handlers

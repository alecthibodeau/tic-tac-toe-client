'use strict'

let over = false
let turnCounter = 0
let playerXMoves = []
let playerOMoves = []
let playerPiece = null
let winValue = null
let cells = ['', '', '', '', '', '', '', '', '']
const cellsCoord = [[0, 0], [0, 1], [0, 2], [1, 0], [1, 1], [1, 2], [2, 0], [2, 1], [2, 2]]

const endNotice = function (event) {
  over = true
  console.log(`Is game REALLY over? ${over}`)
  console.log(`Win value: ${winValue}`)
  $('.board-cell').off('click', onClickCell)
  $('.board-cell').addClass('game-over')
  setTimeout(function () { document.querySelector('#new-game').innerHTML = 'NEW GAME' }, 5000)
}

const checkForMatch = function (event) {
  for (let i = 0; i <= 6; i = i + 3) {
    if ((cells[i] !== '') && (cells[i] === cells[i + 1]) && (cells[i] === cells[i + 2])) {
      winValue = cells[i] // rows win
      console.log('rows win')
    }
  }
  for (let i = 0; i <= 2; i = i + 1) {
    if ((cells[i] !== '') && (cells[i] === cells[i + 3]) && (cells[i] === cells[i + 6])) {
      winValue = cells[i] // columns win
      console.log('columns win')
    }
  }
  if ((cells[4] !== '') && (((cells[0] === cells[4]) && (cells[0] === cells[8])) || ((cells[2] === cells[4]) && (cells[2] === cells[6])))) {
    winValue = cells[4] // diagonals win
    console.log('diagonals win')
  }
  if ((winValue === 'x') || (winValue === 'o')) {
    if (winValue === 'x') {
      $('.board-grid').addClass('x-won')
    } else if (winValue === 'o') {
      $('.board-grid').addClass('o-won')
    }
    console.log(`Player ${winValue.toUpperCase()} wins!`)
    document.querySelector('#new-game').innerHTML = `PLAYER ${winValue.toUpperCase()} WINS!`
    return endNotice()
  } else if (playerXMoves.length + playerOMoves.length === 9) {
    document.querySelector('#new-game').innerHTML = `IT'S A DRAW!`
    console.log(`It's a draw!`)
    endNotice()
  }
}

const onClickCell = function (event) {
  event.preventDefault()
  console.log('cell clicked')
  turnCounter % 2 === 0 ? playerPiece = 'x' : playerPiece = 'o'
  cells[this.getAttribute('data-id')] = playerPiece
  if (playerPiece === 'x') {
    playerXMoves.push(cellsCoord[this.getAttribute('data-id')])
    $(this).addClass('x')
  } else if (playerPiece === 'o') {
    playerOMoves.push(cellsCoord[this.getAttribute('data-id')])
    $(this).addClass('o')
  }
  document.querySelector('#' + this.getAttribute('id')).innerHTML = playerPiece.toUpperCase()
  $(this).unbind('click', onClickCell)
  $(this).addClass('played')
  console.log(`User selected ${playerPiece.toUpperCase()} on cell ${this.getAttribute('data-id')}`)
  console.log(`Player X's moves are : ${playerXMoves}`)
  console.log(`Player O's moves are : ${playerOMoves}`)
  console.log(`Number of Player X's moves: ${playerXMoves.length}`)
  console.log(`Number of Player O's moves: ${playerOMoves.length}`)
  console.log(`cell index: ${this.getAttribute('data-id')}`)
  console.log(`Win value: ${winValue}`)
  console.log(`Cells array: ${cells}`)
  console.log(`Game is over? ${over}`)
  turnCounter++
  if (playerXMoves.length + playerOMoves.length >= 5) {
    checkForMatch()
  }
}

const newGame = function (event) {
  // event.preventDefault()
  over = false
  turnCounter = 0
  playerXMoves = []
  playerOMoves = []
  playerPiece = null
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
  onClickCell
}

// event listeners which bind handlers to events on elements
// two types:
//   API request handlers
//   UI handlers

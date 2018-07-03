'use strict'

const api = require('./api')
const store = require('../store')

let gameData = null
let cellsIndex = null
let over = false
let turnCounter = 0
let playerPiece = null
let winValue = null
let cells = ['', '', '', '', '', '', '', '', '']

const gameNotice = function () {
  if ((winValue === 'x') || (winValue === 'o')) {
    $('.board-grid').addClass(`${winValue}-won`)
    $('.game-status-area').text(`player ${winValue} wins!`).addClass('game-result')
    return endState()
  } else if (turnCounter === 9) {
    $('.game-status-area').text(`it's a draw!`).addClass('game-result')
    endState()
  }
}

const endState = function () {
  over = true
  console.log(`Is game REALLY over? ${over}`)
  $('.board-cell').off('click', onClickCell).addClass('game-over')
}

const checkForMatch = function (event) {
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
  }
  api.updateGame(gameData, cellsIndex, playerPiece, over)
    .then((result) => {
      console.log(result)
    })
    .catch((err) => {
      console.log(err)
    })
  if (over === true) {
    gameNotice()
  }
}

const onClickCell = function (event) {
  event.preventDefault()
  cellsIndex = this.getAttribute('data-id')
  turnCounter % 2 === 0 ? playerPiece = 'x' : playerPiece = 'o'
  turnCounter % 2 !== 0 ? $('#game-status').text('player x goes').removeClass('o') : $('#game-status').text('player o goes').addClass('o')
  cells[cellsIndex] = playerPiece
  $(this).addClass(`${playerPiece}`).addClass('played').unbind('click', onClickCell)
  document.querySelector('#' + this.getAttribute('id')).innerHTML = playerPiece
  console.log(`cell index: ${cellsIndex}`)
  console.log(`Win value: ${winValue}`)
  console.log(`Cells array: ${cells}`)
  console.log(`Game is over? ${over}`)
  turnCounter++
  checkForMatch()
}

const onClickNewGame = function (event) {
  $('.board-grid').removeClass(`${winValue}-won`).addClass('playable')
  event.preventDefault()
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
  $('.game-status-area').removeClass('game-result').removeClass('o').text('player x goes').addClass('playable')
  $('.board-cell').on('click', onClickCell)
  console.log('Board created. New game is ready.')

  api.createGame()
    .then((result) => {
      console.log(result)
      gameData = result
    })
    .catch((err) => {
      console.log(err)
    })
}

module.exports = {
  onClickNewGame
}

// event listeners which bind handlers to events on elements
// two types:
//   API request handlers
//   UI handlers

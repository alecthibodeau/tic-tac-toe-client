'use strict'

const api = require('./api')
const logic = require('./logic')

let over = false
let turnCounter = 0
let gameData = null
let cellsIndex = null
let playerPiece = null
let winValue = null
let cells = ['', '', '', '', '', '', '', '', '']

// Game logic is now in separate file: logic.js. Game ui is now in separate file: ui.js
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
  logic.checkForMatch(cells, winValue, over, turnCounter, gameData, cellsIndex, playerPiece, onClickCell)
}

const onClickNewGame = function (event) {
  $('.board-grid').removeClass(`${winValue}-won`).addClass('playable')
  event.preventDefault()
  over = false
  turnCounter = 0
  winValue = null
  cells = ['', '', '', '', '', '', '', '', '']
  $('#game-board').html('')
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

const onRetrieveOverGames = function () {
  api.retrieveOverGames()
    .then((result) => {
      const statsOverGames = result
      console.log(statsOverGames)
      console.log(over)
      for (let i = 0; i < statsOverGames.games.length; i++) {
        const overGamesElement = document.createElement('div')
        overGamesElement.setAttribute('id', 'stats-games-over-' + i)
        document.getElementById('stats-games-over').appendChild(overGamesElement)
        document.getElementById('stats-games-over-' + i).innerHTML = 'Game #' + (i + 1) + ' &nbsp|&nbsp Result: ' + logic.checkStatsForMatch(statsOverGames.games[i].cells, 'draw') + ' &nbsp|&nbsp Moves: ' + statsOverGames.games[i].cells
      }
    })
    .catch((err) => {
      console.log(err)
    })
}

const addGameHandlers = () => {
  $('#new-game').on('click', onClickNewGame)
  $('#retrieve-games').on('click', onRetrieveOverGames)
}

module.exports = {
  addGameHandlers
}

// event listeners which bind handlers to events on elements
// two types:
//   API request handlers
//   UI handlers

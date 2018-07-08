'use strict'

const api = require('./api')
const logic = require('./logic')

let over = false
let turnCounter = 0
let gameData = null
let cellsIndex = null
let playerPiece = null
let cells = ['', '', '', '', '', '', '', '', '']

// Game logic is now in separate file: logic.js. Game ui is now in separate file: ui.js
const onClickCell = function (event) {
  event.preventDefault()
  cellsIndex = this.getAttribute('data-id')
  turnCounter % 2 === 0 ? playerPiece = 'x' : playerPiece = 'o'
  turnCounter % 2 !== 0 ? $('#game-status').text(`player x's turn`).removeClass('o') : $('#game-status').text(`player o's turn`).addClass('o')
  cells[cellsIndex] = playerPiece
  $(this).addClass(`${playerPiece}`).addClass('played').unbind('click', onClickCell)
  document.querySelector('#' + this.getAttribute('id')).innerHTML = playerPiece
  console.log(`cell index: ${cellsIndex}`)
  // console.log(`Win value: ${winValue}`)
  console.log(`Cells array: ${cells}`)
  console.log(`Game is over? ${over}`)
  turnCounter++
  logic.checkForMatch(cells, over, turnCounter, gameData, cellsIndex, playerPiece, onClickCell)
}

const createGameBoard = function () {
  for (let i = 0; i < cells.length; i++) {
    const elementCell = document.createElement('div')
    elementCell.setAttribute('class', 'board-cell')
    elementCell.setAttribute('data-id', i)
    elementCell.setAttribute('id', 'cell-' + i)
    document.getElementById('game-board').appendChild(elementCell)
  }
  $('.board-cell').addClass('page-load')
  console.log('Board created.')
}

const onClickNewGame = function (event) {
  event.preventDefault()
  over = false
  turnCounter = 0
  cells = ['', '', '', '', '', '', '', '', '']
  $('#game-board').html('')
  createGameBoard()
  $('.board-grid').removeClass('x-won').removeClass('o-won')
  $('.game-status-area').removeClass('game-result').removeClass('o').text(`player x's turn`).addClass('playable')
  $('.board-cell').on('click', onClickCell).removeClass('page-load').removeClass('played').removeClass('game-over')
  $('.initial-new-game').css('display', 'none')
  $('.game-status-area').addClass('playable')
  console.log('New game is ready.')

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
  event.preventDefault()
  let xStatsWins = null
  let oStatsWins = null
  let drawGames = null
  api.retrieveOverGames()
    .then((result) => {
      const statsOverGames = result
      console.log(statsOverGames)
      console.log(over)
      for (let i = 0; i < statsOverGames.games.length; i++) {
        const elementGamesOver = document.createElement('div')
        elementGamesOver.setAttribute('id', 'stats-games-over-' + i)
        elementGamesOver.setAttribute('class', 'states-games-over-element')
        document.getElementById('stats-games-over').appendChild(elementGamesOver)
        document.getElementById('stats-games-over-' + i).innerHTML = 'Game #' + (i + 1) + '… ' + logic.checkStatsForMatch(statsOverGames.games[i].cells, 'draw') + ' with these moves: ' + statsOverGames.games[i].cells
        if (logic.checkStatsForMatch(statsOverGames.games[i].cells, 'draw') === 'X won') {
          xStatsWins = (xStatsWins + 1)
        } else if (logic.checkStatsForMatch(statsOverGames.games[i].cells, 'draw') === 'O won') {
          oStatsWins = (oStatsWins + 1)
        } else {
          drawGames = (drawGames + 1)
        }
      }
      document.getElementById('stats-sum-games-over').innerHTML = `Games X has won: ${xStatsWins} | Games O has won: ${oStatsWins} | Draws: ${drawGames}`
    })
    .catch((err) => {
      console.log(err)
    })
}

const addGameHandlers = () => {
  $('#new-game').on('click', onClickNewGame)
  $('#retrieve-games').on('click', onRetrieveOverGames)
  $('#sign-up').hide()
  $('#sign-in').hide()
  $('#change-password').hide()
  $('#sign-out').hide()

  $('#nav-change-password').hide()
  $('#nav-game-stats').hide()
  $('#nav-sign-out').hide()

  $('#nav-sign-up').on('click', function () {
    $('#sign-up').slideToggle(200)
    $('#sign-in').hide({ direction: 'down' })
  })
  $('#nav-sign-in').on('click', function () {
    $('#sign-in').slideToggle(200)
    $('#sign-up').hide({ direction: 'down' })
  })
  $('#nav-change-password').on('click', function () {
    $('#change-password').slideToggle(200)
  })
  $('#nav-sign-out').on('click', function () {
    $('#sign-out').slideToggle(200)
  })
  // $('#game-board').html('')
  // $('.initial-new-game').on('click', onClickNewGame)
}

module.exports = {
  createGameBoard,
  addGameHandlers
}

// event listeners which bind handlers to events on elements
// two types:
//   API request handlers
//   UI handlers

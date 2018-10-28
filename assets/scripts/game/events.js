'use strict'

const api = require('./api')
const logic = require('./logic')
const store = require('../store')

store.user = null
store.preGame = true

let over = false
let turnCounter = 0
let gameData = null
let cellsIndex = null
let playerPiece = null
let cells = ['', '', '', '', '', '', '', '', '']
let randomCell = null
// let emptyCells = 8
//
// const countEmptyCells = () => {
//   for (let i = 0; i < cells.length; i++) {
//     if (cells[i] === '') {
//       emptyCells = emptyCells--
//     }
//   }
// }

const randomCellRun = () => {
  console.log('randomCellRun')
  randomCell = Math.floor(Math.random() * 9)
  console.log(randomCell)
  cellCheck()
}

const cellCheck = () => {
  console.log('cellCheck')
  if (cells[randomCell] === '') {
    makeAiCellPlayed()
  } else {
    randomCellRun()
  }
}

const makeAiCellPlayed = () => {
  console.log('makeAiCellPlayed')
  cells[randomCell] = 'o'
  $(`#cell-${randomCell}`).addClass('o').addClass('played').unbind('click', onClickCell).html('o')
}

const aiTurn = () => {
  if (cells[4] === '') {
    cells[4] = 'o'
    $('#cell-4').addClass('o').addClass('played').unbind('click', onClickCell).html('o')
    console.log(cells)
  } else {
    // countEmptyCells()
    randomCellRun()
    console.log(randomCell)
    console.log(cells)
  }
  turnCounter++
  console.log(`O just played and turnCounter = ${turnCounter} and playerPiece = ${playerPiece}`)
}

// Game logic is now in separate file: logic.js. Game ui is now in separate file: ui.js
const onClickCell = function (event) {
  console.log('onClickCell')
  console.log(`turnCounter at start of turn = ${turnCounter}`)
  event.preventDefault()
  cellsIndex = this.getAttribute('data-id')
  turnCounter % 2 === 0 ? playerPiece = 'x' : playerPiece = 'o'
  console.log(`It's ${playerPiece}'s turn`)
  cells[cellsIndex] = playerPiece
  $(this).addClass(`${playerPiece}`).addClass('played').unbind('click', onClickCell)
  document.querySelector('#' + this.getAttribute('id')).innerHTML = playerPiece
  // console.log(`cell index: ${cellsIndex}`)
  // console.log(`Cells array: ${cells}`)
  // console.log(`Game is over? ${over}`)
  // emptyCells--
  turnCounter++
  console.log(`X just played and turnCounter = ${turnCounter} and playerPiece = ${playerPiece}`)
  logic.checkForMatch(cells, over, turnCounter, gameData, cellsIndex, playerPiece, onClickCell)
  if (turnCounter < 9) {
    aiTurn()
    logic.checkForMatch(cells, over, turnCounter, gameData, cellsIndex, playerPiece, onClickCell)
  }
  turnCounter % 2 !== 0 ? $('#player-turn-piece').text('o') : $('#player-turn-piece').text('x')
}

const animateGameBoard = function () {
  console.log('animateGameBoard')
  $('.board-cell').addClass('starting-blue')
  for (let i = 0; i < 9; i++) {
    if (i % 2 === 0) {
      $(`#cell-${i}`).addClass('pre-game')
    } else if (i % 2 !== 0) {
      setTimeout(function () {
        // This 'if' statement is necessary because: If a user manages to sign in and start a new game within one second the board keeps animating.
        if (store.preGame) {
          $(`#cell-${i}`).addClass('pre-game')
        }
      }, 1000)
    }
  }
}

const createGameBoard = function () {
  console.log('createGameBoard')
  for (let i = 0; i < cells.length; i++) {
    const elementCell = document.createElement('div')
    elementCell.setAttribute('class', 'board-cell')
    elementCell.setAttribute('data-id', i)
    elementCell.setAttribute('id', 'cell-' + i)
    document.getElementById('game-board').appendChild(elementCell)
  }
  $('.board-cell').addClass('played').addClass('game-over')
  if (store.preGame) {
    animateGameBoard()
  }
}

const createBackground = function () {
  for (let i = 0; i < 10; i++) {
    const backgroundBar = document.createElement('div')
    backgroundBar.setAttribute('class', 'background-bar')
    $(backgroundBar).addClass(`bg-bar-${i}`)
    document.getElementById('background-container').appendChild(backgroundBar)
  }
}

const setNewGame = function () {
  // console.log('setNewGame runs.')
  // console.log(store.user)
  store.preGame = false
  over = false
  turnCounter = 0
  cells = ['', '', '', '', '', '', '', '', '']
  $('#game-board').html('')
  createGameBoard()
  $('.board-grid').attr('class', 'board-grid').addClass('playable')
  $('.player-turn-line').attr('class', 'player-turn-line').addClass('playable').html(`Player <span id="player-turn-piece">x</span>'s turn`)
  $('.board-cell').on('click', onClickCell).removeClass('pre-game').removeClass('starting-blue').removeClass('played').removeClass('game-over')
  if (store.user !== null) {
    api.createGame()
      .then((result) => {
        // console.log(result)
        gameData = result
      })
      .catch((err) => {
        console.log(err)
      })
  }
}

const onClickNewGame = function (event) {
  event.preventDefault()
  setNewGame()
}

const onRetrieveOverGames = function () {
  event.preventDefault()
  let statsOverGames = null
  let xStatsWins = null
  let oStatsWins = null
  let drawGames = null
  api.retrieveOverGames()
    .then((result) => {
      statsOverGames = result
      // console.log(statsOverGames)
      // console.log(over)
      for (let i = 0; i < statsOverGames.games.length; i++) {
        // The following commented-out lines are for returning individual game results:
        // The code runs as expected druing development, but returns unordered results from the production API.
        // I'm leaving it out for now…
        // const elementGamesOver = document.createElement('div')
        // elementGamesOver.setAttribute('id', 'stats-games-over-' + i)
        // elementGamesOver.setAttribute('class', 'states-games-over-element')
        // document.getElementById('stats-games-over').appendChild(elementGamesOver)
        // document.getElementById('stats-games-over-' + i).innerHTML = 'Game #' + (i + 1) + '… ' + logic.checkStatsForMatch(statsOverGames.games[i].cells, 'Draw') + ' with these moves: ' + statsOverGames.games[i].cells
        if (logic.checkStatsForMatch(statsOverGames.games[i].cells, 'draw') === 'X won') {
          xStatsWins = (xStatsWins + 1)
        } else if (logic.checkStatsForMatch(statsOverGames.games[i].cells, 'draw') === 'O won') {
          oStatsWins = (oStatsWins + 1)
        } else {
          drawGames = (drawGames + 1)
        }
      }
      if (xStatsWins === null) {
        xStatsWins = 0
      }
      if (oStatsWins === null) {
        oStatsWins = 0
      }
      if (drawGames === null) {
        drawGames = 0
      }
      const totalGamesPlayed = xStatsWins + oStatsWins + drawGames
      document.getElementById('stats-title-total-games-played').innerHTML = 'Total games played:'
      document.getElementById('stats-value-total-games-played').innerHTML = `${totalGamesPlayed}`
      document.getElementById('stats-value-x-wins').innerHTML = `${xStatsWins}`
      document.getElementById('stats-value-o-wins').innerHTML = `${oStatsWins}`
      document.getElementById('stats-value-draws').innerHTML = `${drawGames}`
    })
    .catch((err) => {
      console.log(err)
    })
}

const newGamePrep = (event) => {
  $('.game-information-area').show()
  $('.intro-text').hide()
  onClickNewGame(event)
}

const toggleNavDrawer = () => {
  $('.nav-drawer').slideToggle(200)
}

const addGameHandlers = () => {
  $('.game-title').click((event) => {
    $('.intro-text').toggle()
  })
  $('#new-game').click((event) => {
    newGamePrep(event)
  })
  $('.board-grid').click((event) => {
    if (store.preGame) {
      newGamePrep(event)
    }
  })
  $('#nav-game-stats').on('click', onRetrieveOverGames)
  $('.user-buttons').hide()

  $('.nav-drawer').hide()
  $('#user-account-button').click(function () {
    toggleNavDrawer()
  })

  $('#nav-change-password').click(toggleNavDrawer)
  $('#nav-sign-out').click(toggleNavDrawer)
}

module.exports = {
  createBackground,
  createGameBoard,
  animateGameBoard,
  setNewGame,
  addGameHandlers
}

// event listeners which bind handlers to events on elements
// two types:
//   API request handlers
//   UI handlers

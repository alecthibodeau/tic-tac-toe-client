'use strict'

const store = require('../store')

let sessionGamesX = 0
let sessionGamesO = 0
let sessionGamesDraw = 0

const updateSession = function () {
  console.log(sessionGamesX)
  $('.score-board').html(`X wins: ${sessionGamesX} | O wins: ${sessionGamesO} | Draws: ${sessionGamesDraw} `)
}

const onClickResetSession = function () {
  sessionGamesX = 0
  sessionGamesO = 0
  sessionGamesDraw = 0
  updateSession()
}

const addWinValue = (winValue) => {
  $('.board-grid').addClass(`${winValue}-won`)
  $('.player-turn-line').html(`player ${winValue} wins!`).addClass(`${winValue}`)
}

const gameNotice = function (over, winValue) {
  $('#reset-score-button').on('click', onClickResetSession)
  if (winValue === 'x') {
    addWinValue(winValue)
    sessionGamesX++
    store.winningX = true
  } else if (winValue === 'o') {
    addWinValue(winValue)
    sessionGamesO++
  } else {
    $('.player-turn-line').html(`it's a draw!`).addClass('its-a-draw')
    sessionGamesDraw++
  }
  updateSession()
}

module.exports = {
  gameNotice,
  onClickResetSession
}

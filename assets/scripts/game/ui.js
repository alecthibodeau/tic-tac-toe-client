'use strict'

let sessionGamesX = 0
let sessionGamesO = 0
let sessionGamesDraw = 0

const updateSession = function (sessionGamesX, sessionGamesO, sessionGamesDraw) {
  $('.score-board').html(`X wins: ${sessionGamesX} | O wins: ${sessionGamesO} | Draws: ${sessionGamesDraw} `)
}

const onClickResetSession = function () {
  sessionGamesX = 0
  sessionGamesO = 0
  sessionGamesDraw = 0
  updateSession(sessionGamesX, sessionGamesO, sessionGamesDraw)
}

const gameNotice = function (winValue, over, onClickCell) {
  if ((winValue === 'x') || (winValue === 'o')) {
    $('.board-grid').addClass(`${winValue}-won`)
    $('.player-turn-line').html(`player ${winValue} wins!`).addClass(`${winValue}`)
  } else {
    $('.player-turn-line').html(`it's a draw!`).addClass('its-a-draw')
  }
  $('.board-cell').off('click', onClickCell).addClass('game-over')
  // console.log(`Is game REALLY over? ${over}`)
  if (winValue === 'x') sessionGamesX++
  if (winValue === 'o') sessionGamesO++
  if (winValue === null) sessionGamesDraw++
  $('#reset-score-button').on('click', onClickResetSession)
  updateSession(sessionGamesX, sessionGamesO, sessionGamesDraw)
}

module.exports = {
  gameNotice,
  onClickResetSession
}

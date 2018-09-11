'use strict'

let sessionGamesX = 0
let sessionGamesO = 0
let sessionGamesDraw = 0

const updateSession = function (sessionGamesX, sessionGamesO, sessionGamesDraw) {
  $('.session-stats').html(`X wins: ${sessionGamesX} | O wins: ${sessionGamesO} | Draws: ${sessionGamesDraw} `)
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
    $('.game-status-area').text(`player ${winValue} wins!`).addClass('game-result-text-color')
  } else {
    $('.game-status-area').text(`it's a draw!`).addClass('game-result-text-color')
  }
  $('.board-cell').off('click', onClickCell).addClass('game-over')
  // console.log(`Is game REALLY over? ${over}`)
  if (winValue === 'x') sessionGamesX++
  if (winValue === 'o') sessionGamesO++
  if (winValue === null) sessionGamesDraw++
  $('#session-reset-btn').on('click', onClickResetSession)
  updateSession(sessionGamesX, sessionGamesO, sessionGamesDraw)
}

module.exports = {
  gameNotice,
  onClickResetSession
}

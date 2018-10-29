'use strict'

let sessionGamesX = 0
let sessionGamesO = 0
let sessionGamesDraw = 0

const updateSession = function () {
  $('.score-board').html(`X wins: ${sessionGamesX} | O wins: ${sessionGamesO} | Draws: ${sessionGamesDraw} `)
}

const onClickResetSession = function () {
  sessionGamesX = 0
  sessionGamesO = 0
  sessionGamesDraw = 0
  updateSession()
}

const gameNotice = function (winValue) {
  if ((winValue === 'x') || (winValue === 'o')) {
    $('.board-grid').addClass(`${winValue}-won`)
    $('.player-turn-line').html(`player ${winValue} wins!`).addClass(`${winValue}`)
    if (winValue === 'x') {
      sessionGamesX++
      console.log(`sessionGamesX = ${sessionGamesX}`)
    }
    if (winValue === 'o') { sessionGamesO++ }
  } else {
    $('.player-turn-line').html(`it's a draw!`).addClass('its-a-draw')
    sessionGamesDraw++
  }
  $('#reset-score-button').on('click', onClickResetSession)
  updateSession()
}

module.exports = {
  gameNotice,
  onClickResetSession
}

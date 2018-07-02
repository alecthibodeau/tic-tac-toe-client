'use strict'

// use require with a reference to bundle the file and use it in this file
// const example = require('./example')
//
// use require without a reference to ensure a file is bundled
// require('./example')
//
// const squareEvents = require('./gameplay')
//
// $(() => {
//   // your JS code goes here
//   $('#square-0-0').on('click', squareEvents.onClickSquare)
// })
//
// const authEvents = require('../../curl-scripts/events')
//

const authEvents = require('./auth/events')
const gameEvents = require('./game/events')

const newGameClick = function (e) {
  e.preventDefault()
  gameEvents.newGame()
  $('.board-cell').on('click', gameEvents.onClickCell)
}

// On document ready
$(() => {
  authEvents.addHandlers()
  gameEvents.newGame()
  $('.board-cell').on('click', gameEvents.onClickCell)
  $('#new-game').on('click', newGameClick)
})

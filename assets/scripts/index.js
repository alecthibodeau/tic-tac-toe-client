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

// On document ready
$(() => {
  authEvents.addAuthHandlers()
  gameEvents.addGameHandlers()
  gameEvents.createGameBoard()
  $('body').on('hidden.bs.modal', '.modal', function () {
    $(this).find('input[type="text"],input[type="email"],input[type="password"],textarea,select').each(function () {
      if (this.defaultValue !== '' || this.value !== this.defaultValue) {
        this.value = this.defaultValue
      } else { this.value = '' }
    })
  })
})

'use strict'

const config = require('../config')
const store = require('../store')

const createGame = function () {
  const game = {
    'game': {
      'cells': ['', '', '', '', '', '', '', '', ''],
      'over': false,
      'player_x': {
        'id': store.user.id,
        'email': store.user.email
      },
      'player_o': null
    }
  }
  console.log(store.user.id)
  console.log(store.user.email)
  return $.ajax({
    url: config.apiUrl + '/games',
    method: 'POST',
    headers: {
      Authorization: 'Token token=' + store.user.token
    },
    data: JSON.stringify(game)
  })
}

const updateGame = function (gameData, index, value, over) {
  console.log(index, value, over)

  const game = {
    'game': {
      'cell': {
        'index': index,
        'value': value
      },
      'over': over
    }
  }
  console.log(store.user.id)
  console.log(store.user.email)
  console.log(gameData.game.id)

  return $.ajax({
    url: config.apiUrl + '/games/' + gameData.game.id,
    method: 'PATCH',
    contentType: 'application/json; charset=utf-8',
    headers: {
      Authorization: 'Token token=' + store.user.token
    },
    data: JSON.stringify(game)
  })
}

module.exports = {
  createGame,
  updateGame
}

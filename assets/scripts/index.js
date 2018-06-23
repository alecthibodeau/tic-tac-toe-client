'use strict'

// use require with a reference to bundle the file and use it in this file
// const example = require('./example')

// use require without a reference to ensure a file is bundled
// require('./example')

// const squareEvents = require('./gameplay')
//
// $(() => {
//   // your JS code goes here
//   $('#square-0-0').on('click', squareEvents.onClickSquare)
// })

const newGame = function () {
  console.log('Got to new game.')
  document.querySelector('#game-board').innerHTML = ''
  document.getElementById('new-game').style.color = '0ff' // This is for resetting link color after the click has occurred so it doesn't remain in the hover state
  // squaresInPlay = []
  createBoard()
}

const squares = [[0, 0], [0, 1], [0, 2], [1, 0], [1, 1], [1, 2], [2, 0], [2, 1], [2, 2]]

const createBoard = function () {
  for (let i = 0; i < squares.length; i++) {
    const squareElement = document.createElement('div')
    squareElement.setAttribute('class', 'board-square')
    squareElement.innerHTML = i
    document.getElementById('game-board').appendChild(squareElement)
  }
  document.getElementById('new-game').addEventListener('click', newGame)
  console.log('Board created.')
}

createBoard()

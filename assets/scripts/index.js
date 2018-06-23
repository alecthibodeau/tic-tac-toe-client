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
  turnCounter = 0
  console.log('Got to new game.')
  document.querySelector('#game-board').innerHTML = ''
  document.getElementById('new-game').style.color = '0ff' // This is for resetting link color after the click has occurred so it doesn't remain in the hover state
  // squaresInPlay = []
  createBoard()
}

let playerPiece
let turnCounter = 0

const squaresCoord = [[0, 0], [0, 1], [0, 2], [1, 0], [1, 1], [1, 2], [2, 0], [2, 1], [2, 2]]
const squaresIndex = [0, 1, 2, 3, 4, 5, 6, 7, 8]

const onMouseOver = function (event) {
  event.target.style.backgroundColor = '#ff0' // yellow
  event.target.style.cursor = 'pointer'
}

const onMouseOut = function (event) {
  event.target.style.backgroundColor = '#0ff' // cyan
  event.target.style.cursor = 'default'
}

const clickSquare = function () {
  if (turnCounter % 2 === 0) {
    playerPiece = 'x'
  } else {
    playerPiece = 'o'
  }
  console.log(`User selected ${playerPiece} on square ${this.getAttribute('data-id')}`)
  document.querySelector('#' + this.getAttribute('id')).innerHTML = playerPiece.toUpperCase()
  document.getElementById(this.getAttribute('id')).removeEventListener('click', clickSquare)
  document.getElementById(this.getAttribute('id')).removeEventListener('mouseover', onMouseOver)
  document.getElementById(this.getAttribute('id')).removeEventListener('mouseout', onMouseOut)
  document.querySelector('#' + this.getAttribute('id')).style.backgroundColor = '#0ff'
  document.querySelector('#' + this.getAttribute('id')).style.cursor = 'default'
  turnCounter++
  // squaresInPlay.push(squares[squareId].rank);
  // this.setAttribute('src', squares[squareId].squareImage);
  // if (squaresInPlay.length === 3) {
  // checkForMatch();
// }
  // document.getElementsByClassName('board-square').addEventListener('click', clickSingleO)
}

const createBoard = function () {
  for (let i = 0; i < squaresCoord.length; i++) {
    const squareElement = document.createElement('div')
    // squareElement.innerHTML = i
    squareElement.setAttribute('class', 'board-square')
    squareElement.setAttribute('data-id', i)
    squareElement.setAttribute('id', 'square-' + i)
    squareElement.addEventListener('mouseover', onMouseOver)
    squareElement.addEventListener('mouseout', onMouseOut)
    squareElement.addEventListener('click', clickSquare)
    document.getElementById('game-board').appendChild(squareElement)
  }
  document.getElementById('new-game').addEventListener('click', newGame)
  console.log('Board created.')
}

createBoard()

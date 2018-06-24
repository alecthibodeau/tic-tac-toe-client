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
  console.log('New game is ready.')
  document.querySelector('#game-board').innerHTML = ''
  createBoard()
}

let playerPiece
let turnCounter = 0

const squaresCoord = [[0, 0], [0, 1], [0, 2], [1, 0], [1, 1], [1, 2], [2, 0], [2, 1], [2, 2]]
// const squaresIndex = [0, 1, 2, 3, 4, 5, 6, 7, 8]

const playerXMoves = []
const playerOMoves = []

const onMouseOver = function (event) {
  event.target.style.backgroundColor = '#ff0' // yellow
  event.target.style.cursor = 'pointer'
}

const onMouseOut = function (event) {
  event.target.style.backgroundColor = '#0ff' // cyan
  event.target.style.cursor = 'default'
}

// const checkForMatch = {
//   for (let i = 0; ; i < playerXMoves.length; i++) {
// }

const clickSquare = function () {
  turnCounter % 2 === 0 ? playerPiece = 'x' : playerPiece = 'o'
  if (playerPiece === 'x') {
    playerXMoves.push(squaresCoord[this.getAttribute('data-id')])
    document.querySelector('#' + this.getAttribute('id')).style.color = '#f00'
  } else if (playerPiece === 'o') {
    playerOMoves.push(squaresCoord[this.getAttribute('data-id')])
    document.querySelector('#' + this.getAttribute('id')).style.color = '#00f'
  }
  document.querySelector('#' + this.getAttribute('id')).innerHTML = playerPiece.toUpperCase()
  document.getElementById(this.getAttribute('id')).removeEventListener('click', clickSquare)
  document.getElementById(this.getAttribute('id')).removeEventListener('mouseover', onMouseOver)
  document.getElementById(this.getAttribute('id')).removeEventListener('mouseout', onMouseOut)
  document.querySelector('#' + this.getAttribute('id')).style.backgroundColor = '#0ff'
  document.querySelector('#' + this.getAttribute('id')).style.cursor = 'default'
  console.log(`User selected ${playerPiece.toUpperCase()} on square ${this.getAttribute('data-id')}`)
  console.log(`Player X's moves are : ${playerXMoves}`)
  console.log(`Player O's moves are : ${playerOMoves}`)
  console.log(`Number of Player X's moves: ${playerXMoves.length}`)
  console.log(`Number of Player O's moves: ${playerOMoves.length}`)
  turnCounter++
  // this.setAttribute('src', squares[squareId].squareImage);
  // if (playerXMoves.length >= 3) {
  //   checkForMatch()
  // }
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

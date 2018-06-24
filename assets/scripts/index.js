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

let turnCounter = 0
let playerXMoves = []
let playerOMoves = []
let squaresIndexNumber
let playerPiece
let winValue = null
const squaresCoord = [[0, 0], [0, 1], [0, 2], [1, 0], [1, 1], [1, 2], [2, 0], [2, 1], [2, 2]]
let squaresIndex = [0, 1, 2, 3, 4, 5, 6, 7, 8]

const newGame = function () {
  turnCounter = 0
  playerXMoves = []
  playerOMoves = []
  winValue = null
  squaresIndex = [0, 1, 2, 3, 4, 5, 6, 7, 8]
  console.log('New game is ready.')
  document.querySelector('#game-board').innerHTML = ''
  createBoard()
}

const onMouseOver = function (event) {
  event.target.style.backgroundColor = '#ff0' // yellow
  event.target.style.cursor = 'pointer'
}

const onMouseOut = function (event) {
  event.target.style.backgroundColor = '#0ff' // cyan
  event.target.style.cursor = 'default'
}

const winNotice = function () {
  console.log(`Player ${winValue.toUpperCase()} wins!`)
  document.querySelector('#new-game').innerHTML = `PLAYER ${winValue.toUpperCase()} WINS!`
  for (let i = 0; i <= 8; i++) {
    document.getElementById('square-' + i).removeEventListener('click', clickSquare)
    document.getElementById('square-' + i).removeEventListener('mouseover', onMouseOver)
  }
  setTimeout(function () { document.querySelector('#new-game').innerHTML = 'NEW GAME' }, 5000)
}

const drawNotice = function () {
  document.querySelector('#new-game').innerHTML = `IT'S A DRAW!`
  for (let i = 0; i <= 8; i++) {
    document.getElementById('square-' + i).removeEventListener('click', clickSquare)
    document.getElementById('square-' + i).removeEventListener('mouseover', onMouseOver)
  }
  setTimeout(function () { document.querySelector('#new-game').innerHTML = 'NEW GAME' }, 5000)
}

const checkForMatch = function () {
  // top row win
  if ((squaresIndex[0] === squaresIndex[1]) && (squaresIndex[0] === squaresIndex[2])) {
    winValue = squaresIndex[0]
  // middle row win
  } else if ((squaresIndex[3] === squaresIndex[4]) && (squaresIndex[3] === squaresIndex[5])) {
    winValue = squaresIndex[3]
  // bottom row win
  } else if ((squaresIndex[6] === squaresIndex[7]) && (squaresIndex[6] === squaresIndex[8])) {
    winValue = squaresIndex[6]
  // left column win
  } else if ((squaresIndex[0] === squaresIndex[3]) && (squaresIndex[0] === squaresIndex[6])) {
    winValue = squaresIndex[0]
  // center column win
  } else if ((squaresIndex[1] === squaresIndex[4]) && (squaresIndex[1] === squaresIndex[7])) {
    winValue = squaresIndex[1]
    // right column win
  } else if ((squaresIndex[2] === squaresIndex[5]) && (squaresIndex[2] === squaresIndex[8])) {
    winValue = squaresIndex[2]
    // downward diagonal win
  } else if ((squaresIndex[0] === squaresIndex[4]) && (squaresIndex[0] === squaresIndex[8])) {
    winValue = squaresIndex[0]
    // upward diagonal win
  } else if ((squaresIndex[2] === squaresIndex[4]) && (squaresIndex[2] === squaresIndex[6])) {
    winValue = squaresIndex[2]
    // draw
  } else if ((playerXMoves.length === 5) && (playerOMoves.length === 4)) {
    console.log('It\'s a draw!')
    drawNotice()
  }
  if (winValue === 'x') {
    document.querySelector('#game-board').style.borderColor = '#f00'
    winNotice()
  } else if (winValue === 'o') {
    document.querySelector('#game-board').style.borderColor = '#00f'
    winNotice()
  }
}

const clickSquare = function () {
  turnCounter % 2 === 0 ? playerPiece = 'x' : playerPiece = 'o'
  squaresIndexNumber = this.getAttribute('data-id')
  squaresIndex[squaresIndexNumber] = playerPiece
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
  document.querySelector('#' + this.getAttribute('id')).style.backgroundColor = '#0ff'
  document.querySelector('#' + this.getAttribute('id')).style.cursor = 'default'
  console.log(`User selected ${playerPiece.toUpperCase()} on square ${this.getAttribute('data-id')}`)
  console.log(`Player X's moves are : ${playerXMoves}`)
  console.log(`Player O's moves are : ${playerOMoves}`)
  console.log(`Number of Player X's moves: ${playerXMoves.length}`)
  console.log(`Number of Player O's moves: ${playerOMoves.length}`)
  console.log(`Square index: ${squaresIndexNumber}`)
  console.log(squaresIndex)
  turnCounter++
  // this.setAttribute('src', squares[squareId].squareImage);
  if (playerXMoves.length >= 3) {
    checkForMatch()
  }
}

const createBoard = function () {
  document.querySelector('#game-board').style.borderColor = '#0f0'
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

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

let over = false
let turnCounter = 0
let playerXMoves = []
let playerOMoves = []
let playerPiece = null
let winValue = null
let cells = ['', '', '', '', '', '', '', '', '']
const cellsCoord = [[0, 0], [0, 1], [0, 2], [1, 0], [1, 1], [1, 2], [2, 0], [2, 1], [2, 2]]

const onMouseOver = function (event) {
  event.target.style.backgroundColor = '#fbde84' // rainbow-yellow
  event.target.style.cursor = 'pointer'
}

const onMouseOut = function (event) {
  event.target.style.backgroundColor = '#f7f0e3' // cloud-white
  event.target.style.cursor = 'default'
}

const endNotice = function () {
  over = true
  console.log(`Is game REALLY over? ${over}`)
  console.log(`Win value: ${winValue}`)
  for (let i = 0; i <= 8; i++) {
    document.getElementById('cell-' + i).removeEventListener('click', clickcell)
    document.getElementById('cell-' + i).removeEventListener('mouseover', onMouseOver)
  }
  setTimeout(function () { document.querySelector('#new-game').innerHTML = 'NEW GAME' }, 5000)
}

const checkForMatch = function () {
  // top row win
  if ((cells[0] !== '') && (cells[0] === cells[1]) && (cells[0] === cells[2])) {
    winValue = cells[0]
  // middle row win
  } else if ((cells[3] !== '') && (cells[3] === cells[4]) && (cells[3] === cells[5])) {
    winValue = cells[3]
  // bottom row win
  } else if ((cells[6] !== '') && (cells[6] === cells[7]) && (cells[6] === cells[8])) {
    winValue = cells[6]
  // left column win
  } else if ((cells[0] !== '') && (cells[0] === cells[3]) && (cells[0] === cells[6])) {
    winValue = cells[0]
  // center column win
  } else if ((cells[1] !== '') && (cells[1] === cells[4]) && (cells[1] === cells[7])) {
    winValue = cells[1]
    // right column win
  } else if ((cells[2] !== '') && (cells[2] === cells[5]) && (cells[2] === cells[8])) {
    winValue = cells[2]
    // downward diagonal win
  } else if ((cells[0] !== '') && (cells[0] === cells[4]) && (cells[0] === cells[8])) {
    winValue = cells[0]
    // upward diagonal win
  } else if ((cells[2] !== '') && (cells[2] === cells[4]) && (cells[2] === cells[6])) {
    winValue = cells[2]
    // draw
  } else if (playerXMoves.length + playerOMoves.length === 9) {
    document.querySelector('#new-game').innerHTML = `IT'S A DRAW!`
    console.log('It\'s a draw!')
    endNotice()
    return
  }
  if ((winValue === 'x') || (winValue === 'o')) {
    if (winValue === 'x') {
      document.querySelector('#game-board').style.borderColor = '#f27089'
    } else if (winValue === 'o') {
      document.querySelector('#game-board').style.borderColor = '#74a6cf'
    }
    console.log(`Player ${winValue.toUpperCase()} wins!`)
    document.querySelector('#new-game').innerHTML = `PLAYER ${winValue.toUpperCase()} WINS!`
    endNotice()
  }
}

const clickcell = function () {
  turnCounter % 2 === 0 ? playerPiece = 'x' : playerPiece = 'o'
  cells[this.getAttribute('data-id')] = playerPiece
  if (playerPiece === 'x') {
    playerXMoves.push(cellsCoord[this.getAttribute('data-id')])
    document.querySelector('#' + this.getAttribute('id')).style.color = '#f27089'
  } else if (playerPiece === 'o') {
    playerOMoves.push(cellsCoord[this.getAttribute('data-id')])
    document.querySelector('#' + this.getAttribute('id')).style.color = '#74a6cf'
  }
  document.querySelector('#' + this.getAttribute('id')).innerHTML = playerPiece.toUpperCase()
  document.getElementById(this.getAttribute('id')).removeEventListener('click', clickcell)
  document.getElementById(this.getAttribute('id')).removeEventListener('mouseover', onMouseOver)
  document.querySelector('#' + this.getAttribute('id')).style.backgroundColor = '#f7f0e3'
  document.querySelector('#' + this.getAttribute('id')).style.cursor = 'default'
  console.log(`User selected ${playerPiece.toUpperCase()} on cell ${this.getAttribute('data-id')}`)
  console.log(`Player X's moves are : ${playerXMoves}`)
  console.log(`Player O's moves are : ${playerOMoves}`)
  console.log(`Number of Player X's moves: ${playerXMoves.length}`)
  console.log(`Number of Player O's moves: ${playerOMoves.length}`)
  console.log(`cell index: ${this.getAttribute('data-id')}`)
  console.log(`Win value: ${winValue}`)
  console.log(`Cells array: ${cells}`)
  console.log(`Game is over? ${over}`)
  turnCounter++
  // this.setAttribute('src', cells[cellId].cellImage);
  if (playerXMoves.length >= 3) {
    checkForMatch()
  }
}

const newGame = function () {
  over = false
  turnCounter = 0
  playerXMoves = []
  playerOMoves = []
  playerPiece = null
  winValue = null
  cells = ['', '', '', '', '', '', '', '', '']
  document.querySelector('#game-board').innerHTML = ''
  document.querySelector('#game-board').style.borderColor = '#9ac479'
  for (let i = 0; i < cellsCoord.length; i++) {
    const cellElement = document.createElement('div')
    // cellElement.innerHTML = i
    cellElement.setAttribute('class', 'board-cell')
    cellElement.setAttribute('data-id', i)
    cellElement.setAttribute('id', 'cell-' + i)
    cellElement.addEventListener('mouseover', onMouseOver)
    cellElement.addEventListener('mouseout', onMouseOut)
    cellElement.addEventListener('click', clickcell)
    document.getElementById('game-board').appendChild(cellElement)
  }
  document.getElementById('new-game').addEventListener('click', newGame)
  console.log('Board created. New game is ready.')
}

newGame()

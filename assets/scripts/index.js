'use strict'

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
  console.log(`Is game over? ${over}`)
  for (let i = 0; i <= 8; i++) {
    document.getElementById('cell-' + i).removeEventListener('click', clickCell)
    document.getElementById('cell-' + i).removeEventListener('mouseover', onMouseOver)
  }
}

const checkForMatch = function () {
  for (let i = 0; i <= 6; i = i + 3) {
    if ((cells[i] !== '') && (cells[i] === cells[i + 1]) && (cells[i] === cells[i + 2])) {
      winValue = cells[i] // rows win
    }
  }
  for (let i = 0; i <= 2; i = i + 1) {
    if ((cells[i] !== '') && (cells[i] === cells[i + 3]) && (cells[i] === cells[i + 6])) {
      winValue = cells[i] // columns win
    }
  }
  if ((cells[4] !== '') && (((cells[0] === cells[4]) && (cells[0] === cells[8])) || ((cells[2] === cells[4]) && (cells[2] === cells[6])))) {
    winValue = cells[4] // diagonals win
  }
  if ((winValue === 'x') || (winValue === 'o')) {
    if (winValue === 'x') {
      document.querySelector('#game-board').style.borderColor = '#f27089'
    } else if (winValue === 'o') {
      document.querySelector('#game-board').style.borderColor = '#74a6cf'
    }
    console.log(`PLAYER ${winValue.toUpperCase()} WINS!`)
    document.querySelector('#game-status').innerHTML = `PLAYER ${winValue.toUpperCase()} WINS!`
    document.querySelector('#game-status').style.color = '#358d65'
    return endNotice()
  } else if (playerXMoves.length + playerOMoves.length === 9) {
    document.querySelector('#game-status').innerHTML = `IT'S A DRAW!`
    document.querySelector('#game-status').style.color = '#358d65'
    console.log(`IT'S A DRAW!`)
    endNotice()
  }
}

const clickCell = function () {
  turnCounter % 2 === 0 ? playerPiece = 'x' : playerPiece = 'o'
  cells[this.getAttribute('data-id')] = playerPiece
  if (playerPiece === 'x') {
    playerXMoves.push(cellsCoord[this.getAttribute('data-id')])
    document.querySelector('#' + this.getAttribute('id')).style.color = '#f27089'
    document.querySelector('#game-status').innerHTML = `PLAYER O GOES`
    document.querySelector('#game-status').style.color = '#74a6cf'
  } else if (playerPiece === 'o') {
    playerOMoves.push(cellsCoord[this.getAttribute('data-id')])
    document.querySelector('#' + this.getAttribute('id')).style.color = '#74a6cf'
    document.querySelector('#game-status').innerHTML = `PLAYER X GOES`
    document.querySelector('#game-status').style.color = '#f27089'
  }
  document.querySelector('#' + this.getAttribute('id')).innerHTML = playerPiece.toUpperCase()
  document.getElementById(this.getAttribute('id')).removeEventListener('click', clickCell)
  document.getElementById(this.getAttribute('id')).removeEventListener('mouseover', onMouseOver)
  document.querySelector('#' + this.getAttribute('id')).style.backgroundColor = '#f7f0e3'
  document.querySelector('#' + this.getAttribute('id')).style.cursor = 'default'
  console.log(`Player ${playerPiece.toUpperCase()} selected cell ${this.getAttribute('data-id')}`)
  console.log(`Cells array: ${cells}`)
  console.log(`Is game over? ${over}`)
  turnCounter++
  if (playerXMoves.length + playerOMoves.length >= 5) {
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
  document.querySelector('#game-status').innerHTML = 'PLAYER X GOES'
  document.querySelector('#game-status').style.color = '#f27089'
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
    cellElement.addEventListener('click', clickCell)
    document.getElementById('game-board').appendChild(cellElement)
  }
  document.getElementById('new-game').addEventListener('click', newGame)
  console.log('Board created. New game is ready.')
}

newGame()

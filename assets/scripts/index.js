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
$(() => {
  authEvents.addHandlers()

  let over = false
  let turnCounter = 0
  let playerXMoves = []
  let playerOMoves = []
  let playerPiece = null
  let winValue = null
  let cells = ['', '', '', '', '', '', '', '', '']
  const cellsCoord = [[0, 0], [0, 1], [0, 2], [1, 0], [1, 1], [1, 2], [2, 0], [2, 1], [2, 2]]

  const endNotice = function () {
    over = true
    console.log(`Is game REALLY over? ${over}`)
    console.log(`Win value: ${winValue}`)
    for (let i = 0; i <= 8; i++) {
    }
    setTimeout(function () { document.querySelector('#new-game').innerHTML = 'NEW GAME' }, 5000)
  }

  const checkForMatch = function () {
    for (let i = 0; i <= 6; i = i + 3) {
      if ((cells[i] !== '') && (cells[i] === cells[i + 1]) && (cells[i] === cells[i + 2])) {
        winValue = cells[i] // rows win
        console.log('rows win')
      }
    }
    for (let i = 0; i <= 2; i = i + 1) {
      if ((cells[i] !== '') && (cells[i] === cells[i + 3]) && (cells[i] === cells[i + 6])) {
        winValue = cells[i] // columns win
        console.log('columns win')
      }
    }
    if ((cells[4] !== '') && (((cells[0] === cells[4]) && (cells[0] === cells[8])) || ((cells[2] === cells[4]) && (cells[2] === cells[6])))) {
      winValue = cells[4] // diagonals win
      console.log('diagonals win')
    }
    if ((winValue === 'x') || (winValue === 'o')) {
      if (winValue === 'x') {
        $('.board-grid').addClass('x-won')
      } else if (winValue === 'o') {
        $('.board-grid').addClass('o-won')
      }
      console.log(`Player ${winValue.toUpperCase()} wins!`)
      document.querySelector('#new-game').innerHTML = `PLAYER ${winValue.toUpperCase()} WINS!`
      return endNotice()
    } else if (playerXMoves.length + playerOMoves.length === 9) {
      document.querySelector('#new-game').innerHTML = `IT'S A DRAW!`
      console.log(`It's a draw!`)
      endNotice()
    }
  }

  const clickCell = function () {
    turnCounter % 2 === 0 ? playerPiece = 'x' : playerPiece = 'o'
    cells[this.getAttribute('data-id')] = playerPiece
    if (playerPiece === 'x') {
      playerXMoves.push(cellsCoord[this.getAttribute('data-id')])
      $(this).addClass('x')
    } else if (playerPiece === 'o') {
      playerOMoves.push(cellsCoord[this.getAttribute('data-id')])
      $(this).addClass('o')
    }
    document.querySelector('#' + this.getAttribute('id')).innerHTML = playerPiece.toUpperCase()
    $(this).unbind('click', clickCell)
    $(this).addClass('played')
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
    if (playerXMoves.length + playerOMoves.length >= 5) {
      checkForMatch()
    }
  }

  // put this in a `client.js file and import it`
  const newGame = function () {
    over = false
    turnCounter = 0
    playerXMoves = []
    playerOMoves = []
    playerPiece = null
    winValue = null
    cells = ['', '', '', '', '', '', '', '', '']
    document.querySelector('#game-board').innerHTML = ''
    // document.querySelector('#game-board').style.borderColor = '#9ac479'
    for (let i = 0; i < cellsCoord.length; i++) {
      const cellElement = document.createElement('div')
      // cellElement.innerHTML = i
      cellElement.setAttribute('class', 'board-cell')
      cellElement.setAttribute('data-id', i)
      cellElement.setAttribute('id', 'cell-' + i)

      // do these in CSS
      // cellElement.addEventListener('mouseover', onMouseOver)
      // cellElement.addEventListener('mouseout', onMouseOut)

      // this should go in games/events.js and be immported here for use
      // as a listnere callback
      // $('.board-cell').addEventListener('click', clickCell)

      document.getElementById('game-board').appendChild(cellElement)
    }
    document.getElementById('new-game').addEventListener('click', newGame)
    console.log('Board created. New game is ready.')
  }

  newGame()
  $('.board-cell').on('click', clickCell)

  // event listeners which bind handlers to events on elements
  // two types:
  //   API request handlers
  //   UI handlers
})

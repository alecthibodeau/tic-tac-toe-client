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

let turnCounter = 0

const squaresCoord = [[0, 0], [0, 1], [0, 2], [1, 0], [1, 1], [1, 2], [2, 0], [2, 1], [2, 2]]
const squaresIndex = [0, 1, 2, 3, 4, 5, 6, 7, 8]

const onMouseOver = function (event) {
// highlight the mouseover target
  event.target.style.backgroundColor = '#ff0' // yellow
  event.target.style.cursor = 'pointer'
}

const onMouseOut = function (event) {
// highlight the mouseover target
  event.target.style.backgroundColor = '#0ff' // cyan
  event.target.style.cursor = 'default'
}

const clickSquare = function () {
  // console.log(this.getAttribute('data-id'))
  // console.log(this.getAttribute('id'))
  // console.log(this)
  // const squareId = this.getAttribute('id')
  console.log('User selected X on square ' + this.getAttribute('data-id'))
  document.querySelector('#' + this.getAttribute('id')).innerHTML = 'X'
  document.getElementById(this.getAttribute('id')).removeEventListener('click', clickSquare)
  document.getElementById(this.getAttribute('id')).removeEventListener('mouseover', onMouseOver)
  document.getElementById(this.getAttribute('id')).removeEventListener('mouseout', onMouseOut)
  document.querySelector('#' + this.getAttribute('id')).style.backgroundColor = '#f0f'
  document.querySelector('#' + this.getAttribute('id')).style.cursor = 'default'
  // cardsInPlay.push(cards[cardId].rank);
  // this.setAttribute('src', cards[cardId].cardImage);
  // if (cardsInPlay.length === 2) {
  // checkForMatch();
// }
  // document.getElementsByClassName('board-square').addEventListener('click', clickSingleO)
}

const createBoard = function () {
  for (let i = 0; i < squaresCoord.length; i++) {
    const squareElement = document.createElement('div')
    squareElement.setAttribute('class', 'board-square')
    squareElement.innerHTML = i
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

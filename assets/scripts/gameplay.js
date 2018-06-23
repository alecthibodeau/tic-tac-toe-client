'use strict'

const onClickX = function (event) {
  event.preventDefault()
  console.log('square clicked')
  const squareHTML = (`x
`)
  $('#square-0-0').html(squareHTML)
}

module.exports = {
  onClickSquare
}

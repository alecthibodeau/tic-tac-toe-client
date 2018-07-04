'use strict'

const gameNotice = function (winValue, over, onClickCell) {
  if ((winValue === 'x') || (winValue === 'o')) {
    $('.board-grid').addClass(`${winValue}-won`)
    $('.game-status-area').text(`player ${winValue} wins!`).addClass('game-result')
  } else {
    $('.game-status-area').text(`it's a draw!`).addClass('game-result')
  }
  console.log(`Is game REALLY over? ${over}`)
  $('.board-cell').off('click', onClickCell).addClass('game-over')
}

module.exports = {
  gameNotice
}

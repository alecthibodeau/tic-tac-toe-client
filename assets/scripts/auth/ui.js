'use strict'

const store = require('../store')
const gameEvents = require('../game/ui.js')
const boardEvents = require('../game/events.js')

const signUpSuccess = function (data) {
  $('#modalTitleSignUp').text('Signed up successfully').css('color', '#9ac479')
  $('#sign-up').slideToggle(200)
  setTimeout(function () {
    $('#signUpModal').modal('hide')
    $('#sign-up').show()
    $('#modalTitleSignUp').text('Sign up').css('color', '#fca778')
    $('#signInModal').modal('show')
  }, 3000)
}

const signUpFailure = function (error) {
  $('#modalTitleSignUp').text('Error on sign up. Try again').css('color', '#f27089')
  setTimeout(function () {
    $('#modalTitleSignUp').text('Sign up').css('color', '#fca778')
  }, 5000)
  console.log('signUpFailure ran. Error is :', error)
}

const signInSuccess = function (data) {
  $('#modalTitleSignIn').text('Signed in successfully').css('color', '#9ac479')
  $('#sign-in').slideToggle(200)
  $('.starting-buttons').hide()
  $('.user-buttons').show()
  setTimeout(function () {
    $('#signInModal').modal('hide')
    $('#modalTitleSignIn').text('Sign in').css('color', '#fca778')
    $('#sign-in').show()
  }, 3000)
  // console.log('signInSuccess ran. Data is :', data)
  // store is an empty object: store = {}. We'll fill it with information. See store.js
  store.user = data.user
  // console.log('Signed-in user is:')
  // console.log(store.user)
  $('.game-information-area').show()
  $('.intro-text').hide()
  gameEvents.onClickResetSession()
  boardEvents.setNewGame()
}

const signInFailure = function (error) {
  $('#modalTitleSignIn').text('Error on sign in. Try again.').css('color', '#f27089')
  setTimeout(function () {
    $('#modalTitleSignIn').text('Sign in').css('color', '#fca778')
  }, 5000)
  console.log('signInFailure ran. Error is :', error)
}

const changePasswordSuccess = function (data) {
  $('#modalTitleChangePassword').text('Changed password successfully').css('color', '#9ac479')
  $('#change-password').slideToggle(200)
  setTimeout(function () {
    $('#changePasswordModal').modal('hide')
    $('#modalTitleChangePassword').text('Change password').css('color', '#fca778')
    $('#change-password').show()
  }, 3000)
  // console.log('changePasswordSuccess ran and nothing was returned :', data)
}

const changePasswordFailure = function (error) {
  $('#modalTitleChangePassword').text('Error on change password. Try again.').css('color', '#f27089')
  setTimeout(function () {
    $('#modalTitleChangePassword').text('Change password').css('color', '#fca778')
    // $('#change-password').show(1)
  }, 5000)
  console.log('changePasswordFailure ran. Error is :', error)
}

const signOutSuccess = function (animateGameBoard, onClickResetSession, onClickCell) {
  store.preGame = true
  boardEvents.animateGameBoard()
  gameEvents.onClickResetSession()
  $('#modalTitleSignOut').text('Signed out successfully').css('color', '#9ac479')
  $('.starting-buttons').show()
  $('.user-buttons').hide()
  $('.board-cell').off('click', onClickCell).addClass('played').addClass('game-over').html('')
  $('.board-grid').removeClass('x-won').removeClass('o-won').addClass('playable')
  $('#stats-total-games-over').html('Loading…')
  $('#stats-sum-games-over').html('')
  $('#stats-games-over').html('')
  setTimeout(function () {
    $('#signOutModal').modal('hide')
    $('#modalTitleSignOut').text('Sign out').css('color', '#fca778')
  }, 3000)
  // console.log('signOutSuccess ran and nothing was returned!')
  store.user = null
}

const signOutFailure = function (error) {
  $('#modalTitleSignOut').text('Error on sign out. Try again').css('color', '#f27089')
  setTimeout(function () {
    $('#signOutModal').modal('hide')
    $('#modalTitleSignOut').text('Sign out').css('color', '#fca778')
  }, 5000)
  console.log('signOutFailure ran. Error is :', error)
}

module.exports = {
  signUpSuccess,
  signUpFailure,
  signInSuccess,
  signInFailure,
  signOutSuccess,
  signOutFailure,
  changePasswordSuccess,
  changePasswordFailure
}

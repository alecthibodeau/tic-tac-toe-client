'use strict'

const store = require('../store')

const signUpSuccess = function (data) {
  $('#message').text('Signed up successfully')
  $('#message').css('background-color', 'green')
  setTimeout(function () { $('#message').text('') }, 5000)
  console.log('signUpSuccess ran. Data is :', data)
}

const signUpFailure = function (error) {
  $('#message').text('Error on sign up')
  $('#message').css('background-color', 'red')
  console.log('signUpFailure ran. Error is :', error)
}

const signInSuccess = function (data) {
  $('#modalTitleSignIn').text('Signed in successfully').css('color', '#9ac479')
  $('.new-game-area').addClass('playable')
  $('#nav-sign-up').hide()
  $('#nav-sign-in').hide()
  $('#nav-change-password').show()
  $('#nav-game-stats').show()
  $('#nav-sign-out').show()
  $('#sign-in').slideToggle(200)

  setTimeout(function () {
    $('#signInModal').modal('hide')
    $('#modalTitleSignIn').text('Sign in').css('color', '#fca778')
    $('#sign-in').show()
  }, 3000)

  // $('#message').text('Signed in successfully')
  // $('#message').css('background-color', 'green')
  // setTimeout(function () { $('#message').text('') }, 5000)
  console.log('signInSuccess ran. Data is :', data)

  store.user = data.user
  // store is an empty object: store = {}. We'll fill it with information. See store.js
}

const signInFailure = function (error) {
  $('#modalTitleSignIn').text('Error on sign in. Try again.').css('color', '#f27089')
  setTimeout(function () {
    // $('#signInModal').modal('hide')
    $('#modalTitleSignIn').text('Sign in').css('color', '#fca778')
    // $('#sign-in').show(1)
  }, 5000)

  // $('#message').text('Error on sign in')
  // $('#message').css('background-color', 'red')
  console.log('signInFailure ran. Error is :', error)
}

const changePasswordSuccess = function (data) {
  // $('#message').text('Changed password successfully')
  // $('#message').css('background-color', 'green')
  // setTimeout(function () { $('#message').text('') }, 5000)
  $('#modalTitleChangePassword').text('Changed password successfully').css('color', '#9ac479')
  $('#change-password').slideToggle(200)
  setTimeout(function () {
    $('#changePasswordModal').modal('hide')
    $('#modalTitleChangePassword').text('Change password').css('color', '#fca778')
    $('#change-password').show()
  }, 3000)

  console.log('changePasswordSuccess ran and nothing was returned :', data)
}

const changePasswordFailure = function (error) {
  // $('#message').text('Error on change password')
  // $('#message').css('background-color', 'red')
  $('#modalTitleChangePassword').text('Error on change password. Try again.').css('color', '#f27089')
  setTimeout(function () {
    // $('#changePasswordModal').modal('hide')
    $('#modalTitleChangePassword').text('Change password').css('color', '#fca778')
    // $('#change-password').show(1)
  }, 5000)
  console.log('changePasswordFailure ran. Error is :', error)
}

const signOutSuccess = function () {
  $('#modalTitleSignOut').text('Signed out successfully').css('color', '#9ac479')

  // $('#sign-in').slideToggle(200)
  $('.board-cell').addClass('pre-game').addClass('played').addClass('game-over').html('')
  // $('#message').text('Signed out successfully')
  // $('#message').css('background-color', 'green')
  // $('.change-password-panel').removeClass('authorized')
  // $('.sign-out-panel').removeClass('authorized')
  $('.board-grid').removeClass('playable').css('background-color', '#9ac479')
  $('.new-game-area').removeClass('playable')
  $('.game-status-area').removeClass('playable')
  // $('.sign-up-panel').removeClass('signed-in')
  // $('.sign-in-panel').removeClass('signed-in')

  $('#nav-sign-up').show()
  $('#nav-sign-in').show()
  $('#nav-change-password').hide()
  $('#nav-game-stats').hide()
  $('#nav-sign-out').hide()

  setTimeout(function () {
    $('#signOutModal').modal('hide')
    $('#modalTitleSignOut').text('Sign out').css('color', '#fca778')
  }, 3000)

  setTimeout(function () { $('#message').text('') }, 5000)
  console.log('signOutSuccess ran and nothing was returned!')

  store.user = null
}

const signOutFailure = function (error) {
  $('#modalTitleSignOut').text('Error on sign out. Try again').css('color', '#f27089')
  setTimeout(function () {
    $('#signOutModal').modal('hide')
    $('#modalTitleSignOut').text('Sign out').css('color', '#fca778')
  }, 3000)
  // $('#message').text('Error on sign Out')
  // $('#message').css('background-color', 'red')
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

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
  $('#message').text('Signed in successfully')
  $('#message').css('background-color', 'green')
  $('.sign-up-panel').addClass('signed-in')
  $('.sign-in-panel').addClass('signed-in')
  $('.change-password-panel').addClass('authorized')
  $('.sign-out-panel').addClass('authorized')
  $('.new-game-area').addClass('playable')
  setTimeout(function () { $('#message').text('') }, 5000)
  console.log('signInSuccess ran. Data is :', data)
  store.user = data.user
  // store is an empty object: store = {}. We'll fill it with information. See store.js
}

const signInFailure = function (error) {
  $('#message').text('Error on sign in')
  $('#message').css('background-color', 'red')
  console.log('signInFailure ran. Error is :', error)
}

const changePasswordSuccess = function (data) {
  $('#message').text('Changed password successfully')
  $('#message').css('background-color', 'green')
  setTimeout(function () { $('#message').text('') }, 5000)
  console.log('changePasswordSuccess ran and nothing was returned :', data)
}

const changePasswordFailure = function (error) {
  $('#message').text('Error on change password')
  $('#message').css('background-color', 'red')
  console.log('changePasswordFailure ran. Error is :', error)
}

const signOutSuccess = function () {
  $('#message').text('Signed out successfully')
  $('#message').css('background-color', 'green')
  $('.change-password-panel').removeClass('authorized')
  $('.sign-out-panel').removeClass('authorized')
  $('.board-grid').removeClass('playable')
  $('.new-game-area').removeClass('playable')
  $('.game-status-area').removeClass('playable')
  $('.sign-up-panel').removeClass('signed-in')
  $('.sign-in-panel').removeClass('signed-in')
  setTimeout(function () { $('#message').text('') }, 5000)
  console.log('signOutSuccess ran and nothing was returned!')
  store.user = null
}

const signOutFailure = function (error) {
  $('#message').text('Error on sign Out')
  $('#message').css('background-color', 'red')
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

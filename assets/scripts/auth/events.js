'use strict'

const getFormFields = require('../../../lib/get-form-fields')

const api = require('./api')
const ui = require('./ui')
let textTitle = null
let textMessage = null

// The goal is for ellipticalWait to show animated ellipses while user waits for API
const ellipticalWait = function () {
  textTitle.text(textMessage)
}

const onSignUp = function (event) {
  event.preventDefault()
  // $('#modalTitleSignUp').text('Signing up…')
  textTitle = $('#modalTitleSignUp')
  textMessage = 'Signing up…'
  ellipticalWait()
  const data = getFormFields(this)
  api.signUp(data)
    .then(ui.signUpSuccess)
    .catch(ui.signUpFailure)
}

const onSignIn = function (event) {
  event.preventDefault()
  // $('#modalTitleSignIn').text('Signing in…')
  textTitle = $('#modalTitleSignIn')
  textMessage = 'Signing in…'
  ellipticalWait()
  const data = getFormFields(this)
  api.signIn(data)
    .then(ui.signInSuccess)
    .catch(ui.signInFailure)
}

const onChangePassword = function (event) {
  event.preventDefault()
  const data = getFormFields(this)
  api.changePassword(data)
    .then(ui.changePasswordSuccess)
    .catch(ui.changePasswordFailure)
}

const onSignOut = function (event) {
  event.preventDefault()
  api.signOut()
    .then(ui.signOutSuccess)
    .catch(ui.signOutFailure)
}

const addAuthHandlers = () => {
  $('#sign-up').on('submit', onSignUp)
  $('#sign-in').on('submit', onSignIn)
  $('#nav-sign-out').on('click', onSignOut)
  $('#change-password').on('submit', onChangePassword)
}

module.exports = {
  addAuthHandlers
}

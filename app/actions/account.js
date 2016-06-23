export const LOGIN_REQUEST = 'LOGIN_REQUEST'
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
export const LOGIN_FAILURE = 'LOGIN_FAILURE'
export const LOGOUT_REQUEST = 'LOGOUT_REQUEST'
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS'
export const LOGOUT_FAILURE = 'LOGOUT_FAILURE'
export const SIGNUP_REQUEST = 'SIGNUP_REQUEST'
export const SIGNUP_SUCCESS = 'SIGNUP_SUCCESS'
export const SIGNUP_FAILURE = 'SIGNUP_FAILURE'
export const GET_USER = 'GET_USER'


export function loginFailed (payload) {
  console.log('login failure:', payload)
  return {
    type: LOGIN_FAILURE,
    payload
  }
}
export function signupFailed (payload) {
  return {
    type: SIGNUP_FAILURE,
    payload
  }
}
export function loggedOut () {
  return {
    type: LOGOUT_SUCCESS
  }
}
export function requestLogin () {
  return {
    type: LOGIN_REQUEST
  }
}
export function requestSignup () {
  return {
    type: SIGNUP_REQUEST
  }
}
export function loggedIn (payload) {
  return {
    type: LOGIN_SUCCESS,
    payload
  }
}

export function getUser () {
  return {
    type: GET_USER,
    payload: firebase.auth().currentUser
  }
}

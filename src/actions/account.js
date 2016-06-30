import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT_SUCCESS,
  SIGNUP_REQUEST,
  SIGNUP_FAILURE
} from '../constants/ActionTypes'

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

// export function getUser () {
//   return {
//     type: GET_USER,
//     payload: firebase.auth().currentUser
//   }
// }

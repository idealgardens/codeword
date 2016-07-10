import {
  GET_USERS_SUCCESS,
  GET_USERS_REQUEST,
  GET_USERS_FAILURE,
  GET_USER_SUCCESS,
  GET_USER_REQUEST,
  GET_USER_FAILURE
} from '../constants/ActionTypes'
import { CALL_API } from 'redux-api-middleware'

export function getUser (username) {
  if (!username) {
    throw new Error('Username is required to get user data')
  }
  return {
    [CALL_API]: {
      headers: { 'Content-Type': 'application/json' },
      endpoint: '/api/users',
      method: 'get',
      types: [
        GET_USER_REQUEST,
        GET_USER_SUCCESS,
        GET_USER_FAILURE
      ]
    }
  }
}

export function getUsers () {
  return {
    [CALL_API]: {
      headers: { 'Content-Type': 'application/json' },
      endpoint: '/api/users',
      method: 'get',
      types: [
        GET_USERS_REQUEST,
        GET_USERS_SUCCESS,
        GET_USERS_FAILURE
      ]
    }
  }
}

// export function getUsersByLocation (location) {
//   if (!location) {
//     throw new Error('Username is required to get user data')
//   }
//   return (dispatch) => {
//     dispatch()
//   }
// }
// export function getUsersByLocationRequest (location) {
//
//   return {
//     type: types.GET_USERS
//   }
// }

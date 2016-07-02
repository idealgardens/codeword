import {
  GET_USERS_SUCCESS,
  GET_USERS_REQUEST,
  GET_USERS_FAILURE
} from '../constants/ActionTypes'
// import { CALL_API } from 'redux-api-middleware'
// import * as types from 'constants/ActionTypes'
import { getFirebase } from 'utils/firebase'
const firebase = getFirebase()

// export function getUser (username) {
//   if (!username) {
//     throw new Error('Username is required to get user data')
//   }
//   return {
//     [CALL_API]: {
//       headers: { 'Content-Type': 'application/json' },
//       endpoint: `/api/users`,
//       method: 'get',
//       types: [
//         types.GET_USER_REQUEST,
//         types.GET_USER_SUCCESS,
//         types.GET_USER_FAILURE
//       ]
//     }
//   }
// }
export function getUsers () {
  return (dispatch, getState) => {
    dispatch(requestUsers())
    firebase.ref('tsheets/users').on('value', (snap) => {
      console.log('data from firebase:', snap.val())
      if (snap.val() === null) return dispatch(getUsersFailure(Error('Users Not found')))
      dispatch(receiveUsers(snap.val()))
    }, (error) => {
      dispatch(getUsersFailure(error))
    })
  }
}
export function requestUsers (sheets) {
  return {
    type: GET_USERS_REQUEST,
    payload: sheets
  }
}
export function receiveUsers (sheets) {
  return {
    type: GET_USERS_SUCCESS,
    payload: sheets
  }
}
export function getUsersFailure (error) {
  return {
    type: GET_USERS_FAILURE,
    payload: error
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

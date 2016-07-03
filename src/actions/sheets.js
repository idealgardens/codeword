import {
  GET_SHEETS_SUCCESS,
  GET_SHEETS_REQUEST,
  GET_SHEETS_FAILURE
} from '../constants/ActionTypes'
// import { CALL_API } from 'redux-api-middleware'
import { getFirebase } from 'utils/firebase'

// Get from TSheets API
// export function getSheets () {
//   return {
//     [CALL_API]: {
//       endpoint: '/api/sheets',
//       method: 'GET',
//       types: [ GET_SHEETS_REQUEST, GET_SHEETS_SUCCESS, GET_SHEETS_FAILURE ]
//     }
//   }
// }

export function getSheets () {
  return (dispatch, getState) => {
    dispatch(requestSheets())
    getFirebase().ref('tsheets/timesheets').once('value', (snap) => {
      // console.log('data from firebase:', snap.val())
      dispatch(receiveSheets(snap.val()))
    }, (error) => dispatch(receiveSheetsError(error)))
  }
}

export function requestSheets (sheets) {
  return {
    type: GET_SHEETS_REQUEST,
    payload: sheets
  }
}
export function receiveSheets (sheets) {
  return {
    type: GET_SHEETS_SUCCESS,
    payload: sheets
  }
}
export function receiveSheetsError (error) {
  return {
    type: GET_SHEETS_FAILURE,
    payload: error
  }
}

import {
  GET_CLIENTS_SUCCESS,
  GET_CLIENTS_REQUEST,
  GET_CLIENTS_FAILURE
} from '../constants/ActionTypes'
import { getFirebase } from 'utils/firebase'

export function getClients () {
  return (dispatch, getState) => {
    dispatch(requestSheets())
    getFirebase().ref('clients').on('value', (snap) => {
      console.log('data from firebase:', snap.val())
      dispatch(receiveSheets(snap.val()))
    })
  }
}
export function requestSheets (sheets) {
  return {
    type: GET_CLIENTS_REQUEST,
    payload: sheets
  }
}
export function receiveSheets (sheets) {
  return {
    type: GET_CLIENTS_SUCCESS,
    payload: sheets
  }
}
export function removeSheets (sheets) {
  return {
    type: REMOVE_CLIENTS,
    payload: sheets
  }
}
export function updateSheets (sheets) {
  return {
    type: UPDATE_CLIENTS,
    payload: sheets
  }
}

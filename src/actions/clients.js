import {
  GET_CLIENTS_SUCCESS,
  GET_CLIENTS_REQUEST,
  GET_CLIENTS_FAILURE
} from '../constants/ActionTypes'
import { getFirebase } from 'utils/firebase'
const firebase = getFirebase()

export function getClients () {
  return (dispatch, getState) => {
    dispatch(requestClients())
    firebase.ref('clients').on('value', (snap) => {
      // console.log('data from firebase:', snap.val())
      dispatch(receiveClients(snap.val()))
    }, (error) => dispatch(receiveClientsError(error)))
  }
}
export function requestClients (sheets) {
  return {
    type: GET_CLIENTS_REQUEST,
    payload: sheets
  }
}
export function receiveClients (sheets) {
  return {
    type: GET_CLIENTS_SUCCESS,
    payload: sheets
  }
}
export function receiveClientsError (error) {
  return {
    type: GET_CLIENTS_FAILURE,
    payload: error
  }
}

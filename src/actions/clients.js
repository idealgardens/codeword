import {
  GET_CLIENTS_SUCCESS,
  GET_CLIENTS_REQUEST,
  GET_CLIENTS_FAILURE,
  UPDATE_CLIENT_SUCCESS,
  UPDATE_CLIENT_REQUEST,
  UPDATE_CLIENT_FAILURE
} from '../constants/ActionTypes'
import { camelCase } from 'lodash'
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

export function updateClient (client, scopedHours) {
  client.scopedHours = scopedHours
  console.log('calling update with:', client, scopedHours)
  const clientKey = `clients/${camelCase(client.name)}`
  console.log('clientKey:', clientKey)
  return (dispatch, getState) => {
    dispatch(requestUpdateClient(client))
    firebase.ref(`clients/${camelCase(client.name)}`).update(client, (error) => {
      console.log('update called', client)
      if (error) return dispatch(receiveClientUpdateError(error))
      dispatch(receiveClientUpdate(client))
    })
  }
}
export function requestUpdateClient (client) {
  return {
    type: UPDATE_CLIENT_REQUEST,
    payload: client
  }
}
export function receiveClientUpdate (client) {
  return {
    type: UPDATE_CLIENT_SUCCESS,
    payload: client
  }
}
export function receiveClientUpdateError (error) {
  return {
    type: UPDATE_CLIENT_FAILURE,
    payload: error
  }
}

import {
  ADD_SHEETS,
  GET_SHEETS_SUCCESS,
  GET_SHEETS_REQUEST,
  GET_SHEETS_FAILURE,
  REMOVE_SHEETS,
  UPDATE_SHEETS
} from '../constants/ActionTypes'
import { CALL_API } from 'redux-api-middleware'
export function addSheets (sheets) {
  return {
    type: ADD_SHEETS,
    payload: sheets
  }
}

export function getSheets () {
  return {
    [CALL_API]: {
      endpoint: '/api/sheets',
      method: 'GET',
      types: [ GET_SHEETS_REQUEST, GET_SHEETS_SUCCESS, GET_SHEETS_FAILURE ]
    }
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
export function removeSheets (sheets) {
  return {
    type: REMOVE_SHEETS,
    payload: sheets
  }
}
export function updateSheets (sheets) {
  return {
    type: UPDATE_SHEETS,
    payload: sheets
  }
}

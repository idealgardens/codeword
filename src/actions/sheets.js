export const ADD_SHEETS = 'ADD_SHEETS'
export const GET_SHEETS_SUCCESS = 'GET_SHEETS_SUCCESS'
export const GET_SHEETS_REQUEST = 'GET_SHEETS_REQUEST'
export const GET_SHEETS_FAILURE = 'GET_SHEETS_FAILURE'
export const REMOVE_SHEETS = 'REMOVE_SHEETS'
export const UPDATE_SHEETS = 'UPDATE_SHEETS'
import { CALL_API } from 'redux-api-middleware'

export function addSheets (sheets) {
  return {
    type: 'ADD_SHEETS',
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

export function removeSheets (sheets) {
  return {
    type: 'REMOVE_SHEETS',
    payload: sheets
  }
}
export function updateSheets (sheets) {
  return {
    type: 'UPDATE_SHEETS',
    payload: sheets
  }
}

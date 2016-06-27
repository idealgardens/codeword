export const GET_SHEETS_SUCCESS = 'GET_SHEETS_SUCCESS'
export const GET_SHEETS_REQUEST = 'GET_SHEETS_REQUEST'
export const GET_SHEETS_FAILURE = 'GET_SHEETS_FAILURE'
import { CALL_API } from 'redux-api-middleware'

export function getSheets () {
  return {
    [CALL_API]: {
      endpoint: '/api/sheets',
      method: 'GET',
      types: [ GET_SHEETS_REQUEST, GET_SHEETS_SUCCESS, GET_SHEETS_FAILURE ]
    }
  }
}

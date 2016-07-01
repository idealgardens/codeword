import { CALL_API } from 'redux-api-middleware'
import * as types from 'constants/ActionTypes'

export function getUser (username) {
  if (!username) {
    throw new Error('Username is required to get user data')
  }
  return {
    [CALL_API]: {
      headers: { 'Content-Type': 'application/json' },
      endpoint: `/api/users`,
      method: 'get',
      types: [
        types.GET_USER_REQUEST,
        types.GET_USER_SUCCESS,
        types.GET_USER_FAILURE
      ]
    }
  }
}
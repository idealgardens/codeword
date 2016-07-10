import {
  GET_GROUPS_SUCCESS,
  GET_GROUPS_REQUEST,
  GET_GROUPS_FAILURE
} from '../constants/ActionTypes'
import { CALL_API } from 'redux-api-middleware'

// Get from TSheets API
export function getGroups () {
  return {
    [CALL_API]: {
      endpoint: '/api/groups',
      method: 'GET',
      types: [
        GET_GROUPS_REQUEST,
        GET_GROUPS_SUCCESS,
        GET_GROUPS_FAILURE
      ]
    }
  }
}

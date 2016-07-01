import {
  GET_CLIENTS_REQUEST,
  GET_CLIENTS_SUCCESS,
  GET_CLIENTS_FAILURE
} from '../constants/ActionTypes'
import { groupBy } from 'lodash'
export default function clients (state = {
  isFetching: false
}, action) {
  switch (action.type) {
    case GET_CLIENTS_REQUEST:
      return Object.assign({}, state, {
        isFetching: true,
        didInvalidate: false
      })
    case GET_CLIENTS_FAILURE:
      console.error('error getting sheets:', action)
      return Object.assign({}, state, {
        isFetching: false,
        error: action.payload
      })
    case GET_CLIENTS_SUCCESS:
      console.log('action:', action.payload)
      if (!action.payload) {
        console.error('No users found')
        return state
      }
      return Object.assign({}, state, {
        isFetching: false,
        items: groupBy(action.payload, 'location'),
        didInvalidate: false
      })
    default:
      return state
  }
}

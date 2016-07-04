import {
  GET_CLIENTS_REQUEST,
  GET_CLIENTS_SUCCESS,
  GET_CLIENTS_FAILURE,
  UPDATE_CLIENT_SUCCESS
} from '../constants/ActionTypes'
import { groupBy, camelCase } from 'lodash'
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
    // case UPDATE_CLIENT_SUCCESS:
    //   console.log('action:', action.payload, state)
    //   if (!action.payload) {
    //     console.error('No users found')
    //     return state
    //   }
    //   let newItems = state.items
    //   newItems[camelCase(action.payload.name)] = action.client
    //   console.log('newItems', newItems)
    //   return Object.assign({}, state, {
    //     isFetching: false,
    //     items: groupBy(newItems, 'location'),
    //     didInvalidate: false
    //   })
    default:
      return state
  }
}

import {
  GET_USERS_REQUEST,
  GET_USERS_SUCCESS,
  GET_USERS_FAILURE
} from '../constants/ActionTypes'
export default function users (state = {
  isFetching: false,
  items: {}
}, action) {
  switch (action.type) {
    case GET_USERS_REQUEST:
      return Object.assign({}, state, {
        isFetching: true,
        didInvalidate: false
      })
    case GET_USERS_FAILURE:
      console.error('error getting sheets:', action)
      return Object.assign({}, state, {
        isFetching: false,
        error: action.payload
      })
    case GET_USERS_SUCCESS:
      if (!action.payload) {
        console.error('No users found')
        return state
      }
      return Object.assign({}, state, {
        isFetching: false,
        items: action.payload,
        didInvalidate: false
      })
    default:
      return state
  }
}

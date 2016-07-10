import {
  GET_GROUPS_REQUEST,
  GET_GROUPS_SUCCESS,
  GET_GROUPS_FAILURE
} from '../constants/ActionTypes'

export default function groups (state = {
  isFetching: false,
  items: {}
}, action) {
  switch (action.type) {
    case GET_GROUPS_REQUEST:
      return Object.assign({}, state, {
        isFetching: true,
        didInvalidate: false
      })
    case GET_GROUPS_FAILURE:
      console.error('error getting sheets:', action)
      return Object.assign({}, state, {
        isFetching: false,
        error: action.payload
      })
    case GET_GROUPS_SUCCESS:
      if (!action || !action.payload) {
        console.error('No timesheets found', action)
        return state
      }
      return Object.assign({}, state, {
        isFetching: false,
        items: action.payload.results.groups
      })
    default:
      return state
  }
}

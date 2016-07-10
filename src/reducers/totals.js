import {
  GET_TOTALS_REQUEST,
  GET_TOTALS_SUCCESS,
  GET_TOTALS_FAILURE
} from '../constants/ActionTypes'
export default function totals (state = {
  isFetching: false,
  items: {}
}, action) {
  switch (action.type) {
    case GET_TOTALS_REQUEST:
      return Object.assign({}, state, {
        isFetching: true,
        didInvalidate: false
      })
    case GET_TOTALS_FAILURE:
      console.error('error getting sheets:', action)
      return Object.assign({}, state, {
        isFetching: false,
        status: action.payload.status,
        error: action.payload.statusText
      })
    case GET_TOTALS_SUCCESS:
      if (!action.payload) {
        console.error('No users found')
        return state
      }
      return Object.assign({}, state, {
        isFetching: false,
        items: action.payload.totals
      })
    default:
      return state
  }
}

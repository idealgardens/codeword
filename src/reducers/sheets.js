import {
  GET_SHEETS_REQUEST,
  GET_SHEETS_SUCCESS,
  GET_SHEETS_FAILURE
} from '../constants/ActionTypes'

export default function sheets (state = {
  isFetching: false,
  items: []
}, action) {
  switch (action.type) {
    case GET_SHEETS_REQUEST:
      return Object.assign({}, state, {
        isFetching: true,
        didInvalidate: false
      })
    case GET_SHEETS_FAILURE:
      console.error('error getting sheets:', action)
      return Object.assign({}, state, {
        isFetching: false,
        error: action.payload
      })
    case GET_SHEETS_SUCCESS:
      if (!action || !action.payload) {
        console.error('No timesheets found', action)
        return state
      }
      return Object.assign({}, state, {
        isFetching: false,
        items: action.payload.results.timesheets
      })
    default:
      return state
  }
}

import {
  GET_SHEETS_REQUEST,
  GET_SHEETS_SUCCESS,
  GET_SHEETS_FAILURE
} from '../actions/sheets'
import { toArray } from 'lodash'
export default function users (state = {
  isFetching: false,
  items: []
}, action) {
  switch (action.type) {
    case GET_SHEETS_REQUEST:
      return Object.assign({}, state, {
          isFetching: true,
          didInvalidate: false
        })
      break
    case GET_SHEETS_FAILURE:
      console.error('error getting sheets:', action)
      return Object.assign({}, state, {
          isFetching: false,
          error: action.payload
        })
      break
    case GET_SHEETS_SUCCESS:
      if (!action.payload.results.timesheets) {
        console.error('No timesheets found')
        return state
      }
      return Object.assign({}, state, {
        isFetching: false,
        items: toArray(action.payload.supplemental_data.users),
        didInvalidate: false
      })
    break
  default:
    return state
  }
}

import {
  LOGIN_SUCCESS,
  LOGIN_REQUEST,
  LOGIN_FAILURE,
  SIGNUP_SUCCESS,
  SIGNUP_REQUEST,
  SIGNUP_FAILURE,
  LOGOUT_SUCCESS,
  LOGOUT_REQUEST,
  LOGOUT_FAILURE
} from '../actions/account'
import { toArray } from 'lodash'
export default function account (state = {
  isFetching: false,
  items: []
}, action) {
  switch (action.type) {
    case LOGIN_REQUEST:
      return Object.assign({}, state, {
          isFetching: true,
          didInvalidate: false
        })
      break
    case LOGIN_FAILURE:
      console.error('error getting sheets:', action)
      return Object.assign({}, state, {
          isFetching: false,
          error: action.payload
        })
      break
    case LOGIN_SUCCESS:
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

import {
  GET_JOBCODES_REQUEST,
  GET_JOBCODES_SUCCESS,
  GET_JOBCODES_FAILURE,
  GET_SHEETS_SUCCESS,
  GET_USERS_SUCCESS
} from '../constants/ActionTypes'

export default function jobcodes (state = {
  isFetching: false,
  items: []
}, action) {
  switch (action.type) {
    case GET_JOBCODES_REQUEST:
      return Object.assign({}, state, {
        isFetching: true,
        didInvalidate: false
      })
    case GET_JOBCODES_FAILURE:
      console.error('error getting sheets:', action)
      return Object.assign({}, state, {
        isFetching: false,
        error: action.payload
      })
    case GET_JOBCODES_SUCCESS:
      if (!action || !action.payload) {
        console.error('No timesheets found', action)
        return state
      }
      return Object.assign({}, state, {
        isFetching: false,
        items: action.payload.results.jobcodes
      })
    case GET_SHEETS_SUCCESS:
      if (!action || !action.payload) {
        console.error('No timesheets found', action)
        return state
      }
      return Object.assign({}, state, {
        isFetching: false,
        items: action.payload.supplemental_data.jobcodes
      })
    case GET_USERS_SUCCESS:
      if (!action || !action.payload) {
        console.error('No timesheets found', action)
        return state
      }
      return Object.assign({}, state, {
        isFetching: false,
        items: action.payload.supplemental_data.jobcodes
      })
    default:
      return state
  }
}

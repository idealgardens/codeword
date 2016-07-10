import {
  GET_REPORT_REQUEST,
  GET_REPORT_SUCCESS,
  GET_REPORT_FAILURE
} from '../constants/ActionTypes'
export default function totals (state = {
  isFetching: false,
  items: {}
}, action) {
  switch (action.type) {
    case GET_REPORT_REQUEST:
      return Object.assign({}, state, {
        isFetching: true,
        didInvalidate: false
      })
    case GET_REPORT_FAILURE:
      console.error('error getting sheets:', action)
      return Object.assign({}, state, {
        isFetching: false,
        status: action.payload.status,
        error: action.payload.statusText
      })
    case GET_REPORT_SUCCESS:
      if (!action.payload) {
        console.error('No users found')
        return state
      }
      console.log('report success:', action.payload)
      console.log('totals:', action.payload.totals)
      return Object.assign({}, state, {
        isFetching: false,
        items: action.payload.totals
      })
    default:
      return state
  }
}

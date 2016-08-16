import {
  GET_TOTALS_REQUEST,
  GET_TOTALS_SUCCESS,
  GET_TOTALS_FAILURE,
  GET_JOB_TOTALS_REQUEST,
  GET_JOB_TOTALS_SUCCESS,
  GET_JOB_TOTALS_FAILURE
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
      console.log('get totals success:', state, action)
      if (!action.payload) {
        console.error('No users found')
        return state
      }

      return Object.assign({}, state, {
        isFetching: false,
        items: Object.assign({...state.items}, action.payload.totals)
      })
    case GET_JOB_TOTALS_REQUEST:
      return Object.assign({}, state,
        {
          isFetching: true,
          didInvalidate: false
        })
    case GET_JOB_TOTALS_FAILURE:
      console.error('error getting sheets:', action)
      return Object.assign({}, state, {
        isFetching: false,
        status: action.payload.status,
        error: action.payload.statusText
      })
    case GET_JOB_TOTALS_SUCCESS:
      console.log('get job success:', state, action)
      if (!action.payload) {
        console.error('No users found')
        return state
      }
      const groupId = action.meta.groupId
      const locationTotals = {}
      locationTotals[groupId] = action.payload
      return Object.assign({}, state, {
        isFetching: false,
        items: Object.assign({...state.items}, { locations: locationTotals })
      })
    default:
      return state
  }
}

import {
  GET_USERS_REQUEST,
  GET_USERS_SUCCESS,
  GET_USERS_FAILURE,
  GET_SHEETS_SUCCESS
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
        items: action.payload.results.users,
        didInvalidate: false
      })
    // case GET_SHEETS_SUCCESS:
    //   if (!action || !action.payload) {
    //     console.error('No timesheets found', action)
    //     return state
    //   }
    //   console.log('users in supplemental_data:', action.payload.supplemental_data.users)
    //   return Object.assign({}, state, {
    //     isFetching: false,
    //     items: action.payload.supplemental_data.users
    //   })
    default:
      return state
  }
}

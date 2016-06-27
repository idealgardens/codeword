import { combineReducers } from 'redux'
import sheets from './sheets'
import users from './users'
import { routeReducer } from 'react-router-redux'

const rootReducer = combineReducers({
  sheets,
  users,
  router: routeReducer
})

export default rootReducer

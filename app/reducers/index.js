import { combineReducers } from 'redux'
import account from './account'
import sheets from './sheets'
import users from './users'
import { routeReducer } from 'react-router-redux'
import { firebaseStateReducer } from 'redux-react-firebase'

const rootReducer = combineReducers({
  sheets,
  users,
  account,
  firebase: firebaseStateReducer,
  router: routeReducer
})

export default rootReducer

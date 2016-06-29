import { combineReducers } from 'redux'
import { routerReducer as router } from 'react-router-redux'
import account from '../reducers/account'
import sheets from '../reducers/sheets'
import users from '../reducers/users'
export const makeRootReducer = (asyncReducers) => {
  return combineReducers({
    // Add sync reducers here
    account,
    sheets,
    users,
    router,
    ...asyncReducers
  })
}

export const injectReducer = (store, { key, reducer }) => {
  store.asyncReducers[key] = reducer
  store.replaceReducer(makeRootReducer(store.asyncReducers))
}

export default makeRootReducer

import { combineReducers } from 'redux'
import { routerReducer as router } from 'react-router-redux'
import account from '../reducers/account'
import sheets from '../reducers/sheets'
import users from '../reducers/users'
import clients from '../reducers/clients'
import totals from '../reducers/totals'

export const makeRootReducer = (asyncReducers) => {
  return combineReducers({
    // Add sync reducers here
    account,
    sheets,
    users,
    clients,
    totals,
    router,
    ...asyncReducers
  })
}

export const injectReducer = (store, { key, reducer }) => {
  store.asyncReducers[key] = reducer
  store.replaceReducer(makeRootReducer(store.asyncReducers))
}

export default makeRootReducer

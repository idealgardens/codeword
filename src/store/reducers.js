import { combineReducers } from 'redux'
import { firebaseStateReducer as firebase } from 'react-redux-firebase'
import locationReducer from './location'
import { reducer as form } from 'redux-form'
import clients from 'reducers/clients'
import groups from 'reducers/groups'
import jobcodes from 'reducers/jobcodes'
import sheets from 'reducers/sheets'
import totals from 'reducers/totals'
import users from 'reducers/users'

export const makeRootReducer = (asyncReducers) => {
  return combineReducers({
    // Add sync reducers here
    firebase,
    form,
    clients,
    groups,
    jobcodes,
    sheets,
    totals,
    users,
    location: locationReducer,
    ...asyncReducers
  })
}

export const injectReducer = (store, { key, reducer }) => {
  store.asyncReducers[key] = reducer
  store.replaceReducer(makeRootReducer(store.asyncReducers))
}

export default makeRootReducer

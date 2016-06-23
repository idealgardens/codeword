import { createStore, applyMiddleware, compose } from 'redux'
import rootReducer from '../reducers'
import thunk from 'redux-thunk'
// import { syncHistory } from 'react-router-redux'
import { apiMiddleware } from 'redux-api-middleware'
import {reduxReactFirebase} from 'redux-react-firebase'

export default function configureStore (initialState, history) {
  // const reduxRouterMiddleware = syncHistory(history)
  const createStoreWithMiddleware = compose(
    // applyMiddleware(thunk, reduxRouterMiddleware)
    reduxReactFirebase('https://idealgardens.firebaseio.com/', {
      userProfile: 'users' // path where user profiles are stored
    }),
    applyMiddleware(thunk, apiMiddleware)
  )(createStore)
  const store = createStoreWithMiddleware(rootReducer, initialState)

  return store
}

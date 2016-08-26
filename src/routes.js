import React from 'react' // eslint-disable-line
import { Route, IndexRoute, Router, browserHistory } from 'react-router'
import {
    App,
    Home,
    Account,
    Login,
    Signup,
    NotFound,
    Locations,
    Location
  } from './containers'
export default (store) => (
  <Router history={browserHistory} store={store}>
    <Route path='/' component={App}>
      <IndexRoute component={Home} />
      <Route path='login' component={Login} />
      <Route path='signup' component={Signup} />
      <Route path='account' component={Account} />
      <Route path='locations' component={Locations} />
      <Route path='locations/:locationName' component={Location} />
      <Route path='*' component={NotFound} />
    </Route>
  </Router>
)

import React from 'react' // eslint-disable-line
import { Route, IndexRoute, Router, browserHistory } from 'react-router'
import {
    App,
    Home,
    About,
    Account,
    Login,
    Signup,
    NotFound,
    Location
  } from './containers'
export default () => (
  <Router history={browserHistory}>
    <Route path='/' component={App}>
      <IndexRoute component={Home} />
      <Route path='*' component={NotFound} />
    </Route>
  </Router>
)

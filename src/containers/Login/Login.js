import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import GoogleButton from 'react-google-button'

// Components
import LoginForm from '../../components/LoginForm/LoginForm'
import Paper from 'material-ui/Paper'
import CircularProgress from 'material-ui/CircularProgress'
import Snackbar from 'material-ui/Snackbar'

import styles from './Login.scss'

import { firebase, helpers } from 'redux-firebasev3'
const { pathToJS, isLoaded } = helpers

type Props = {
  account: Object,
  authError: String,
  firebase: Object
};

@firebase()
@connect(
  // Map state to props
  ({firebase}) => ({
    authError: pathToJS(firebase, 'authError'),
    account: pathToJS(firebase, 'profile')
  })
)
export default class Login extends Component {
  props: Props

  static contextTypes = {
    router: PropTypes.object.isRequired
  }

  state = {
    snackCanOpen: false
  }

  componentWillReceiveProps ({ account }) {
    // Redirect if logged in
    if (account && account.email) {
      this.context.router.push('/locations')
    }
  }

  handleRequestClose = () =>
    this.setState({
      snackCanOpen: false
    })

  handleLogin = (loginData) => {
    this.setState({ snackCanOpen: true })
    this.props.firebase.login(loginData)
  }

  googleLogin = () => {
    this.setState({ snackCanOpen: true })
    this.props.firebase.login({ provider: 'google', type: 'popup' })
  }

  render () {
    const { account, authError } = this.props
    const { snackCanOpen } = this.state

    // Loading Spinner
    if (!isLoaded(account)) {
      return (
        <div className={styles.container}>
          <div className={styles.progress}>
            <CircularProgress mode='indeterminate' />
          </div>
        </div>
      )
    }

    return (
      <div className={styles.container}>
        <Paper className={styles.panel}>
          <LoginForm onLogin={this.handleLogin} />
        </Paper>
        <div className={styles.or}>
          <span>or</span>
        </div>
        <div className={styles.providers}>
          <GoogleButton onClick={this.googleLogin} />
        </div>
        {
          authError && authError.message
            ? <Snackbar
              open={authError && snackCanOpen}
              message={authError.message || 'Error'}
              action='close'
              autoHideDuration={3000}
              onRequestClose={this.handleRequestClose}
              />
            : null
        }
      </div>
    )
  }
}

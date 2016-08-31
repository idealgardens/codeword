import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'

// components
import SignupForm from 'components/SignupForm/SignupForm'

// material-ui components
import Paper from 'material-ui/Paper'
import CircularProgress from 'material-ui/CircularProgress'
import Snackbar from 'material-ui/Snackbar'

import GoogleButton from 'react-google-button'

// styles
import styles from './Signup.scss'

// redux/firebase
import { connect } from 'react-redux'
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
export default class Signup extends Component {
  props: Props

  static contextTypes = {
    router: PropTypes.object.isRequired
  }

  state = {
    errors: { email: null, password: null },
    snackCanOpen: false,
    errorMessage: null
  }

  componentWillReceiveProps ({ account }) {
    // Redirect if logged in
    if (account && account.username) {
      this.context.router.push('/locations')
    }
  }

  reset = () =>
    this.setState({
      errors: { email: null, password: null },
      snackCanOpen: false
    })

  closeToast = () => this.setState({ snackCanOpen: false })

  handleSignup = ({ email, password, username }) => {
    this.setState({ snackCanOpen: true })

    let newState = {
      errors: { email: null, password: null }
    }

    // Validate
    if (!email || !password) {
      newState.errors.email = email ? 'Email is required' : null
      newState.errors.password = password ? 'Password is required' : null
      return this.setState(newState)
    }

    this.props.firebase.createUser({ email, password }, { username, email })
  }

  render () {
    const { account, firebase, authError } = this.props
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
          <SignupForm onSignup={this.handleSignup} />
        </Paper>
        <div className={styles.or}>
          or
        </div>
        <GoogleButton
          onClick={() => { firebase.login({ provider: 'google', type: 'popup' }) }}
        />
        <div className={styles.login}>
          <span className='Signup-Login-Label'>
            Already have an account?
          </span>
          <Link className={styles.link} to='/login'>
            Login
          </Link>
        </div>
        {
          authError && authError.message && snackCanOpen
          ? (
            <Snackbar
              open={authError && snackCanOpen}
              message={authError.message || 'Signup error'}
              action='close'
              autoHideDuration={3000}
              onRequestClose={this.closeToast}
            />
          )
          : null
        }
      </div>
    )
  }
}

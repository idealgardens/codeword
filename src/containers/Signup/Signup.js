import React, { Component } from 'react'
import { Link } from 'react-router'

// components
import SignupForm from 'components/SignupForm/SignupForm'

// material-ui components
import Paper from 'material-ui/Paper'
import RaisedButton from 'material-ui/RaisedButton'
import CircularProgress from 'material-ui/CircularProgress'
import Snackbar from 'material-ui/Snackbar'

// firebase
import firebaseUtil from 'utils/firebase'

// styles
import styles from './Signup.scss'

type Props = {
  account: Object
}
export default class Signup extends Component {
  props: Props

  state = {
    errors: { username: null, password: null },
    snackCanOpen: false,
    errorMessage: null
  }
  /**
   * @function reset
   * @description Reset whole state (inputs, errors, snackbar open/close)
   */
  reset = () =>
    this.setState({
      errors: {},
      username: null,
      email: null,
      name: null,
      snackCanOpen: false,
      errorMessage: null
    })

  render () {
    const { isFetching } = this.props.account || {}

    /**
     * @function handleSignup
     * @description Call signup through redux-devshare action
     */
    const handleSignup = signupData => {
      const { email, provider, password } = signupData
      this.setState({ snackCanOpen: true, isLoading: true })

      let newState = {
        isLoading: false,
        errors: { username: null, email: null }
      }
      if (!provider && (!email || !password)) {
        newState.errors.email = email ? 'Email is required' : null
        newState.errors.password = password ? 'Password is required' : null
        return this.setState(newState)
      }
      if (email && password) {
        firebaseUtil.auth()
          .createUserWithEmailAndPassword(email, password)
          .catch((error) => {
            if (error) {
              console.error('Error logging in:', error)
              newState.errorMessage = error.message || 'Error with login'
            } else {
              console.log('time to redirect or login?', error)
            }
            this.setState(newState)
          })
      } else {
        console.warn('other signups not currently supported', provider)
      }
    }

    const closeToast = () => this.setState({ snackCanOpen: false })

    if (isFetching) {
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
          <SignupForm onSignup={handleSignup} />
        </Paper>
        <div className={styles.or}>
          or
        </div>
        <RaisedButton
          label='Sign in with Google'
          secondary
          onTouchTap={handleSignup.bind(this, { provider: 'google', type: 'popup' })}
        />
        <div className={styles.login}>
          <span className='Signup-Login-Label'>
            Already have an account?
          </span>
          <Link className={styles.link} to='/login'>Login</Link>
        </div>
        {
          this.state.errorMessage
          ? (
            <Snackbar
              open={this.state.snackCanOpen}
              message={this.state.errorMessage || 'Signup error'}
              action='close'
              autoHideDuration={3000}
              onRequestClose={closeToast}
            />
          )
          : null
        }

      </div>
    )
  }
}

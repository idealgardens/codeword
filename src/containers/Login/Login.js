import React, { Component } from 'react'
import { Link } from 'react-router'

// components
import LoginForm from 'components/LoginForm/LoginForm'

// material-ui components
import Paper from 'material-ui/Paper'
import CircularProgress from 'material-ui/CircularProgress'
import Snackbar from 'material-ui/Snackbar'
import RaisedButton from 'material-ui/RaisedButton'

// styles
import styles from './Login.scss'

// firebase
import firebase from 'utils/firebase'
type Props = {

}
export default class Login extends Component {
  props: Props

  state = {
    snackCanOpen: false,
    errors: { username: null, password: null },
    errorMessage: null
  }

  componentWillReceiveProps (nextProps) {
    const { authError } = nextProps
    if (authError) {
      this.setState({
        isLoading: false
      })
    }
  }

  render () {
    const { isLoading, snackCanOpen, errorMessage } = this.state
    const handleLogin = loginData => {
      this.setState({
        snackCanOpen: true,
        isLoading: true
      })

      const { email, password, provider } = loginData
      let newState = {
        isLoading: false,
        errors: { username: null, email: null }
      }
      if (!provider && (!email || !password)) {
        newState.errors.email = email ? 'Email is required' : null
        newState.errors.password = password ? 'Password is required' : null
        console.error('missing info', loginData, email, password)
        return this.setState(newState)
      }
      if (email && password) {
        firebase.auth()
          .signInWithEmailAndPassword(email, password)
          .catch((error) => {
            if (error) {
              console.error('Error logging in:', error)
              newState.errorMessage = error.message || 'Error with login'
            } else {
              console.log('time to redirect or login?', error)
            }
            this.setState(newState)
          })
      }
    }
    const closeToast = () => this.setState({ snackCanOpen: false })

    if (isLoading) {
      return (
        <div className={styles.container}>
          <div className={styles.progress}>
            <CircularProgress color='#EB8C01' mode='indeterminate' />
          </div>
        </div>
      )
    }

    return (
      <div className={styles.container}>
        <Paper className={styles.panel}>
          <LoginForm onLogin={handleLogin} />
        </Paper>
        <div className={styles.or}>
          or
        </div>
        <RaisedButton
          label='Sign in With Google'
          secondary
          onTouchTap={handleLogin.bind(this, { provider: 'google', type: 'popup' })}
        />
        <div className={styles.signup}>
          <span className={styles.label}>
            Need an account?
          </span>
          <Link className={styles.link} to='/signup'>
            Sign Up
          </Link>
        </div>
        {
          errorMessage
          ? (
            <Snackbar
              open={snackCanOpen && !!errorMessage}
              message={errorMessage}
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

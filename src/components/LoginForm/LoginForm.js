import React, { Component } from 'react'
import { Link } from 'react-router'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'
import Checkbox from 'material-ui/Checkbox'
import styles from './LoginForm.scss'

const fieldStyle = { width: '80%' }
const buttonStyle = { width: '100%' }

type Props = {
  account: Object,
  onLogin: Function
}
export default class LoginForm extends Component {
  props: Props

  state = { errors: { email: null, password: null } }

  /**
   * @function handleInputChange
   * @description Update the state with the values from the form inputs.
   * @fires context#setState
   */
  handleInputChange = (name, e) => {
    e.preventDefault()
    this.setState({
      [name]: e.target.value
    })
  }

  /**
  * @function handlePrivateChange
  * @description Store data in object instead of state
  */
  handlePrivateChange = (name, e) => {
    e.preventDefault()
    this[name] = e.target.value
  }

  handleLogin = e => {
    if (e && typeof e.preventDefault === 'function') e.preventDefault()
    const { email } = this.state
    if (!email || email === '') {
      return this.setState({
        errors: { email: 'Username required' }
      })
    }
    if (!this.password || this.password === '') {
      return this.setState({
        errors: { password: 'Password required' }
      })
    }
    const loginData = { email, password: this.password }
    if (this.props.onLogin) this.props.onLogin(loginData)
  }

  googleLogin = () => {
    this.props.onLogin('google')
  }

  render () {
    return (
      <form className={styles.form} onSubmit={this.handleLogin}>
        <TextField
          hintText='some@email.com'
          floatingLabelText='Username/Email'
          onChange={this.handleInputChange.bind(this, 'email')}
          errorText={this.state.errors.email}
          style={fieldStyle}
        />
        <TextField
          hintText='password'
          floatingLabelText='Password'
          type='password'
          onChange={this.handlePrivateChange.bind(this, 'password')}
          errorText={this.state.errors.password}
          style={fieldStyle}
        />
        <div className={styles.submit}>
          <RaisedButton
            label='Sign In'
            primary
            type='submit'
            disabled={this.props.account && this.props.account.isFetching}
            style={buttonStyle}
          />
        </div>
        <div className={styles.options}>
          <div className={styles.remember}>
            <Checkbox
              name='remember'
              value='remember'
              label='Remember'
              labelStyle={{ fontSize: '.8rem' }}
            />
          </div>
          <Link className={styles.recover} to='/recover'>
            Forgot Password?
          </Link>
        </div>
      </form>
    )
  }
}

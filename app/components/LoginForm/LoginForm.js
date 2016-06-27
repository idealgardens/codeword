import React, {Component} from 'react'
import { Link } from 'react-router'
import TextField from 'material-ui/lib/text-field'
import RaisedButton from 'material-ui/lib/raised-button'
import Checkbox from 'material-ui/lib/checkbox'
import './LoginForm.scss'

const fieldStyle = { width: '80%' }
const buttonStyle = { width: '100%' }

type Props = {
  account: Object,
  onLogin: Function
};
export default class LoginForm extends Component {
  props: Props;

  state = { errors: { username: null, password: null } }

  /**
  * @function handlePrivateChange
  * @description Store data in object instead of state
  */

  handleLogin = e => {
    if (e && typeof e.preventDefault === 'function') e.preventDefault()
    const { username } = this.state
    if (!username || username === '') {
      return this.setState({
        errors: { username: 'Username required' }
      })
    }
    if (!this.password || this.password === '') {
      return this.setState({
        errors: { password: 'Password required' }
      })
    }
    const loginData = { username, password: this.password }
    if (this.props.onLogin) this.props.onLogin(loginData)
  }

  googleLogin = () => {
    this.props.onLogin('google')
  }

  render () {
    const handlePrivateChange = (name, e) => {
      e.preventDefault()
      this[name] = e.target.value
    }

    /**
     * @function handleInputChange
     * @description Update the state with the values from the form inputs.
     * @fires context#setState
     */
    const handleInputChange = (name, e) => {
      e.preventDefault()
      this.setState({
        [name]: e.target.value
      })
    }
    return (
      <form className='LoginForm' onSubmit={this.handleLogin}>
        <TextField
          hintText='some@email.com'
          floatingLabelText='Username/Email'
          onChange={handleInputChange('username')}
          errorText={this.state.errors.username}
          style={fieldStyle}
        />
        <TextField
          hintText='password'
          floatingLabelText='Password'
          type='password'
          onChange={handlePrivateChange('password')}
          errorText={this.state.errors.password}
          style={fieldStyle}
        />
        <div className='LoginForm-Submit'>
          <RaisedButton
            label='Login'
            primary
            type='submit'
            disabled={this.props.account && this.props.account.isFetching}
            style={buttonStyle}
          />
        </div>
        <div className='LoginForm-Options'>
          <div className='LoginForm-Remember'>
            <Checkbox
              name='remember'
              value='remember'
              label='Remember'
              labelStyle={{ fontSize: '.8rem' }}
            />
          </div>
          <Link className='LoginForm-Recover-Link' to='/recover'>
          Forgot Password?
          </Link>
        </div>
      </form>
    )
  }
}

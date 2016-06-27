import React, { Component } from 'react'
import { Link } from 'react-router'
import AccountDropdown from '../AccountDropdown/AccountDropdown'
import './AccountManager.scss'

type Props = {
  account: Object,
  onLogoutClick: Function
}
export default class AccountManager extends Component {
  props: Props;

  render () {
    const { account, onLogoutClick } = this.props
    if (account && account.username) {
      return (
        <AccountDropdown
          account={account}
          onLogoutClick={onLogoutClick}
        />
      )
    }
    return (
      <div className='AccountManager-Buttons'>
        <Link className='AccountManager-Button' to='/login'>
          Login
        </Link>
        <Link className='AccountManager-Button' to='/signup'>
          Signup
        </Link>
      </div>
    )
  }
}

import React, { Component } from 'react'
import { Link } from 'react-router'
import AccountDropdown from '../AccountDropdown/AccountDropdown'
import styles from './AccountManager.scss'

type Props = {
  account: Object,
  onLogoutClick: Function
}
export default class AccountManager extends Component {
  props: Props

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
      <div className={styles.buttons}>
        <Link className={styles.button} to='/login'>
          Login
        </Link>
        <Link className={styles.button} to='/signup'>
          Signup
        </Link>
      </div>
    )
  }
}

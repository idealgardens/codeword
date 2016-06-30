import React, { Component } from 'react'

// styles
import styles from './Account.scss'

// firebase
// import firebaseUtil from 'utils/firebase'

type Props = {
  account: Object,
  logout: Function
}
export default class Acccount extends Component {
  props: Props

  render () {
    const { account, logout } = this.props
    const emailTo = `mailto:${account.email || ''}`
    return (
      <div className={styles.container}>
        <div className={styles.data}>
          <span className={`${styles.datapoint} ${styles.username}`}>
            {account.username}
          </span>
          <span className={`${styles.datapoint} ${styles.name}`}>
            {account.name || 'No Name'}
          </span>
          <span className={`${styles.datapoint} ${styles.role}`}>
            {account.role}
          </span>
          <a className={`${styles.datapoint} ${styles.email}`} href={emailTo}>
            {account.email}
          </a>
          <button className={styles.logout} onClick={logout}>
            Logout
          </button>
        </div>
      </div>
    )
  }
}

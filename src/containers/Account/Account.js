import React, { Component } from 'react'

// styles
import styles from './Account.scss'

// redux/firebase
import { connect } from 'react-redux'
import { firebase, helpers } from 'redux-firebasev3'
const { pathToJS } = helpers

type Props = {
  account: Object,
  firebase: Object
};

@firebase()
@connect(
  // Map state to props
  ({firebase}) => ({
    account: pathToJS(firebase, 'profile')
  })
)
export default class Acccount extends Component {
  props: Props

  render () {
    const { account, firebase } = this.props
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
          <button className={styles.logout} onClick={() => { firebase.logout() }}>
            Logout
          </button>
        </div>
      </div>
    )
  }
}

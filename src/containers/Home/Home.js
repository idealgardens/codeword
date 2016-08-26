import React, { Component } from 'react'
import { Link } from 'react-router'
import Paper from 'material-ui/Paper'

import styles from './Home.scss'

export default class Home extends Component {
  render () {
    return (
      <div className={styles.container}>
        <Paper className={styles.hero}>
          <span className={styles.welcome}>
            Welcome to the
          </span>
          <div className={styles.row}>
            <span className={styles.name}>
              Codeword
            </span>
            <span className={styles.dashboard}>
              Dashboard
            </span>
          </div>
          <div className={styles.instructions}>
            <Link to='/login'>Login</Link>
            <span>Or</span>
            <Link to='/signup'>Signup</Link>
            <span>To get Started</span>
          </div>
        </Paper>
      </div>
    )
  }
}

import React, { Component } from 'react'
import styles from './ClientRowCodes.scss'

type Props = {
  client: Object
}
export class ClientRowCodes extends Component {
  props: Props

  render () {
    return (
      <div className={styles.container}>
        <div className={styles.names}>
          <span>Account Admin</span>
          <span>Media Relations</span>
          <span>Job Code 3</span>
          <span>Job Code 4</span>
        </div>
        <div className={styles.values}>
          <span>12%</span>
          <span>30%</span>
          <span>10%</span>
          <span>5%</span>
        </div>
      </div>
    )
  }
}

export default ClientRowCodes

import React, { Component } from 'react'
import styles from './ClientRowHours.scss'

type Props = {
  client: Object
}
export class ClientRowHours extends Component {
  props: Props

  render () {
    const { client } = this.props
    return (
      <div className={styles.container}>
        <div className={styles.header}>
          <span>{client.scopedHours} Hours Scoped</span>
        </div>
        <div className={styles.details}>
          <div className={styles.section}>
            <span className={`${styles.hours} ${styles.positive}`}>{client.scopedHours}</span>
            <div className={styles.label}>
              <span>Hours</span>
              <span>Completed</span>
            </div>
          </div>
          <div className={styles.section}>
            <span className={`${styles.hours} ${styles.negative}`}>{client.scopedHours}</span>
            <div className={styles.label}>
              <span>Hours</span>
              <span>Left</span>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default ClientRowHours

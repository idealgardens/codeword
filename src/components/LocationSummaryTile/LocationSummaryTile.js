import React, { Component } from 'react'
import {
  Paper,
  FontIcon,
  CircularProgress,
  Toolbar,
  ToolbarTitle,
  ToolbarGroup
} from 'material-ui'
import ClosedIcon from 'react-material-icons/icons/navigation/more-horiz'
import { camelCase } from 'lodash'
import { Link } from 'react-router'

import styles from './LocationSummaryTile.scss'

type Props = {
  name: String,
  total: Number
}
export default class LocationSummaryTile extends Component {
  props: Props

  render () {
    let { name, total } = this.props
    name = name.replace('(', '').replace('?)', '').split(',')[0] // remove tsheets weird name wrapper
    return (
      <Paper className={styles.container}>
        <Toolbar style={{backgroundColor: 'white'}}>
          <ToolbarTitle className={styles.title} text={name} />
          <ToolbarGroup float='right'>
            <FontIcon><Link to={`/${camelCase(name)}`}><ClosedIcon /></Link></FontIcon>
          </ToolbarGroup>
        </Toolbar>
        <hr className={styles.underline} /><br />
        <div className={styles.diagram}>
          <div className={styles.graph}>
            <span className={styles.percentage}>{(Math.ceil(total) / 1600) * 100}%</span>
            <span className={styles.complete}>Complete</span>
            <CircularProgress
              mode='determinate'
              value={100}
              size={2}
              color='rgba(254, 148, 58, .2)'
              style={{position: 'absolute'}}
            />
            <CircularProgress
              mode='determinate'
              value={(Math.ceil(total) / 1600) * 100}
              color='rgba(255, 94, 58, 1)'
              style={{position: 'absolute'}}
              size={2}
            />
          </div>
        </div>
        <div className={styles.hours}>
          <div className={styles.hour}>
            <span className={`${styles.time} ${styles.positive}`}>{total}</span>
            <span>Hours</span>
            <span>Completed</span>
          </div>
          <hr className={styles.divider} /><br />
          <div className={styles.hour}>
            <span className={`${styles.time} ${styles.negative}`}>{Math.ceil(1600 - total)}</span>
            <span>Hours</span>
            <span>Left</span>
          </div>
        </div>
      </Paper>
    )
  }
}

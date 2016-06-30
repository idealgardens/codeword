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
import { reduce, camelCase } from 'lodash'
import { Link } from 'react-router'

import styles from './LocationSummaryTile.scss'

const tileStyle = {
  flexBasis: '28%',
  minWidth: '4rem'
}
type Props = {
  name: String,
  sheets: Array
}
export default class LocationSummaryTile extends Component {
  props: Props

  render () {
    let { name, sheets } = this.props
    const totalTime = Math.ceil(reduce(sheets.map(sheet => sheet.duration), (sum, n) => sum + n) / 3600)
    name = name.replace('(', '').replace('?)', '').split(',')[0] // remove tsheets weird name wrapper
    return (
      <Paper style={tileStyle}>
        <Toolbar style={{backgroundColor: 'white'}}>
          <ToolbarTitle className={styles.title} text={name} />
          <ToolbarGroup float='right'>
            <FontIcon><Link to={`/${camelCase(name)}`}><ClosedIcon /></Link></FontIcon>
          </ToolbarGroup>
        </Toolbar>
        <hr className={styles.underline} /><br />
        <div className={styles.diagram}>
          <div className={styles.graph}>
            <span className={styles.percentage}>{totalTime + 8}%</span>
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
              value={totalTime}
              color='rgba(255, 94, 58, 1)'
              style={{position: 'absolute'}}
              size={2}
            />
          </div>
        </div>
        <div className={styles.hours}>
          <div className={styles.hour}>
            <span className={`${styles.time} ${styles.positive}`}>{totalTime}</span>
            <span>Hours</span>
            <span>Completed</span>
          </div>
          <hr className={styles.divider} /><br />
          <div className={styles.hour}>
            <span className={`${styles.time} ${styles.negative}`}>{50 - totalTime}</span>
            <span>Hours</span>
            <span>Left</span>
          </div>
        </div>
      </Paper>
    )
  }
}

import React, { Component, PropTypes } from 'react'
import {
  Paper,
  FontIcon,
  CircularProgress,
  Toolbar,
  ToolbarTitle,
  ToolbarGroup
} from 'material-ui'
import MoreIcon from 'react-material-icons/icons/navigation/more-vert'
import { reduce } from 'lodash'
import { getWeekdaysInMonth } from '../../utils'

import './LocationTile.scss'

const tileStyle = {
  flexBasis: '28%',
  minWidth: '4rem'
}

export default class LocationTile extends Component {
  static propTypes = {
    name: PropTypes.string
  }

  render () {
    let { name, sheets } = this.props
    name = name.replace('(', '').replace('?)', '').split(',')[0] // remove tsheets weird name wrapper

    const totalWorkedTime = Math.ceil(reduce(sheets.map(sheet => sheet.duration), (sum, n) => sum + n) / 3600)
    const workHoursInThisMonth = Math.ceil(getWeekdaysInMonth() * 8)
    console.log(`${name} Total Worked Time: ${totalWorkedTime}`)
    console.log(`Work hours in this month: ${workHoursInThisMonth}`)
    console.log('Unrounded:', totalWorkedTime / workHoursInThisMonth)
    console.log('Rounded:', Math.ceil(totalWorkedTime / workHoursInThisMonth))
    return (
      <Paper style={tileStyle}>
        <Toolbar style={{backgroundColor: 'white'}}>
          <ToolbarTitle className='LocationTile-Title' text={name}/>
          <ToolbarGroup float='right'>
            <FontIcon>
              <MoreIcon />
            </FontIcon>
          </ToolbarGroup>
        </Toolbar>
        <hr className='LocationTile-Underline' /><br/>
        <div className='LocationTile-Diagram'>
          <div className='LocationTile-Graph'>
            <span style={{position: 'absolute', top: '2.8rem', left: '3.2rem'}}>{totalWorkedTime/workHoursInThisMonth}%</span>
            <span style={{position: 'absolute', top: '4.7rem', left: '2.6rem', fontSize: '.8rem'  }}>Complete</span>
            <CircularProgress mode="determinate" value={100} color='rgba(254, 148, 58, .2)' style={{position: 'absolute'}} size={2}/>
            <CircularProgress mode="determinate" value={totalWorkedTime/workHoursInThisMonth} color='rgba(255, 94, 58, 1)' style={{position: 'absolute'}} size={2}/>
          </div>
        </div>
        <div className='LocationTile-Hours'>
          <div className='LocationTile-Hour'>
            <span className='LocationTile-Time positive-text'>{totalWorkedTime}</span>
            <span>Hours</span>
            <span>Completed</span>
          </div>
          <hr className='LocationTile-Divider' /><br/>
          <div className='LocationTile-Hour'>
            <span className='LocationTile-Time negative-text'>{workHoursInThisMonth - totalWorkedTime}</span>
            <span>Hours</span>
            <span>Left</span>
          </div>
        </div>
      </Paper>
    )
  }
}

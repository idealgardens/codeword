import React, { Component } from 'react'
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

import './LocationTile.scss'

const tileStyle = {
  flexBasis: '28%',
  minWidth: '4rem'
}

const percentageStyle = {
  position: 'absolute',
  top: '2.8rem',
  left: '3.2rem'
}

const completedLabelStyle = {
  position: 'absolute',
  top: '4.7rem',
  left: '2.6rem',
  fontSize: '.8rem'
}
type Props = {
  name: String,
  sheets: Array
}
export default class LocationTile extends Component {
  props: Props

  render () {
    let { name, sheets } = this.props
    const totalTime = Math.ceil(reduce(sheets.map(sheet => sheet.duration), (sum, n) => sum + n) / 3600)
    name = name.replace('(', '').replace('?)', '').split(',')[0] // remove tsheets weird name wrapper
    return (
      <Paper style={tileStyle}>
        <Toolbar style={{backgroundColor: 'white'}}>
          <ToolbarTitle className='LocationTile-Title' text={name} />
          <ToolbarGroup float='right'>
            <FontIcon>
              <MoreIcon />
            </FontIcon>
          </ToolbarGroup>
        </Toolbar>
        <hr className='LocationTile-Underline' /><br />
        <div className='LocationTile-Diagram'>
          <div className='LocationTile-Graph'>
            <span style={percentageStyle}>{totalTime + 8}%</span>
            <span style={completedLabelStyle}>Complete</span>
            <CircularProgress
              mode='determinate'
              value={100}
              color='rgba(254, 148, 58, .2)'
              style={{position: 'absolute'}}
              size={2} />
            <CircularProgress
              mode='determinate'
              value={totalTime}
              color='rgba(255, 94, 58, 1)'
              style={{position: 'absolute'}}
              size={2} />
          </div>
        </div>
        <div className='LocationTile-Hours'>
          <div className='LocationTile-Hour'>
            <span className='LocationTile-Time positive-text'>{totalTime}</span>
            <span>Hours</span>
            <span>Completed</span>
          </div>
          <hr className='LocationTile-Divider' /><br />
          <div className='LocationTile-Hour'>
            <span className='LocationTile-Time negative-text'>{50 - totalTime}</span>
            <span>Hours</span>
            <span>Left</span>
          </div>
        </div>
      </Paper>
    )
  }
}

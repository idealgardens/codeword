import React, { Component, PropTypes } from 'react'
import {
  Paper,
  FontIcon,
  CircularProgress,
  Toolbar,
  ToolbarTitle,
  ToolbarGroup
} from 'material-ui'
import ClosedIcon from 'react-material-icons/icons/navigation/more-horiz'
import OpenIcon from 'react-material-icons/icons/navigation/more-vert'
import { reduce, camelCase } from 'lodash'
import { Link } from 'react-router'

import './LocationSummaryTile.scss'

const tileStyle = {
  flexBasis: '28%',
  minWidth: '4rem'
}

export default class LocationSummaryTile extends Component {
  static propTypes = {
    name: PropTypes.string,
    sheets: PropTypes.array
  }

  render () {
    let { name, sheets } = this.props
    const totalTime = Math.ceil(reduce(sheets.map(sheet => sheet.duration), (sum, n) => sum + n) / 3600)
    name = name.replace('(', '').replace('?)', '').split(',')[0] // remove tsheets weird name wrapper
    return (
      <Paper style={tileStyle}>
        <Toolbar style={{backgroundColor: 'white'}}>
          <ToolbarTitle className='LocationSummaryTile-Title' text={name}/>
          <ToolbarGroup float='right'>
            <FontIcon><Link to={`/${camelCase(name)}`}><ClosedIcon /></Link></FontIcon>
          </ToolbarGroup>
        </Toolbar>
        <hr className='LocationSummaryTile-Underline' /><br/>
        <div className='LocationSummaryTile-Diagram'>
          <div className='LocationSummaryTile-Graph'>
            <span style={{position: 'absolute', top: '2.8rem', left: '3.2rem'}}>{totalTime+8}%</span>
            <span style={{position: 'absolute', top: '4.7rem', left: '2.6rem', fontSize: '.8rem'  }}>Complete</span>
            <CircularProgress mode="determinate" value={100} color='rgba(254, 148, 58, .2)' style={{position: 'absolute'}} size={2}/>
            <CircularProgress mode="determinate" value={totalTime} color='rgba(255, 94, 58, 1)' style={{position: 'absolute'}} size={2}/>
          </div>
        </div>
        <div className='LocationSummaryTile-Hours'>
          <div className='LocationSummaryTile-Hour'>
            <span className='LocationSummaryTile-Time positive-text'>{totalTime}</span>
            <span>Hours</span>
            <span>Completed</span>
          </div>
          <hr className='LocationSummaryTile-Divider' /><br/>
          <div className='LocationSummaryTile-Hour'>
            <span className='LocationSummaryTile-Time negative-text'>{50 - totalTime}</span>
            <span>Hours</span>
            <span>Left</span>
          </div>
        </div>
      </Paper>
    )
  }
}

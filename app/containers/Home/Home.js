import React, { Component, PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import {
  Paper,
  Table,
  TableHeaderColumn,
  TableRow,
  TableHeader,
  TableRowColumn,
  TableBody,
  FontIcon,
  CircularProgress,
  Toolbar,
  ToolbarTitle,
  ToolbarGroup
} from 'material-ui'
import * as Actions from '../../actions/sheets'
import MoreIcon from 'react-material-icons/icons/navigation/more-vert'
import { groupBy, map, reduce } from 'lodash'
// import { Link } from 'react-router'
import './Home.scss'

export default class Home extends Component {
  componentDidMount () {
    this.props.getSheets()
  }
  render () {
    const { sheets, isLoading, users } = this.props
    const tileStyle = {
      flexBasis: '28%',
      minWidth: '4rem'
    }
    // console.log('sheets:', sheets)
    const locations = groupBy(sheets, 'location')
    const locationList = map(locations, (locationSheets, key) => {
      const totalTime = Math.ceil(reduce(locationSheets.map(sheet => sheet.duration), (sum, n) => sum + n) / 3600)
      const name = key.replace('(', '').replace('?)', '')
      return (
        <Paper style={tileStyle} key={`${key}`}>
          <Toolbar style={{backgroundColor: 'white'}}>
            <ToolbarTitle text={name} />
            <ToolbarGroup float='right'>
              <FontIcon>
                <MoreIcon />
              </FontIcon>
            </ToolbarGroup>
          </Toolbar>
          <hr className='Home-Underline' /><br/>
          <div className='Home-Graph'>
            <span>73%</span>
          </div>
          <div className='Home-Hours'>
            <div className='Home-Hour'>
              <span>{totalTime}</span>
              <span>Hours</span>
              <span>Completed</span>
            </div>
            <hr className='Home-Divider' /><br/>
            <div className='Home-Hours'>
              <div className='Home-Hour'>
                <span>{50 - totalTime}</span>
                <span>Hours</span>
                <span>Left</span>
              </div>
            </div>
          </div>
        </Paper>
      )
    })
    return (
      <div className='Home'>
        <div className='Home-Row'>
          {locationList}
        </div>
      </div>
    )
  }
}

// Place state of redux store into props of component
function mapStateToProps (state) {
  return {
    router: state.router,
    isLoading: state.users.isFetching,
    users: state.users.items,
    sheets: state.sheets.items
  }
}

// Place action methods into props
function mapDispatchToProps (dispatch) {
  return bindActionCreators(Actions, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)

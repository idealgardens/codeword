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
  CircularProgress
} from 'material-ui'
import * as Actions from '../../actions/sheets'
import { find, filter, groupBy, map, reduce } from 'lodash'
import { Link } from 'react-router'
import './Home.scss'

export default class Home extends Component {
  componentDidMount () {
    this.props.getSheets()
  }
  render () {
    const { sheets, isLoading } = this.props
    // console.log('sheets:', sheets)
    const locations = groupBy(sheets, 'location')
    const locationList = map(locations, (locationSheets, key) => {
      const totalTime = Math.ceil(reduce(locationSheets.map(sheet => sheet.duration), (sum, n) => sum + n) / 3600)
      return (
        <div className='Home-Location' key={`${key}`}>
          <span className='Home-Location-Name'>{key.replace('(', '').replace('?)', '')}</span><br/>
          <p>sheets: {locationSheets.length}</p>
          <p>people: {locationSheets.length}</p>
          <p>time: ~ {totalTime} hours</p>
        </div>
      )
    })
    return (
      <div className='Home'>
        <h2>Codeword Dashword</h2>
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

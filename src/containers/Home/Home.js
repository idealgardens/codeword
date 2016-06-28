import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as Actions from '../../actions/sheets'
console.log('actions:', Actions)
import { groupBy, map, reduce } from 'lodash'
import LocationSummaryTile from '../../components/LocationSummaryTile/LocationSummaryTile'
import LocationDetailTile from '../../components/LocationDetailTile/LocationDetailTile'

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
        <LocationSummaryTile key={key} name={name} sheets={locationSheets} />
      )
    })
    return (
      <div className='Home'>
        <div className='Home-Row'>
          {locationList}
        </div>
        <div className='Home-Row'>
          <LocationDetailTile name='New York City' sheets={locations} />
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

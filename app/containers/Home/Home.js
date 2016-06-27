import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as Actions from '../../actions'
import { groupBy, map } from 'lodash'
import LocationTile from '../../components/LocationTile/LocationTile'

// import { Link } from 'react-router'
import './Home.scss'

type Props = {
  account: Object,
  sheets: Array,
  isLoading: Boolean,
  getSheets: Function
}
export default class Home extends Component {
  props: Props

  componentDidMount () {
    this.props.getSheets()
  }

  render () {
    const { sheets } = this.props
    const locations = groupBy(sheets, 'location')
    const locationList = map(locations, (locationSheets, key) => {
      // const totalTime = Math.ceil(reduce(locationSheets.map(sheet => sheet.duration), (sum, n) => sum + n) / 3600)
      const name = key.replace('(', '').replace('?)', '')
      return (
        <LocationTile key={key} name={name} sheets={locationSheets} />
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
const mapStateToProps = ({ users, router, sheets }) => ({
  router,
  isLoading: users.isFetching,
  users: users.items,
  sheets: sheets.items
})

// Place action methods into props
const mapDispatchToProps = (dispatch) => bindActionCreators(Actions, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Home)

import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as Actions from 'actions/sheets'
import { groupBy, map, reduce } from 'lodash'
import LocationSummaryTile from 'components/LocationSummaryTile/LocationSummaryTile'
import LocationDetailTile from 'components/LocationDetailTile/LocationDetailTile'
import CircularProgress from 'material-ui/CircularProgress'

// import { Link } from 'react-router'
import styles from './Home.scss'

type Props = {
  sheets: Array,
  users: Array,
  isFetching: Boolean
}
export default class Home extends Component {
  props: Props

  componentDidMount () {
    this.props.getSheets()
  }
  render () {
    const { sheets, isFetching, users } = this.props
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
      <div className={styles.container}>
        <div className={styles.row}>
          {
            isFetching
            ? (
              <div className={styles.progress}>
                <CircularProgress color='#EB8C01' mode='indeterminate' size={2} />
              </div>
            )
            : locationList
          }
        </div>
      </div>
    )
  }
}

// Place state of redux store into props of component
function mapStateToProps (state) {
  return {
    router: state.router,
    isFetching: state.sheets.isFetching,
    users: state.users.items,
    sheets: state.sheets.items
  }
}

// Place action methods into props
function mapDispatchToProps (dispatch) {
  return bindActionCreators(Actions, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)

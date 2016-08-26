import React, { Component } from 'react'
import { map } from 'lodash'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import { getTotals, getLocationTotals } from 'actions/totals'
import { getGroups } from 'actions/groups'

import { getCity } from '../../utils'

import LocationSummaryTile from 'components/LocationSummaryTile/LocationSummaryTile'
import CircularProgress from 'material-ui/CircularProgress'

import styles from './Locations.scss'

type Props = {
  totals: Object,
  groups: Object,
  isFetching: Boolean,
  getTotals: Function,
  getGroups: Function,
  getLocationTotals: Function,
  locationTotals: Object
};

export class Locations extends Component {
  props: Props

  componentDidMount () {
    const { groups, totals, getTotals, getGroups } = this.props
    if (!groups || !totals) {
      getGroups()
      getTotals('43822, 43824, 43826')
    }
  }

  render () {
    const { totals, isFetching, groups } = this.props

    const locationList = map(totals, (total, key) => {
      if (key === '0') return // TODO: Show hours from outside of group
      const { city, initials } = getCity(groups[key].name.toUpperCase())
      return (
        <LocationSummaryTile
          key={key}
          name={city}
          initials={initials}
          total={total}
        />
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
            : (
              <div className={styles.tiles}>
                {locationList}
              </div>
            )
          }
        </div>
      </div>
    )
  }
}

// Place state of redux store into props of component
const mapStateToProps = ({ router, sheets, totals, users, groups }) => (
  {
    router,
    isFetching: sheets.isFetching || totals.isFetching,
    totals: totals.items.groups,
    groups: groups.items,
    users: users.items,
    sheets: sheets.items
  }
)

// Place action methods into props
const mapDispatchToProps = (dispatch) =>
  bindActionCreators({ getGroups, getTotals, getLocationTotals }, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Locations)

import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as Actions from 'actions/sheets'
import { getTotals } from 'actions/totals'
import { getGroups } from 'actions/groups'
import { map } from 'lodash'
import LocationSummaryTile from 'components/LocationSummaryTile/LocationSummaryTile'
import CircularProgress from 'material-ui/CircularProgress'

// import { Link } from 'react-router'
import styles from './Home.scss'

type Props = {
  totals: Object,
  isFetching: Boolean,
  getTotals: Function,
  getSheets: Function
}
export default class Home extends Component {
  props: Props

  componentDidMount () {
    if (!this.props.groups || !this.props.totals) {
      this.props.getGroups()
      this.props.getTotals()
    }
  }

  render () {
    const { totals, isFetching, groups } = this.props
    console.log('props:', {groups, totals})
    const locationList = map(totals, (total, key) => {
      if (key === '0') return // TODO: Show hours from outside of group
      return (
        <LocationSummaryTile key={key} name={groups[key].name} total={total} />
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
    router: router,
    isFetching: sheets.isFetching,
    totals: totals.items.groups,
    groups: groups.items,
    users: users.items,
    sheets: sheets.items
  }
)

// Place action methods into props
const mapDispatchToProps = (dispatch) =>
  bindActionCreators({ getGroups, getTotals }, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Home)

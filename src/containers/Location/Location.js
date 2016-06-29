import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as Actions from 'actions/sheets'
import { startCase } from 'lodash'
import LocationDetailTile from 'components/LocationDetailTile/LocationDetailTile'
import styles from './Location.scss'

type Props = {
  name: String,
  sheets: Array
}
export class Location extends Component {
  props: Props
  render () {
    const { name, sheets } = this.props
    return (
      <div className={styles.container}>
        <LocationDetailTile name={name} sheets={sheets} />
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  const name = startCase(window.location.pathname)
  return {
    name,
    sheets: state.sheets.items
  }
}
const mapDispatchToProps = (dispatch) => bindActionCreators(Actions, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Location)

import React, { Component } from 'react'
import styles from './Location.scss'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as Actions from '../../actions/sheets'

import LocationDetailTile from '../../components/LocationDetailTile/LocationDetailTile'

export class Location extends Component {

  render () {
    console.log('location render')
    return (
      <div>
        <LocationDetailTile />
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  console.log('state:', state)
  return {}
}
const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(Actions, dispatch)
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Location)

import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as Actions from 'actions/sheets'
import { startCase } from 'lodash'
import LocationDetailTile from 'components/LocationDetailTile/LocationDetailTile'
import styles from './Location.scss'

export class Location extends Component {

  render () {
    console.log('location render', this.props)
    return (
      <div className={styles.container}>
        <LocationDetailTile name={this.props.name}/>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  const { pathname } = window.location
  const name = startCase(pathname)
  return {
    name
  }
}
const mapDispatchToProps = (dispatch) => bindActionCreators(Actions, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Location)

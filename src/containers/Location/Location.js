import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as Actions from 'actions/clients'
import { startCase } from 'lodash'
import LocationDetailTile from 'components/LocationDetailTile/LocationDetailTile'
import ClientsTile from 'components/ClientsTile/ClientsTile'
import styles from './Location.scss'

type Props = {
  name: String,
  sheets: Array,
  users: Array,
  getSheets: Function
}
export class Location extends Component {
  props: Props

  componentDidMount () {
    this.props.getClients()
  }

  render () {
    console.log('this.props', this.props)
    const { name, sheets, params, users, clients } = this.props
    return (
      <div className={styles.container}>
        <div className={styles.header}>
          {name}
        </div>
        <ClientsTile clients={clients} />
        <LocationDetailTile name={name} sheets={sheets} users={users} />
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  const name = startCase(window.location.pathname)
  const initials = name.match(/\b(\w)/g).join('')
  console.log('initials:', initials)
  return {
    name,
    clients: state.clients.items ? state.clients.items[initials] || [] : [],
    users: state.users.items,
    sheets: state.sheets.items
  }
}
const mapDispatchToProps = (dispatch) => bindActionCreators(Actions, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Location)

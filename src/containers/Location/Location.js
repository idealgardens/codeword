import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { getClients } from 'actions/clients'
import { getUsers } from 'actions/users'
import { getSheets } from 'actions/sheets'
import { startCase, filter, uniq } from 'lodash'
import LocationDetailTile from 'components/LocationDetailTile/LocationDetailTile'
import ClientsTile from 'components/ClientsTile/ClientsTile'
import styles from './Location.scss'
import { getTsheetsFormat } from 'utils'

type Props = {
  name: String,
  sheets: Array,
  users: Array,
  clients: Array,
  getSheets: Function,
  getUsers: Function,
  getClients: Function
}
export class Location extends Component {
  props: Props

  componentDidMount () {
    this.props.getClients()
    this.props.getUsers()
    if (!this.props.sheets.length) {
      this.props.getSheets()
    }
  }

  render () {
    const { name, sheets, users, clients } = this.props
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
  // console.log('initials:', initials)
  const userIdList = uniq(filter(state.sheets.items, { location: getTsheetsFormat(name) }).map(sheet => sheet.user_id))
  return {
    name,
    clients: state.clients.items ? state.clients.items[initials] || [] : [],
    users: userIdList.map(id => state.users.items[id] || id),
    sheets: state.sheets.items
  }
}
const mapDispatchToProps = (dispatch) =>
  bindActionCreators({ getUsers, getClients, getSheets }, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Location)

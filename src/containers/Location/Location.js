import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { getClients } from 'actions/clients'
import { getUsers } from 'actions/users'
import { startCase, filter, uniq } from 'lodash'
import LocationDetailTile from 'components/LocationDetailTile/LocationDetailTile'
import ClientsTile from 'components/ClientsTile/ClientsTile'
import CircularProgress from 'material-ui/CircularProgress'
import styles from './Location.scss'
import { getTsheetsFormat } from 'utils'

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
    this.props.getUsers()
  }

  render () {
    console.log('location props', this.props)
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
  const userIdList = uniq(filter(state.sheets.items, { location: getTsheetsFormat(name) }).map(sheet => sheet.user_id))
  return {
    name,
    clients: state.clients.items ? state.clients.items[initials] || [] : [],
    users: userIdList.map(id => state.users.items[id] || {}),
    sheets: state.sheets.items
  }
}
const mapDispatchToProps = (dispatch) =>
  bindActionCreators({ getUsers, getClients }, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Location)

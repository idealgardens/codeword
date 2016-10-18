import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as Actions from 'actions'
import { getTsheetsFormat } from 'utils'
import { startCase, filter, uniq } from 'lodash'
import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'
import TextField from 'material-ui/TextField'

import LocationDetailTile from '../components/LocationDetailTile/LocationDetailTile'
import ClientsTile from '../components/ClientsTile/ClientsTile'

import styles from './Location.scss'

type Props = {
  name: String,
  sheets: Array,
  users: Array,
  clients: Array,
  getSheets: Function,
  getUsers: Function,
  getJobcodes: Function,
  getClients: Function,
  updateClient: Function
}
export class Location extends Component {
  props: Props

  state = { open: false, currentClient: { } }

  componentDidMount () {
    this.props.getClients()
    this.props.getSheets()
    this.props.getUsers()
    this.props.getJobcodes()
  }

  updateScopedHours = () => {
    this.props.updateClient(this.state.currentClient, this.state.newHours)
    this.setState({ open: false })
  }

  handleOpen = (client) => {
    this.setState({ open: true, currentClient: client })
  }

  handleClose = () => this.setState({ open: false })

  handleHoursChange = (e) => this.setState({ newHours: e.target.value })

  render () {
    const { name, sheets, users, clients } = this.props
    const { currentClient, open } = this.state
    const actions = [
      <FlatButton
        label='Cancel'
        secondary
        onTouchTap={this.handleClose}
     />,
      <FlatButton
        label='Update'
        primary
        keyboardFocused
        onTouchTap={this.updateScopedHours}
     />
    ]
    return (
      <div className={styles.container}>
        <div className={styles.header}>
          {name}
        </div>
        <ClientsTile clients={clients} onUpdateClick={this.handleOpen} />
        <LocationDetailTile name={name} sheets={sheets} users={users} />
        <Dialog
          title={`${currentClient.name}'s Scoped Hours`}
          actions={actions}
          modal={false}
          open={open}
          onRequestClose={this.handleClose}
         >
          <div className={styles.dialog}>
            <TextField
              hintText={currentClient.scopedHours}
              onChange={this.handleHoursChange}
              className={styles.input}
            />
            hours
          </div>
        </Dialog>
      </div>
    )
  }
}

const mapStateToProps = ({ sheets, users, clients, router, totals }) => {
  const name = startCase(window.location.pathname)
  const initials = name.match(/\b(\w)/g).join('')
  const location = getTsheetsFormat(name)
  const userIdList = uniq(filter(sheets.items, {location}).map(sheet => sheet.user_id))
  return {
    name,
    clients: clients.items ? clients.items[initials] || [] : [],
    users: userIdList.map(id => users.items[id] || id),
    totals: totals.items,
    sheets: sheets.items
  }
}
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(Actions, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Location)

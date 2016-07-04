import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { getClients, updateClient } from 'actions/clients'
import { getUsers } from 'actions/users'
import { getSheets } from 'actions/sheets'
import { startCase, filter, uniq } from 'lodash'
import LocationDetailTile from 'components/LocationDetailTile/LocationDetailTile'
import ClientsTile from 'components/ClientsTile/ClientsTile'
import styles from './Location.scss'
import { getTsheetsFormat } from 'utils'
import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'
import RaisedButton from 'material-ui/RaisedButton'
import TextField from 'material-ui/TextField'

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

  state = { open: false, currentClient: { } }

  componentDidMount () {
    this.props.getClients()
    this.props.getUsers()
    if (!this.props.sheets.length) {
      this.props.getSheets()
    }
  }

  updateScopedHours = (e, param2) => {
    console.log('updateScopedHours called', e, param2)
    this.props.updateClient(this.state.currentClient, this.state.newHours)
    this.setState({ open: false })
  }

  handleOpen = (client) => {
    console.log('open called with:', client)
    this.setState({ open: true, currentClient: client })
  }

  handleClose = () => {
    this.setState({open: false})
  }

  handleHoursChange = (e) => {
    console.log('handleHoursChange', e.target.value)
    this.setState({ newHours: e.target.value })
  }

  render () {
    const { name, sheets, users, clients } = this.props
    const { currentClient, open  } = this.state
    const actions = [
     <FlatButton
       label="Cancel"
       secondary={true}
       onTouchTap={this.handleClose}
     />,
     <FlatButton
       label="Submit"
       primary={true}
       keyboardFocused={true}
       onTouchTap={this.updateScopedHours}
     />,
   ];
    return (
      <div className={styles.container}>
        <div className={styles.header}>
          {name}
        </div>
        <ClientsTile clients={clients} onUpdateClick={this.handleOpen}/>
        <LocationDetailTile name={name} sheets={sheets} users={users} />
        <Dialog
           title={`${currentClient.name}'s Scoped Hours`}
           actions={actions}
           modal={false}
           open={open}
           onRequestClose={this.handleClose}
         >
         <TextField
           hintText={currentClient.scopedHours}
           onChange={this.handleHoursChange}
         />
        </Dialog>
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
  bindActionCreators({ getUsers, getClients, updateClient, getSheets }, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Location)

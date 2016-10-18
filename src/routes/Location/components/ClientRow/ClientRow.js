import React, { Component } from 'react'
import RaisedButton from 'material-ui/RaisedButton'
import IconButton from 'material-ui/IconButton'

import {
  TableRow, TableRowColumn
} from 'material-ui/Table'
import OpenIcon from 'react-material-icons/icons/navigation/more-vert'
import CloseIcon from 'react-material-icons/icons/navigation/more-horiz'

import ClientRowHours from '../ClientRowHours/ClientRowHours'
import ClientRowCodes from '../ClientRowCodes/ClientRowCodes'

import styles from './ClientRow.scss'

type Props = {
  client: Array,
  isLoading: Boolean,
  onUpdateClick: Function
}
export class ClientRow extends Component {
  props: Props

  state = { isOpen: false }

  handleUpdateClick = (client) => {
    if (this.props.onUpdateClick) this.props.onUpdateClick(client)
  }

  handleOpenClick = (client) => {
    this.setState({
      isOpen: true
    })
  }
  handleCloseClick = (client) => {
    this.setState({
      isOpen: false
    })
  }

  render () {
    const { client } = this.props
    // console.log('clients:', {clients})
    if (!this.state.isOpen) {
      return (
        <TableRow>
          <TableRowColumn>{client.name}</TableRowColumn>
          <TableRowColumn className={styles.column}>
            {client.scopedHours}
          </TableRowColumn>
          <TableRowColumn>
            <div className={styles.closedLast}>
              <IconButton onClick={() => this.handleOpenClick(client)}>
                <OpenIcon />
              </IconButton>
            </div>
          </TableRowColumn>
        </TableRow>
      )
    }
    return (
      <TableRow selectable={false} className={styles.open}>
        <TableRowColumn>
          <ClientRowHours client={client} />
        </TableRowColumn>
        <TableRowColumn>
          <div className={styles.codes}>
            <div className={styles.name}>
              <span>{client.name}</span>
            </div>
            <ClientRowCodes client={client} />
          </div>
        </TableRowColumn>
        <TableRowColumn className={styles.openLast}>
          <div className={styles.buttons}>
            <IconButton onClick={() => this.handleCloseClick(client)}>
              <CloseIcon />
            </IconButton>
            <RaisedButton
              label='Update'
              className={styles.update}
              primary
              onClick={() => this.handleUpdateClick(client)}
            />
          </div>
        </TableRowColumn>
      </TableRow>
    )
  }
}

export default ClientRow

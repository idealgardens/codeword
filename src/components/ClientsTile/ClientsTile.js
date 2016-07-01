import React, { Component } from 'react'
import { Paper } from 'material-ui'
import CircularProgress from 'material-ui/CircularProgress'
import {
  Table, TableBody, TableHeader,
  TableHeaderColumn, TableRow, TableRowColumn
  } from 'material-ui/Table'
import styles from './ClientsTile.scss'
import { find } from 'lodash'

type Props = {
  name: String,
  clients: Array,
  isLoading: Boolean
}
export class ClientsTile extends Component {
  props: Props

  render () {
    const { clients, isLoading, name } = this.props
    console.log('clients:', {clients})
    const clientsList = clients ? clients.map((client, i) => {
      return (
        <TableRow key={`Sheet-${i}`}>
          <TableRowColumn>{client.name}</TableRowColumn>
          <TableRowColumn>{client.scopedHours}</TableRowColumn>
        </TableRow>
      )
    }) : null
    return (
      <div className={styles.container}>
        <Paper className={styles.pane} zDepth={1}>
          <div className={styles.name}>
            Clients
          </div>
          <Table>
            <TableHeader adjustForCheckbox={false} displaySelectAll={false}>
              <TableRow>
                <TableHeaderColumn>Name</TableHeaderColumn>
                <TableHeaderColumn>Scoped Hours</TableHeaderColumn>
              </TableRow>
            </TableHeader>
            <TableBody displayRowCheckbox={false}>
                {
                  isLoading
                  ? (
                    <TableRow>
                      <TableRowColumn className={styles.loading}>
                        <CircularProgress size={1.5} />
                      </TableRowColumn>
                    </TableRow>
                  )
                  : clientsList
                }
            </TableBody>
          </Table>
        </Paper>
      </div>
    )
  }
}

export default ClientsTile

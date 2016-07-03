import React, { Component } from 'react'
import { Paper } from 'material-ui'
import CircularProgress from 'material-ui/CircularProgress'
import RaisedButton from 'material-ui/RaisedButton'
import {
  Table, TableBody, TableHeader,
  TableHeaderColumn, TableRow, TableRowColumn
  } from 'material-ui/Table'
import styles from './ClientsTile.scss'

type Props = {
  name: String,
  clients: Array,
  isLoading: Boolean
}
export class ClientsTile extends Component {
  props: Props

  render () {
    const { clients, isLoading } = this.props
    console.log('clients:', {clients})
    const clientsList = clients ? clients.map((client, i) => {
      return (
        <TableRow key={`Sheet-${i}`}>
          <TableRowColumn>{client.name}</TableRowColumn>
          <TableRowColumn>{client.scopedHours}</TableRowColumn>
          <TableRowColumn>
            <RaisedButton label='Update' className={styles.update} />
          </TableRowColumn>
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
                <TableHeaderColumn>Open</TableHeaderColumn>
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

import React, { Component } from 'react'
import { Paper } from 'material-ui'
import CircularProgress from 'material-ui/CircularProgress'
import {
  Table, TableBody, TableHeader,
  TableHeaderColumn, TableRow, TableRowColumn
} from 'material-ui/Table'
import ClientRow from 'components/ClientRow/ClientRow'

import styles from './ClientsTile.scss'

type Props = {
  name: String,
  clients: Array,
  isLoading: Boolean,
  onUpdateClick: Function
}
export class ClientsTile extends Component {
  props: Props

  render () {
    const { clients, isLoading } = this.props
    // console.log('clients:', {clients})
    const clientsList = clients ? clients.map((client, i) =>
      (
      <ClientRow
        key={`Client-${i}`}
        client={client}
        isLoading={isLoading}
        onUpdateClick={this.props.onUpdateClick.bind(this, client)}
      />
      )
    ) : null
    return (
      <div className={styles.container}>
        <Paper className={styles.pane} zDepth={1}>
          <div className={styles.name}>
            Clients
          </div>
          <Table selectable={false}>
            <TableHeader adjustForCheckbox={false} displaySelectAll={false}>
              <TableRow>
                <TableHeaderColumn>Name</TableHeaderColumn>
                <TableHeaderColumn className={styles.column}>
                  Scoped Hours
                </TableHeaderColumn>
                <TableHeaderColumn />
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

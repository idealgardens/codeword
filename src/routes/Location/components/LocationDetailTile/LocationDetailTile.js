import React, { Component } from 'react'
import { Paper } from 'material-ui'
import CircularProgress from 'material-ui/CircularProgress'
import {
  Table, TableBody, TableHeader,
  TableHeaderColumn, TableRow, TableRowColumn
  } from 'material-ui/Table'
import styles from './LocationDetailTile.scss'

type Props = {
  name: String,
  users: Array,
  isLoading: Boolean
}
export class LocationDetailTile extends Component {
  props: Props

  render () {
    const { users, isLoading } = this.props
    const sheetsList = users && users.map((user, i) => {
      if (!user) {
        return (
          <TableRow key={`Sheet-${i}`}>
            <TableRowColumn>{user.login}</TableRowColumn>
            <TableRowColumn>{user.first_name} {user.last_name}</TableRowColumn>
          </TableRow>
        )
      }
      return (
        <TableRow key={`Sheet-${i}`}>
          <TableRowColumn>{user.username}</TableRowColumn>
          <TableRowColumn>{user.first_name || 'John'} {user.last_name || 'Smith'}</TableRowColumn>
        </TableRow>
      )
    })
    return (
      <div className={styles.container}>
        <Paper className={styles.pane} zDepth={1}>
          <div className={styles.name}>
            Personnel
          </div>
          {
              isLoading || !users || !users.length
              ? (
                <Table fixedHeader={false} style={{minHeight: '5rem'}}>
                  <TableBody displayRowCheckbox={false}>
                    <TableRow>
                      <TableRowColumn className={styles.progress}>
                        <CircularProgress color='#EB8C01' size={1.5} />
                      </TableRowColumn>
                    </TableRow>
                  </TableBody>
                </Table>
              )
              : (
                <Table>
                  <TableHeader adjustForCheckbox={false} displaySelectAll={false}>
                    <TableRow>
                      <TableHeaderColumn>Email</TableHeaderColumn>
                      <TableHeaderColumn>Name</TableHeaderColumn>
                    </TableRow>
                  </TableHeader>
                  <TableBody displayRowCheckbox={false}>
                    {sheetsList}
                  </TableBody>
                </Table>
              )
            }
        </Paper>
      </div>
    )
  }
}

export default LocationDetailTile

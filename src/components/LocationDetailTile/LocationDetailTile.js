import React, { Component } from 'react'
import { Paper } from 'material-ui'
import CircularProgress from 'material-ui/CircularProgress'
import {
  Table, TableBody, TableHeader,
  TableHeaderColumn, TableRow, TableRowColumn
  } from 'material-ui/Table'
import styles from './LocationDetailTile.scss'
import { find } from 'lodash'

type Props = {
  name: String,
  sheets: Array,
  users: Array,
  isLoading: Boolean
}
export class LocationDetailTile extends Component {
  props: Props

  render () {
    const { sheets, users, isLoading, name } = this.props
    console.log('sheets:', {sheets, users})
    let idsList = []
    const sheetsList = users ? users.map((sheet, i) => {
      const user = find(users, { id: sheet.user_id })
      idsList.push(sheet.user_id)
      if (!user) {
        return (
          <TableRow key={`Sheet-${i}`}>
            <TableRowColumn>{sheet.user_id}</TableRowColumn>
            <TableRowColumn>{sheet.jobcode_id || 'John'}</TableRowColumn>
            <TableRowColumn>{sheet.location}</TableRowColumn>
          </TableRow>
        )
      }
      return (
        <TableRow key={`Sheet-${i}`}>
          <TableRowColumn>{user.username}</TableRowColumn>
          <TableRowColumn>{user.first_name || 'John'} {user.last_name || 'Smith'}</TableRowColumn>
          <TableRowColumn>{sheet.location}</TableRowColumn>
        </TableRow>
      )
    }) : null
    console.log('idsList', idsList)
    const timeList = find(sheets, { user_id: 41352 })
    console.log('timelist', timeList)
    return (
      <div className={styles.container}>
        <Paper className={styles.pane} zDepth={1}>
          <div className={styles.name}>
            {name}
          </div>
          <Table>
            <TableHeader adjustForCheckbox={false} displaySelectAll={false}>
              <TableRow>
                <TableHeaderColumn>Username</TableHeaderColumn>
                <TableHeaderColumn>Name</TableHeaderColumn>
                <TableHeaderColumn>Location</TableHeaderColumn>
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
                  : sheetsList
                }
            </TableBody>
          </Table>
        </Paper>
      </div>
    )
  }
}

export default LocationDetailTile

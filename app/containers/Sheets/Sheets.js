import React, { Component, PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Paper from 'material-ui/lib/paper'
import Table from 'material-ui/lib/table/table'
import TableHeaderColumn from 'material-ui/lib/table/table-header-column'
import TableRow from 'material-ui/lib/table/table-row'
import TableHeader from 'material-ui/lib/table/table-header'
import TableRowColumn from 'material-ui/lib/table/table-row-column'
import TableBody from 'material-ui/lib/table/table-body'
import CircularProgress from 'material-ui/lib/circular-progress'
import * as Actions from '../../actions/sheets'
import './Sheets.scss'
import { find } from 'lodash'

class Sheets extends Component {
  constructor (props) {
    super(props)
  }
  componentDidMount() {
    this.props.getSheets()
  }

  static propTypes = {

  }

  render () {
    const { sheets, isLoading } = this.props
    console.log('sheets:', sheets)
    const sheetsList = sheets ? sheets.map((sheet, i) => {
      const user = find(this.props.users, { id: sheet.user_id })
      return (
        <TableRow key={ `Sheet-${i}` }>
          <TableRowColumn>{ user.username }</TableRowColumn>
          <TableRowColumn>{ user.first_name || 'John'} { user.last_name || 'Smith'}</TableRowColumn>
          <TableRowColumn>{ sheet.location }</TableRowColumn>
        </TableRow>
      )
    }) : null
    return (
      <div className='Sheets'>
        <Paper className='Sheets-Pane' zDepth={1}>
          <Table>
            <TableHeader adjustForCheckbox={ false } displaySelectAll={ false }>
              <TableRow>
                <TableHeaderColumn>Username</TableHeaderColumn>
                <TableHeaderColumn>Name</TableHeaderColumn>
                <TableHeaderColumn>Location</TableHeaderColumn>
              </TableRow>
            </TableHeader>
            <TableBody displayRowCheckbox={ false }>
                {
                  isLoading ?
                  <TableRow>
                    <TableRowColumn className='Sheets-Loading'>
                      <CircularProgress size={1.5} />
                    </TableRowColumn>
                  </TableRow>
                  : sheetsList
                }
            </TableBody>
          </Table>
        </Paper>
      </div>
    )
  }
}

// Place state of redux store into props of component
function mapStateToProps (state) {
  return {
    router: state.router,
    isLoading: state.users.isFetching,
    users: state.users.items,
    sheets: state.sheets.items
  }
}

// Place action methods into props
function mapDispatchToProps (dispatch) {
  return bindActionCreators(Actions, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Sheets)

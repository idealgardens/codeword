import React, { Component } from 'react'

// Components
import Navbar from 'components/Navbar/Navbar'

// Styling
import Theme from '../../theme'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import styles from './App.scss'

// Tap Plugin
import injectTapEventPlugin from 'react-tap-event-plugin'
injectTapEventPlugin()

type Props = {
  account: Object,
  children: Array,
  logout: Function
}
export default class Main extends Component {
  props: Props

  static childContextTypes = {
    muiTheme: React.PropTypes.object
  }

  static contextTypes = {
    router: React.PropTypes.object.isRequired
  }

  getChildContext = () => {
    return {
      muiTheme: getMuiTheme(Theme)
    }
  }

  handleClick = loc => {
    this.context.router.push(`/${loc}`)
  }

  handleLogout = () => {
    this.props.logout()
    this.context.router.push('/')
  }

  render () {
    return (
      <div className={styles.container}>
        <Navbar
          account={this.props.account}
          onMenuClick={this.handleClick}
          onLogoutClick={this.handleLogout}
        />
        {this.props.children}
      </div>
    )
  }
}

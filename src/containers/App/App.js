import React, { Component, PropTypes } from 'react'

// Components
import Navbar from 'components/Navbar/Navbar'

// Styling
import Theme from '../../theme'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import styles from './App.scss'

// Tap Plugin
import injectTapEventPlugin from 'react-tap-event-plugin'
injectTapEventPlugin()

// redux/firebase
import { connect } from 'react-redux'
import { firebase, helpers } from 'redux-firebasev3'
const { pathToJS } = helpers

type Props = {
  account: Object,
  firebase: Object,
  children: Array
};

@firebase()
@connect(
  // Map state to props
  ({firebase}) => ({
    account: pathToJS(firebase, 'profile')
  })
)
export default class Main extends Component {
  props: Props

  static childContextTypes = {
    muiTheme: PropTypes.object
  }

  static contextTypes = {
    router: PropTypes.object.isRequired
  }

  getChildContext = () => (
    {
      muiTheme: getMuiTheme(Theme)
    }
  )

  handleClick = loc => {
    this.context.router.push(`/${loc}`)
  }

  handleLogout = () => {
    this.props.firebase.logout()
    this.context.router.push('/')
  }

  render () {
    const { account } = this.props
    return (
      <div className={styles.container}>
        <Navbar
          account={account}
          onMenuClick={this.handleClick}
          onLogoutClick={this.handleLogout}
        />
        {this.props.children}
      </div>
    )
  }
}

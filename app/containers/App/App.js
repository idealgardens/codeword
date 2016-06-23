import React, { Component, PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as Actions from '../../actions'

// Components
import Navbar from '../../components/Navbar/Navbar'
// Styling
import Theme from '../../theme'
import ThemeManager from 'material-ui/lib/styles/theme-manager'
import './App.scss'

// Tap Plugin
import injectTapEventPlugin from 'react-tap-event-plugin'
injectTapEventPlugin()
import { firebase, helpers } from 'redux-react-firebase'
const {isLoaded, isEmpty,  dataToJS, pathToJS} = helpers
@firebase([
  'todos'
])
@connect(
  ({firebase}) => {
    return ({
      auth: pathToJS(firebase, 'auth'),
      authError: pathToJS(firebase, 'authError'),
      profile: pathToJS(firebase, 'profile')
    })
  }
)
class Main extends Component {
  constructor (props) {
    super(props)
  }

  static childContextTypes = {
    muiTheme: React.PropTypes.object
  }

  static contextTypes = {
    router: React.PropTypes.object.isRequired
  }

  getChildContext = () => {
    return {
      muiTheme: ThemeManager.getMuiTheme(Theme)
    }
  }

  render () {
    const { firebase, auth, profile } = this.props

    const handleLogout = () => {
      this.props.firebase.logout()
      this.context.router.push(`/`)
    }

    const handleClick = (loc) => this.context.router.push(`/${loc}`)

    return (
      <div className="App">
        <Navbar
          account={ this.props.profile }
          onMenuClick={ handleClick }
          onLogoutClick={ handleLogout }
        />
        { this.props.children }
      </div>
    )
  }
}

// Place state of redux store into props of component
const mapStateToProps = (state) => {
  return {
    account: state.account,
    router: state.router
  }
}

// Place action methods into props
const mapDispatchToProps = (dispatch) => bindActionCreators(Actions, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Main)

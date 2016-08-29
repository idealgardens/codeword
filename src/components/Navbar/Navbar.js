import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'

// Components
import AppBar from 'material-ui/AppBar'
import IconMenu from 'material-ui/IconMenu'
import MenuItem from 'material-ui/MenuItem'
import FlatButton from 'material-ui/FlatButton'
import Avatar from 'material-ui/Avatar'
import styles from './Navbar.scss'
import IconButton from 'material-ui/IconButton'
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert'
import MediaQuery from 'react-responsive'

const primaryColor = '#EB8C01'
const stockPhotoUrl = 'https://s3.amazonaws.com/kyper-cdn/img/User.png'
const originSettings = { horizontal: 'right', vertical: 'top' }
const avatarSize = 50
const buttonStyle = { color: '#3C4144' }
const titleStyle = { color: primaryColor, textTransform: 'uppercase' }

type Props = {
  account: Object,
  onMenuClick: Function,
  onLogoutClick: Function
};

export class Navbar extends Component {
  props: Props

  static contextTypes = {
    router: PropTypes.object.isRequired
  }

  state = {
    menuOpen: false
  }

  selectItem = (item) => {
    if (item === 'logout' && this.props.onLogoutClick) {
      return this.props.onLogoutClick()
    }
    if (this.props.onMenuClick) this.props.onMenuClick(item)
  }

  render () {
    const { account } = this.props
    const { username, avatar_url } = account || {}

    const brandLinkLoc = username ? '/locations' : '/'

    const handleTitleTouch = () => this.context.router.push(brandLinkLoc)

    // Logged In Avatar
    const iconButton = (
      <Avatar
        className={styles.avatar}
        src={avatar_url || stockPhotoUrl}
        size={avatarSize}
      />
    )

    // Logged out menu (mobile and desktop)
    const mainMenu = (
      <div className={styles.menu}>
        <MediaQuery maxDeviceWidth={768} >
          <IconMenu
            iconButtonElement={
              <IconButton><MoreVertIcon /></IconButton>
            }
            targetOrigin={originSettings}
            anchorOrigin={originSettings}
          >
            <Link to='/signup'><MenuItem primaryText='Signup' /></Link>
            <Link to='/login'><MenuItem primaryText='Login' /></Link>
          </IconMenu>
        </MediaQuery>
        <MediaQuery minDeviceWidth={769} >
          <FlatButton
            label='Sign Up'
            style={buttonStyle}
            onClick={() => { this.selectItem('signup') }}
          />
          <FlatButton
            label='Sign In'
            style={buttonStyle}
            onClick={() => { this.selectItem('login') }}
          />
        </MediaQuery>
      </div>
    )

    // Menu based on logged in status
    const rightMenu = username ? (
      <IconMenu
        iconButtonElement={iconButton}
        targetOrigin={originSettings}
        anchorOrigin={originSettings}
        onChange={(e, item) => { this.selectItem(item) }}
      >
        <MenuItem primaryText='Account' value='account' />
        <MenuItem primaryText='About' value='about' />
        <MenuItem primaryText='Sign out' value='logout' />
      </IconMenu>
    ) : mainMenu

    return (
      <AppBar
        title='codeword'
        titleStyle={titleStyle}
        className={styles.navbar}
        showMenuIconButton={false}
        iconElementRight={rightMenu}
        onTitleTouchTap={handleTitleTouch}
      />
    )
  }
}

export default Navbar

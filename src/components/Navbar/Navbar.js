import React, { Component } from 'react'
import { Link } from 'react-router'

// Components
import AppBar from 'material-ui/AppBar'
import IconMenu from 'material-ui/IconMenu'
import MenuItem from 'material-ui/MenuItem'
import FlatButton from 'material-ui/FlatButton'
import Avatar from 'material-ui/Avatar'
import styles from './Navbar.scss'

const stockPhotoUrl = 'https://s3.amazonaws.com/kyper-cdn/img/User.png'
const originSettings = { horizontal: 'right', vertical: 'top' }
const avatarSize = 50
const buttonStyle = { color: '#3C4144' }

type Props = {
  account: Object,
  onMenuClick: Function,
  onLogoutClick: Function
}
export class Navbar extends Component {
  props: Props

  selectItem = (e, item) => {
    if (item === 'logout' && this.props.onLogoutClick) {
      return this.props.onLogoutClick()
    }
    if (this.props.onMenuClick) {
      this.props.onMenuClick(item)
    }
  }

  render () {
    const { username, avatar_url } = this.props.account ? this.props.account : {}
    const brandLinkLoc = username ? `/${username}` : '/'
    const iconButton = (
      <Avatar
        className={styles.avatar}
        src={avatar_url || stockPhotoUrl}
        size={avatarSize}
      />
    )
    const mainMenu = (
      <div className={styles.menu}>
        <FlatButton label='Sign Up' style={buttonStyle} onClick={this.selectItem.bind(this, null, 'signup')} />
        <FlatButton label='Sign In' style={buttonStyle} onClick={this.selectItem.bind(this, null, 'login')} />
      </div>
    )
    const rightMenu = username ? (
      <IconMenu
        iconButtonElement={iconButton}
        targetOrigin={originSettings}
        anchorOrigin={originSettings}
        onChange={this.selectItem}
      >
        <MenuItem primaryText='Account' value='account' />
        <MenuItem primaryText='About' value='about' />
        <MenuItem primaryText='Sign out' value='logout' />
      </IconMenu>
    ) : mainMenu
    return (
      <AppBar
        title={<Link className={styles.brand} to={brandLinkLoc}>codeword</Link>}
        titleStyle={{color: '#EB8C01'}}
        className={styles.navbar}
        showMenuIconButton={false}
        iconElementRight={rightMenu}
      />
    )
  }
}

export default Navbar

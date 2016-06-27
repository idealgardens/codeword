import React, { Component } from 'react'
import './Navbar.scss'
import { Link } from 'react-router'

// Components
import AppBar from 'material-ui/lib/app-bar'
import IconMenu from 'material-ui/lib/menus/icon-menu'
import MenuItem from 'material-ui/lib/menus/menu-item'
import FlatButton from 'material-ui/lib/flat-button'
import Avatar from 'material-ui/lib/avatar'

const stockPhotoUrl = 'https://s3.amazonaws.com/kyper-cdn/img/User.png'
const originSettings = { horizontal: 'right', vertical: 'top' }
const avatarSize = 50
const buttonStyle = { color: '#3C4144' }

type Props = {
  account: Object,
  onMenuClick: Function,
  onLogoutClick: Function
}
export default class Navbar extends Component {
  props: Props

  render () {
    const selectItem = (item) => {
      if (item === 'logout' && this.props.onLogoutClick) {
        return this.props.onLogoutClick()
      }
      if (this.props.onMenuClick) {
        this.props.onMenuClick(item)
      }
    }
    const { username, avatar_url } = this.props.account ? this.props.account : {} // eslint-disable-line
    const brandLinkLoc = `/${username || ''}`
    const iconButton = (
      <Avatar
        className='Navbar-Avatar'
        src={avatar_url || stockPhotoUrl} // eslint-disable-line
        size={avatarSize}
      />
    )
    const mainMenu = (
      <div className='Navbar-Main-Menu'>
        <FlatButton label='Sign Up' style={buttonStyle} onClick={selectItem('signup')} />
        <FlatButton label='Login' style={buttonStyle} onClick={selectItem('login')} />
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
        title={<Link className='Navbar-Brand' to={brandLinkLoc}>codeword</Link>}
        titleStyle={{color: '#EB8C01'}}
        className='Navbar'
        showMenuIconButton={false}
        iconElementRight={rightMenu}
      />
    )
  }
}

import React, { Component } from 'react'

// styles
import './Account.scss'

// firebase
// import firebaseUtil from '../../utils/firebase'

type Props = {
  account: Object,
  logout: Function
}
export default class Acccount extends Component {
  props: Props

  render () {
    const { account, logout } = this.props
    const emailTo = `mailto:${account.email || ''}`
    return (
      <div className='Acccount'>
        <div className='Acccount-Data'>
          <span className='Acccount-Datapoint Acccount-Username'>
            {account.username}
          </span>
          <span className='Acccount-Datapoint Acccount-Name'>
            {account.name || 'No Name'}
          </span>
          <span className='Acccount-Datapoint Acccount-Role'>
            {account.role}
          </span>
          <a className='Acccount-Datapoint Acccount-Email' href={emailTo}>
            {account.email}
          </a>
          <button className='Button' onClick={logout}>
            Logout
          </button>
        </div>
      </div>
    )
  }
}

import { Component } from 'react'

type Props = {
  children: Array
}
export default class RequireLogin extends Component {
  props: Props

  static onEnter (store) {
    return (nextState, transition) => {
      const { auth: { user } } = store.getState()
      if (!user) {
        // oops, not logged in, so can't be here!
        transition.to('/')
      }
    }
  }

  render () {
    return this.props.children
  }
}

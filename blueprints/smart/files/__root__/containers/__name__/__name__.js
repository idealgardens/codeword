import React, { Component } from 'react'
import styles from './<%= pascalEntityName %>.scss'
import { connect } from 'react-redux'

type Props = {

}
export class <%= pascalEntityName %> extends Component {
  props: Props;

  render () {
    return (
      <div></div>
    )
  }
}

const mapStateToProps = (state) => {
  return {}
}
const mapDispatchToProps = (dispatch) => {
  return {}
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(<%= pascalEntityName %>)

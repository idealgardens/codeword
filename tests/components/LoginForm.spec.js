/* global describe it expect */
// import { TestUtils } from 'react/addons'
import LoginForm from 'components/LoginForm/LoginForm'

describe('(Component) LoginForm', () => {
  it('exists', () => {
    expect(LoginForm).to.exist
  })
  // describe('React', () => {
  //   before('render and locate element', function() {
  //     var renderedComponent = TestUtils.renderIntoDocument(
  //       <LoginForm />
  //     )
  //
  //     // Searching for <input> tag within rendered React component
  //     // Throws an exception if not found
  //     var inputComponent = TestUtils.findRenderedDOMComponentWithTag(
  //       renderedComponent,
  //       'form'
  //     )
  //
  //     this.inputElement = inputComponent.getDOMNode()
  //   })
  //   it('<input> should be of type "checkbox"', function() {
  //     expect(this.inputElement.getAttribute('type')).to.equal('checkbox')
  //   })
  // })
})

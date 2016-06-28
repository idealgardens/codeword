import React from 'react'
import TestUtils from 'react-addons-test-utils'
import { <%= pascalEntityName %> } from 'containers/<%= pascalEntityName %>/<%= pascalEntityName %>'

function shallowRender (component) {
  const renderer = TestUtils.createRenderer()

  renderer.render(component)
  return renderer.getRenderOutput()
}

function shallowRenderWithProps (props = {}) {
  return shallowRender(<<%= pascalEntityName %> {...props} />)
}

describe('(Component) <%= pascalEntityName %>', () => {
  let _component
  let _props

  beforeEach(() => {
    _props = {
    }

    _component = shallowRenderWithProps(_props)
  })

  it('Should render correctly', () => {

  })
})

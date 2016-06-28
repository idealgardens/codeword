import React from 'react'
import TestUtils from 'react-addons-test-utils'
import { Location } from 'containers/Location/Location'

function shallowRender (component) {
  const renderer = TestUtils.createRenderer()

  renderer.render(component)
  return renderer.getRenderOutput()
}

function shallowRenderWithProps (props = {}) {
  return shallowRender(<Location {...props} />)
}

describe('(Component) Location', () => {
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

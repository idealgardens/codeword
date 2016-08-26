import React from 'react'
import TestUtils from 'react-addons-test-utils'
import { Locations } from 'containers/Locations/Locations'

function shallowRender (component) {
  const renderer = TestUtils.createRenderer()

  renderer.render(component)
  return renderer.getRenderOutput()
}

function shallowRenderWithProps (props = {}) {
  return shallowRender(<Locations {...props} />)
}

describe('(Component) Locations', () => {
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

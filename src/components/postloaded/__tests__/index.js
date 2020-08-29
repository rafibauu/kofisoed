import React from 'react'
import Adapter from 'enzyme-adapter-react-16'
import { configure } from 'enzyme'
import { createMount } from '@material-ui/core/test-utils'
import OnImagesLoaded from '../index'

configure({ adapter: new Adapter() })

describe('<OnImagesLoaded />', () => {
  let mount

  beforeAll(() => {
    mount = createMount()
  })

  afterAll(() => {
    mount.cleanUp()
  })

  it('should work', () => {
    const wrapper = mount(<OnImagesLoaded />)
    expect(wrapper.containsMatchingElement(<div />))
  })
})

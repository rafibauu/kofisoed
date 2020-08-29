import React from 'react'
import Adapter from 'enzyme-adapter-react-16'
import { configure } from 'enzyme'
import { createShallow } from '@material-ui/core/test-utils'
import ContentLoader from 'react-content-loader'
import ImageLoader from '../index'

configure({ adapter: new Adapter() })

describe('<ImageLoader />', () => {
  let shallow

  beforeAll(() => {
    shallow = createShallow()
  })

  it('should work', () => {
    const wrapper = shallow(<ImageLoader />)
    wrapper.find('content-loader-div').forEach(node => {
      expect(node.containsMatchingElement(<ContentLoader />)).toEqual(true)
    })
  })
})

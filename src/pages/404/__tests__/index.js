/* eslint-disable no-unused-vars */
import React from 'react'
import Adapter from 'enzyme-adapter-react-16'
import { configure } from 'enzyme'
import { createShallow } from '@material-ui/core/test-utils'
import NotFound from '../index'

configure({ adapter: new Adapter() })

describe('404 NotFound', () => {
  let shallow

  beforeAll(() => {
    shallow = createShallow()
  })

  fit('should work', () => {
    const wrapper = shallow(<NotFound />)
  })
})

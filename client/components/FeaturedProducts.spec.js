/* global describe beforeEach it */

import {expect} from 'chai'
import React from 'react'
import enzyme, {shallow} from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import {FeaturedProducts} from './FeaturedProducts'

const adapter = new Adapter()
enzyme.configure({adapter})

describe('Featured Products Component', () => {

  let features

  beforeEach(() => {
    features = shallow(<FeaturedProducts books ={[]} getBooks={() => {}} />)
  })

  it('Should display a Featured Bestsellers header', () => {
    expect(features.find('Header').children().contains('Featured Bestsellers')).to.be.equal(true)
  })

})

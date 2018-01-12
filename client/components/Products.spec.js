import {expect} from 'chai'
import React from 'react'
import enzyme, {shallow} from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import {Products} from './Products'

const adapter = new Adapter()
enzyme.configure({adapter})

describe('Products Component', () => {
 let products

 beforeEach(() => {
   products = shallow(<Products books ={[]} getBodoks={() => {}} />)
 })


 it('Header displays `All Books`', () => {
   console.log(products.find('Header').props())
   expect(products.find('Header').props().children).to.be.equal(' All Books ')
 })

 it('Products component contains <ProductCard /> Component', () => {
   console.log(products.children)
   expect(products.children()).to.be.equal('<ProductCard />')
 })
})

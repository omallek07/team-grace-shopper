import React,{Component} from 'react';
import { Button, Form } from 'semantic-ui-react'
import {connect} from 'react-redux'
import {changeOrderAddressThunk} from '../store'

 class AddressForm extends Component{

   constructor(){
     super();
     this.handleSubmit = this.handleSubmit.bind(this)
   }
   handleSubmit(evt){
     const streetOne = evt.target.addressOne.value
     const streetTwo = evt.target.addressTwo.value
     const city = evt.target.city.value
     const state = evt.target.state.value
     const zip = evt.target.zip.value
     const name = evt.target.name.value
     const email = evt.target.email.value
     const address = {streetOne,streetTwo,city,state,zip}
     this.props.changeOrderAddress(name, email ,address)
     this.props.changeAddressFlag()
   }
  render(){
    return (
      <Form onSubmit={(evt) => {this.handleSubmit(evt)}}>
        <Form.Field required >
          <label>Name:
            <Form.Input name='name' placeholder='Enter Name' />
          </label>
        </Form.Field>
        <br />
        <Form.Field required >
          <label>Email:
            <Form.Input name='email' placeholder='Enter Email' />
          </label>
        </Form.Field>
        <br />
        <Form.Field required >
          <label>Address line 1:
            <Form.Input name='addressOne' placeholder='Address line one' />
          </label>
        </Form.Field>
        <br />
        <Form.Field>
          <label>Address line 2:
            <Form.Input name='addressTwo' placeholder='Address line two' />
          </label>
        </Form.Field>
        <br />
        <Form.Field required >
          <label>city:
            <Form.Input name='city' placeholder='city' />
          </label>
        </Form.Field>
        <br />
        <Form.Field required >
          <label>state:
            <Form.Input name='state' placeholder='state' />
          </label>
        </Form.Field>
        <br />
        <Form.Field required >
          <label>zip:
            <Form.Input name='zip' placeholder='zip' />
          </label>
        </Form.Field>
        <br />
        <Button type='submit'>Submit</Button>
      </Form>
    )
  }
}

const mapDispatch = (dispatch) => {
  return {
    changeOrderAddress(name, email, address){
      dispatch(changeOrderAddressThunk(name, email, address))
    }
  }
}

export default connect(null, mapDispatch)(AddressForm);

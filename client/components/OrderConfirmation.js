import React, {Component} from 'react';
import { Button, Checkbox, Form, Label } from 'semantic-ui-react'
import Cart from './Cart'
import AddressForm from './AddressForm'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {withRouter} from 'react-router-dom'

class OrderConfirmation extends Component {

  constructor(){
    super();
    this.state = {
      addressFlag: false,
    }
    this.changeAddressFlag = this.changeAddressFlag.bind(this)
  }

  changeAddressFlag(){
    this.setState({addressFlag: !this.state.addressFlag})
  }
  render (){
    let user = this.props.user
    let address;
    let orderName;
    let len = Object.keys(this.props.currentOrder).length
    if (len){
      address = this.props.currentOrder.address
      orderName = this.props.currentOrder.name
    }
    else {
      address = this.props.user.address
      orderName = user.name
    }
    return (
      <div>
        <div>
          {
            (user.id || len) &&
            <div>
              <Label basic color = 'blue'>
                <b>Shipping Address :</b>
                <Label.Detail onClick = {()=>{this.changeAddressFlag()}}>
                  <font color='red'>change</font>
                </Label.Detail>
              </Label>
              <br /><br />
              <strong>{orderName}</strong>
              <div>{address.streetOne}</div>
              <div>{address.streetTwo}</div>
              <div>{address.city}</div>
              <div>{address.state}</div>
              <div>{address.zip}</div>
              <br />
            </div>
          }
        </div>
        {
          (user.id ?
            (this.state.addressFlag) &&
              <AddressForm changeAddressFlag = {this.changeAddressFlag}/>
            : (!len) ?
              <AddressForm changeAddressFlag = {this.changeAddressFlag}/>
              : (!this.state.addressFlag) &&
                <AddressForm changeAddressFlag = {this.changeAddressFlag}/>
          )
        }
        <Cart />
      </div>
    )
  }
}
const mapStateToProps = (state) => {
  return {
    user: state.user,
    currentOrder: state.currentOrder
  }
}

export default withRouter(connect(mapStateToProps)(OrderConfirmation))

OrderConfirmation.propTypes = {
  user: PropTypes.object.isRequired
}

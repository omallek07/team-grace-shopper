import React from 'react';
import {connect} from 'react-redux'

const ConfirmOrderInfo = (props) => {
  return (
    <div>
      {
        props.currentOrder.error ?
        <h1>Some of the items are OUT OF STOCK please order again</h1>
        :
        <div>
          <h1>Order is placed for {props.currentOrder.name}</h1>
          <h3>Your order is placed for delivery at :</h3>
          <h4>{props.currentOrder.address.streetOne}</h4>
          <h4>{props.currentOrder.address.streetTwo}</h4>
          <h4>{props.currentOrder.address.city}</h4>
          <h4>{props.currentOrder.address.state}</h4>
          <h4>{props.currentOrder.address.zip}</h4>
        </div>
      }
    </div>
  )
}

const mapState = (state) => {
  return {
    currentOrder: state.currentOrder
  }
}

export default connect(mapState)(ConfirmOrderInfo);

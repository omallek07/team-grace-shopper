import React, {Component} from 'react';
import { connect } from 'react-redux';

class UserOrders extends Component {
  render () {
    return (
      <h1>This is user Orders</h1>
    )
  }
}
//
//
/* Container */
export default connect(null, null)(UserOrders);

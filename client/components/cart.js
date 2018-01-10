import React, {Component} from 'react';
import { connect } from 'react-redux';

class Cart extends Component {
  render () {
    return (
      <h1>This is the cart page</h1>
    )
  }
}
//

/* Container */
export default connect(null, null)(Cart);

import React, { Component } from 'react';
import { connect } from 'react-redux';

class UserAccountDashboard extends Component {
  render () {
    return (
      <h1>This will display the users information, including email, password change, and shipping address</h1>
    )
  }
}

export default connect(null, null)(UserAccountDashboard);

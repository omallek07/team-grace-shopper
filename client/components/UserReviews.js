import React, {Component} from 'react';
import { connect } from 'react-redux';

class UserReviews extends Component {
  render () {
    return (
      <h1>This is user Reviews</h1>
    )
  }
}
//
//
/* Container */
export default connect(null, null)(UserReviews);

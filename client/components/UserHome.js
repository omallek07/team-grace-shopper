import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import FeaturedProducts from './FeaturedProducts.js';
import SearchForm from './SearchForm';

/**
 * COMPONENT
 */
export const UserHome = (props) => {
  const {email} = props;

  return (
    <div>
    <SearchForm />
    {
      email ?
      <h3>Welcome, {email}!</h3>
      :
      <h3>Welcome Guest!</h3>
    }
      <FeaturedProducts />
    </div>
  )
}

/**
 * CONTAINER
 */
const mapState = ({user}) => {
  return {
    email: user.email,
  }
}

export default connect(mapState)(UserHome)

/**
 * PROP TYPES
 */
UserHome.propTypes = {
  email: PropTypes.string
}

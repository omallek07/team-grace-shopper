import React, {Component} from 'react';
import { allUsersThunk } from '../store/adminAllUsers';
import { connect } from 'react-redux';
import { Dropdown } from 'semantic-ui-react';

export class AdminAllUsers extends Component {

  componentDidMount() {
    this.props.allUsersThunk()
  }

  render() {
    console.log(this.props)
    return (
      <h1>This will display all users</h1>
    )
  }
}

/* Container */

const mapState = ({ adminAllUsers }) => ({users:  adminAllUsers })

const mapDispatch = { allUsersThunk }

export default connect(mapState, mapDispatch)(AdminAllUsers)

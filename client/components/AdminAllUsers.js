import React, {Component} from 'react';
import { allUsersThunk } from '../store/adminAllUsers';
import { connect } from 'react-redux';
import { Dropdown } from 'semantic-ui-react';
import AdminViewAllUsers from './AdminViewAllUsers';

export class AdminAllUsers extends Component {
  constructor() {
    super()
    this.state = {
      value: ''
    }
    this.changeBool = this.changeBool.bind(this);
  }

  componentDidMount() {
    this.props.allUsersThunk()
  }

  changeBool(e, {value}) {
    this.setState({value})
  }

  render() {
    const {users} = this.props;
    const {value} = this.state;

    const orderOptions = [
      {
        key: 1,
        text: 'View Users',
        value: 'true'
      },
      {
        key: 2,
        text: 'Close List',
        value: 'false'
      }
    ]

    return (
      <div>
        {
          <Dropdown
            placeholder="View all users?"
            fluid
            selection
            options={orderOptions}
            onChange={this.changeBool}
          />
        }
        {
          value === 'true' && <AdminViewAllUsers users={users} />
        }
      </div>
    )
  }
}

/* Container */

const mapState = ({ adminAllUsers }) => ({users:  adminAllUsers })

const mapDispatch = { allUsersThunk }

export default connect(mapState, mapDispatch)(AdminAllUsers)

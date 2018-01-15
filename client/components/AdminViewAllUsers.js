import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Icon, Table } from 'semantic-ui-react';
import { allUsersThunk, deleteUserThunk, updateUserAdminStatusThunk } from '../store/adminAllUsers';

export class AdminViewAllUsers extends Component {
  constructor(props) {
    super(props)
    this.toggleAdmin = this.toggleAdmin.bind(this)
    this.deleteUserHandler = this.deleteUserHandler.bind(this)
  }

  toggleAdmin(id, status) {
    this.props.updateUserAdminStatusThunk(id, status)
  }

  deleteUserHandler(id) {
    this.props.deleteUserThunk(id)
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.users !== this.props.users) {
      this.props = nextProps.users;
    }
  }

  render () {
    const allUsers = this.props.users;
    return (
      <div>
        <Table structured>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>User Name</Table.HeaderCell>
              <Table.HeaderCell>User Email</Table.HeaderCell>
              <Table.HeaderCell>Admin</Table.HeaderCell>
              <Table.HeaderCell>Toggle Admin Status</Table.HeaderCell>
              <Table.HeaderCell>Delete User</Table.HeaderCell>
              <Table.HeaderCell>Password Reset</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
          {
            allUsers && allUsers.map(user => {
              return (
                <Table.Row key={user.id}>
                  <Table.Cell>
                    {user.name}
                  </Table.Cell>
                  <Table.Cell>
                    {user.email}
                  </Table.Cell>
                  <Table.Cell>
                    {
                     user.isAdmin
                     ? <div>True</div>
                     : <div>False</div>
                    }
                  </Table.Cell>
                  <Table.Cell textAlign="center">
                    <Icon name="key" link onClick={() => this.toggleAdmin(user.id, !user.isAdmin)} />
                  </Table.Cell>
                  <Table.Cell textAlign="center">
                    <Icon name="user delete" link onClick={() => this.deleteUserHandler(user.id)} />
                  </Table.Cell>
                  <Table.Cell textAlign="center">
                    <Icon name="repeat" />
                  </Table.Cell>
                </Table.Row>
              )
            })
          }
        </Table.Body>
      </Table>
    </div>
    )
  }
}

/* Container */

const mapState = null;

const mapDispatch = { allUsersThunk, deleteUserThunk, updateUserAdminStatusThunk }

export default connect(mapState, mapDispatch)(AdminViewAllUsers)

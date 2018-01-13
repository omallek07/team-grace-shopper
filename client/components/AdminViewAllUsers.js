import React from 'react';
import { Icon, Table } from 'semantic-ui-react';


const AdminViewAllUsers = (props) => {
  const allUsers = props.users;
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
                  {user.isAdmin.toString()}
                </Table.Cell>
                <Table.Cell textAlign="center">
                  <Icon name="key" />
                </Table.Cell>
                <Table.Cell textAlign="center">
                  <Icon name="user delete" />
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

export default AdminViewAllUsers;

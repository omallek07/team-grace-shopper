import React from 'react';
import AdminOrdersList from './AdminOrdersList';
import AdminAllUsers from './AdminAllUsers';
import AdminCreateNewBook from './AdminCreateNewBook';
import { Header } from 'semantic-ui-react';

const AdminDashboard = () => {

    return (
        <div>
          <Header> Welcome to the Administrative Dashboard </Header>
          All Orders Listed below:
            <AdminOrdersList />
          <br />
          <br />
          All Users Listed below:
            <AdminAllUsers />
          <br />
          <br />
          Add New Book to Supply List:
            <AdminCreateNewBook />
        </div>
    )
}

export default AdminDashboard;

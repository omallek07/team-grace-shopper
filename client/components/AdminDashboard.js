import React from 'react';
import { Link } from 'react-router-dom';
import AdminOrdersList from './AdminOrdersList';
import AdminAllUsers from './AdminAllUsers';
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
        </div>
    )
}

export default AdminDashboard;

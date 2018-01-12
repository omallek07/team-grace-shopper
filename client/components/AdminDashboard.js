import React from 'react';
import { Link } from 'react-router-dom';
import AdminOrdersList from './AdminOrdersList';
import { Header } from 'semantic-ui-react';

const AdminDashboard = () => {

    return (
        <div>
          <Header> Welcome to the Administrative Dashboard </Header>
          All Orders Listed below:
            <AdminOrdersList />
        </div>
    )
}

export default AdminDashboard;

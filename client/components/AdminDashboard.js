import React from 'react';
import { Link } from 'react-router-dom';
import history from '../history';
import AdminOrdersList from './AdminOrdersList';

function AdminDashboard () {

    return (
        <div>
          <h1> Admin dashboard placeholder </h1>
          {
            /* potential display for all orders within admin dashboard */
          }
          <AdminOrdersList />
        </div>
    )
}

export default AdminDashboard;

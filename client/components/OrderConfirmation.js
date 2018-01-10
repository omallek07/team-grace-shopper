import React from 'react';
import { Link } from 'react-router-dom';
import history from '../history';
// import { shippingAddress, productsOrdered } from './ConfirmInfo';

function OrderConfirmation({ shippingAddress, productsOrdered, paymentInfo }) {
    return (
        <div>
            This is the order confirmation page.
            You have purchased <productsOrdered />
        </div>
    )
}

export default OrderConfirmation;

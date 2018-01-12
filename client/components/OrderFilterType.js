import React from 'react';

const OrderFilterType = (props) => {
  const orders = props.type;
  return (
    <div>
      {
        orders && orders.map(order => {
          return (
            <div key={order.id}>
            status: {order.status}
            </div>
          )
        })
      }
    </div>
  )
}

export default OrderFilterType;

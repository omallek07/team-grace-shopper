import axios from 'axios'

/**
 * ACTION TYPES
 */
const ALL_ORDERS = 'ALL_ORDERS'
const UPDATE_ORDER_STATUS = 'UPDATE_ORDER_STATUS'


/**
 * ACTION CREATORS
 */
const allOrders = (orders) => ({type: ALL_ORDERS, orders})
const updateOrderStatus = (orderStatus) => ({type: UPDATE_ORDER_STATUS, orderStatus})


/**
 * THUNK CREATORS
 */
export const allOrdersThunk = () => dispatch => {
  return axios
    .get('/api/orders/adminAllOrders')
    .then(res => res.data)
    .then(orders => dispatch(allOrders(orders)))
    .catch(err => console.log(err));
}

export const updateOrderStatusThunk = ( orderId, status) => dispatch => {
  return axios
    .put(`/api/orders/adminAllOrders/${orderId}`, {status})
    .then(res => res.data)
    .then(orderStatus => dispatch(updateOrderStatus(orderStatus)))
    .catch(err => console.log(err));
}

/**
 * REDUCER
 */
export default function(orders = [], action) {

  switch (action.type) {
    case ALL_ORDERS:
      return action.orders;
    case UPDATE_ORDER_STATUS:
      return orders.map(order => (
        action.orderStatus.id === order.id ? action.orderStatus : order
      ))
    default:
      return orders;
  }
}

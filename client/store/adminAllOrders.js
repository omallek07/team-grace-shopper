import axios from 'axios'

/**
 * ACTION TYPES
 */
const ALL_ORDERS = 'ALL_ORDERS'


/**
 * ACTION CREATORS
 */
const allOrders = (orders) => {
  return {
    type: ALL_ORDERS,
    orders
  }
}

/**
 * THUNK CREATORS
 */
export const allOrdersThunk = () => dispatch => {
  return axios
    .get('/api/orders/adminAllOrders')
    .then(res => {
      return res.data })
    .then(orders => dispatch(allOrders(orders)))
    .catch(err => console.log(err));
}

/**
 * REDUCER
 */
export default function(orders = [], action) {

  switch (action.type) {
    case ALL_ORDERS:
      return action.orders;

    default:
      return orders;
  }
}

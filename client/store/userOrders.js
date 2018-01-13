import axios from 'axios'

/**
 * ACTION TYPES
 */
const INDIVIDUAL_USER_ORDERS = 'INDIVIDUAL_USER_ORDERS'


/**
 * ACTION CREATORS
 */
const individualUserOrders = (orders) => {
  return {
    type: INDIVIDUAL_USER_ORDERS,
    orders
  }
}

/**
 * THUNK CREATORS
 */
export const individualUserOrdersThunk = (userId) => dispatch => {
  return axios
    .get(`/api/orders/${userId}`)
    .then(res => res.data)
    .then(orders => dispatch(individualUserOrders(orders)))
    .catch(err => console.log(err));
}

/**
 * REDUCER
 */
export default function(orders = [], action) {

  switch (action.type) {
    case INDIVIDUAL_USER_ORDERS:
      return action.orders;

    default:
      return orders;
  }
}

import axios from 'axios'
import {getCart, addError} from './index'

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
    .get(`/api/orders/userId`)
    .then(res => res.data)
    .then(orders => dispatch(individualUserOrders(orders)))
    .catch(err => console.log(err));
}

export const placeUserOrderThunk = (currentOrder) => dispatch => {
  return axios
    .post(`/api/orders/checkout`, currentOrder)
    .then(() => dispatch(getCart()))
    .catch(err => {
      dispatch(getCart())
      dispatch(addError(err))}
    )
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

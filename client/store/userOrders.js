import axios from 'axios'
import {getCart} from './index'
/**
 * ACTION TYPES
 */
const INDIVIDUAL_USER_ORDERS = 'INDIVIDUAL_USER_ORDERS'
const PLACE_USER_ORDER = 'PLACE_USER_ORDER'

/**
 * ACTION CREATORS
 */
const individualUserOrders = (orders) => {
  return {
    type: INDIVIDUAL_USER_ORDERS,
    orders
  }
}

const placeUserOrder = (order) => {
  return {
    type: PLACE_USER_ORDER,
    order
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

export const placeUserOrderThunk = () => dispatch => {
  return axios
    .post(`/api/orders/checkout`)
    .then(()=>{
      console.log('placeUserOrderThunk')
      return dispatch(getCart())
    })
    // .then(order => dispatch())
    // .catch(err => console.log(err))
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

import axios from 'axios';

const SET_ORDER_ADDRESS = 'SET_ORDER_ADDRESS'
const CHANGE_ORDER_ADDRESS = 'CHANGE_ORDER_ADDRESS'

export const setOrderAddressAction = ( currentOrder ) => {
  return {
    type: SET_ORDER_ADDRESS,
    currentOrder
  }
}

export const changeOrderAddressThunk = (name, address) => dispatch => {
  return axios.post('/api/address', address)
    .then(res => res.data)
    .then(newAddress => dispatch(setOrderAddressAction({name, address:newAddress})))
}

export default function (currentOrder = {}, action){
  switch (action.type) {
    case SET_ORDER_ADDRESS:
      return action.currentOrder
    default:
      return currentOrder;
  }
}

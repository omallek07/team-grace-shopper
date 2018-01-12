import axios from 'axios'

const SET_CART = 'SET_CART'
// const UPDATE_CART = 'UPDATE_CART'
const initialState = {
  cart: []
}

const setCart = (cart) => {
  return {
    type: SET_CART,
    cart
  }
}

export const getCart = () => dispatch => {
  return axios
    .get('api/orders/cart')
    .then(res => res.data)
    .then(cart => dispatch(setCart(cart)))
    .catch(err => console.log(err));
}

export default function(state = initialState, action) {
  let newState = Object.assign({}, state);

  switch (action.type) {
    case SET_CART:
      newState.cart = action.cart;
      return newState;

    default:
      return state;
  }
}

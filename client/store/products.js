import axios from 'axios';

const GET_ALL_BOOKS = 'GET_ALL_BOOKS';

const initialState = {
    list: []
}

const getBooks = (products) => {
    return {
        type: GET_ALL_BOOKS,
        list: products
    }
}

export const getAllBooks = () => dispatch => {
    return axios
      .get('/api/books')
      .then(res => res.data)
      .then(products => dispatch(getBooks(products)))
      .catch(err => console.log(err));
}

export default function(state = initialState, action) {
    let newState = Object.assign({}, state);

    switch (action.type) {
      case GET_ALL_BOOKS:
        newState.list = action.list;
        return newState;

      default:
        return state;
    }
  }

/*    below is from previous reducer.   may scavenge for parts --Yates

import axios from 'axios';

 ------------ ACTIONS ------------

const GET_ALL_BOOKS = 'GET_ALL_BOOKS';
const PUT_NEW_PRODUCT = 'PUT_NEW_PRODUCT';
const UPDATE_PRODUCT = 'UPDATE_PRODUCT';
const DELETE_PRODUCT = 'DELETE_PRODUCT';
const ADD_PRODUCT_TO_CART = 'ADD_PRODUCT_TO_CART';

 --------- ACTION CREATORS ------------

const getAllBooks = bookObjList => {
  return {
    type: GET_ALL_BOOKS,
    list: bookObjList
  };
}

    customer actions
export const addProductToCart = (productObj) => {
    const newAction = {};
    newAction.productObj = productObj;
    newAction.type = ADD_PRODUCT_TO_CART;
    return newAction;
}
    customer/admin actions

    admin actions
export const makeNewProduct = (productObj) => {
    const newAction = {};
    newAction.productObj = productObj;
    newAction.type = PUT_NEW_PRODUCT;
    return newAction;
}

export const updateProduct = (productObj) => {
    const newAction = {};
    newAction.productObj = productObj;
    newAction.type = UPDATE_PRODUCT;
    return newAction;
}

export const deleteProduct = productObj => {
    const newAction = {};
    newAction.type = DELETE_PRODUCT;
    newAction.productObj = productObj;
    return newAction;
}


//  ------------- DISPATCHERS ------------

export const fetchAllBooks = () => dispatch => {
  return axios
    .get('/api/books')
    .then(res => res.data)
    .then(bookObjList => dispatch(getAllBooks(bookObjList)))
    .catch(err => console.log(err));
}

// ------------- REDUCER ------------

const initialState = {
  list: []
};

export default function productReducer (state = initialState, action) {
  let newState = Object.assign({}, state);

  switch (action.type) {
    case GET_ALL_BOOKS:
      newState.list = action.list;
      return action.newState;

    default:
      return state;
  }
}


*/

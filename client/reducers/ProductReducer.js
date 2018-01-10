import axios from 'axios';

/* ------------ ACTIONS ------------ */

const GET_ALL_BOOKS = 'GET_ALL_BOOKS';
// const PUT_NEW_PRODUCT = 'PUT_NEW_PRODUCT';
// const UPDATE_PRODUCT = 'UPDATE_PRODUCT';
// const DELETE_PRODUCT = 'DELETE_PRODUCT';
// const ADD_PRODUCT_TO_CART = 'ADD_PRODUCT_TO_CART';

/* --------- ACTION CREATORS ------------ */

const getAllBooks = books => ({ type: GET_ALL_BOOKS, books })

    // customer actions
// export const addProductToCart = (productObj) => {
//     const newAction = {};
//     newAction.productObj = productObj;
//     newAction.type = ADD_PRODUCT_TO_CART;
//     return newAction;
// }
    // customer/admin actions

    // admin actions
// export const makeNewProduct = (productObj) => {
//     const newAction = {};
//     newAction.productObj = productObj;
//     newAction.type = PUT_NEW_PRODUCT;
//     return newAction;
// }

// export const updateProduct = (productObj) => {
//     const newAction = {};
//     newAction.productObj = productObj;
//     newAction.type = UPDATE_PRODUCT;
//     return newAction;
// }

// export const deleteProduct = productObj => {
//     const newAction = {};
//     newAction.type = DELETE_PRODUCT;
//     newAction.productObj = productObj;
//     return newAction;
// }


/* ------------- DISPATCHERS ------------ */

export const fetchAllBooks = () => dispatch => {
  axios.get('/api/books')
  .then(res => dispatch(getAllBooks(res.data)))
  .catch(err => console.error('Fetching books unsuccessful', err));
}

/* ------------- REDUCER ------------ */

export default function productReducer (books = [], action) {
  switch (action.type) {
    case GET_ALL_BOOKS:
      return action.books;
    default:
      return books;
  }
}


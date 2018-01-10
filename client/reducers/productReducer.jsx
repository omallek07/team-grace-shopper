import axios from 'axios';

// action types
const GET_ALL_PRODUCTS = 'GET_ALL_PRODUCTS';
// const PUT_NEW_PRODUCT = 'PUT_NEW_PRODUCT';
// const UPDATE_PRODUCT = 'UPDATE_PRODUCT';
// const DELETE_PRODUCT = 'DELETE_PRODUCT';
// const ADD_PRODUCT_TO_CART = 'ADD_PRODUCT_TO_CART';

// action creators
    // customer actions
// export const addProductToCart = (productObj) => {
//     const newAction = {};
//     newAction.productObj = productObj;
//     newAction.type = ADD_PRODUCT_TO_CART;
//     return newAction;
// }
    // customer/admin actions
export const getAllProducts = (productObjList) => {
    const newAction = {};
    newAction.type = GET_ALL_PRODUCTS;
    newAction.productObjList = productObjList;
    return newAction;
}
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

// thunk creators
export function fetchAllProducts() {
    return function (dispatch) {
        axios.get('/api/products')
            .then(res => res.data)
            .then(productObjList => dispatch(getAllProducts(productObjList)))
    }
}

function addProduct

// reducer

export default function productReducer (products = [], action) {

        switch (action.type) {

            default:
                return products
        }
    }


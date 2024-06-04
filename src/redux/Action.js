import {
    ADD_CART,
    CHANGE_QUANTITY_CART,
    FILTER_PRODUCTS,
    LOAD_PRODUCTS,
    REMOVE_CART,
    SEARCH_PRODUCTS
} from "./ActionType";

export const loadProducts = (data) => (
    {
        type: LOAD_PRODUCTS,
        payload: {data}
    }
)
export const searchProducts = (keyword) => (
    {
        type: SEARCH_PRODUCTS,
        payload: {keyword}
    }
)
export const filterProducts = (filter) => (
    {
        type: FILTER_PRODUCTS,
        payload: {filter}
    }
)
export const addCart = (productId) => (
    {
        type: ADD_CART,
        payload: {productId}
    }
)
export const removeCart = (productId) => (
    {
        type: REMOVE_CART,
        payload: {productId}
    }
)
export const changeQuantityCart = (productId, quantity) => (
    {
        type: CHANGE_QUANTITY_CART,
        payload: {quantity}
    }
)
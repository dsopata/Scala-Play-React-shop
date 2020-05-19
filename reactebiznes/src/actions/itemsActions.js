import {GET_PRODUCTS, GET_PRODUCT} from "../actions/types";
import axios from "axios";
import {DELETE_PRODUCT, FILTER_PRODUCTS, GET_CATEGORIES, GET_CATEGORY} from "./types";


axios.defaults.withCredentials = true;
axios.defaults.headers = {
    'Access-Control-Allow-Origin':'http://localhost:3000'
};
export const getProducts = () => dispatch => {
    axios
        .get("http://localhost:9000/products", {withCredentials: true})
        .then(res => dispatch({
            type: GET_PRODUCTS,
            payload: res.data
        }))
        .catch(err =>
            console.log(err)
        );
};


export const getProduct = (id) => dispatch => {
    axios
        .get("http://localhost:9000/products/" + id, {withCredentials: true})
        .then(res => {

        return dispatch({
            type: GET_PRODUCT,
            payload: res.data
        })}
        )
        .catch(err =>
            console.log(err)
        );
};

export const getCategory = (id) => dispatch => {
    axios.get("http://localhost:9000/categories/" + id)
        .then(res => dispatch({
            type: GET_CATEGORY,
            payload: res.data
        }))
        .catch(err =>
            console.log(err)
        );
};

export const getCategories = (id) => dispatch => {
    axios.get("http://localhost:9000/categories")
        .then(res => dispatch({
            type: GET_CATEGORIES,
            payload: res.data
        }))
        .catch(err =>
            console.log(err)
        );
};

export const createProduct = (payload) => dispatch => {
    axios.post("http://localhost:9000/products", payload)
        .then(res => dispatch({
            type: GET_PRODUCT,
            payload: res.data
        }))
        .catch(err =>
            console.log(err)
        );
};

export const updateProduct = (id, payload) => dispatch => {
    axios.post("http://localhost:9000/products/" + id, payload)
        .then(res => dispatch({
            type: GET_PRODUCT,
            payload: res.data
        }))
        .catch(err =>
            console.log(err)
        );
};

export const deleteProduct = (id) => dispatch => {
    axios.delete("http://localhost:9000/products/" + id)
        .then(res => dispatch({
            type: DELETE_PRODUCT,
            payload: id
        }))
        .catch(err =>
            console.log(err)
        );
};

export const filterProductsByCategory = (id) => dispatch => {
    dispatch({
        type: FILTER_PRODUCTS,
        categoryId: id
    })
};


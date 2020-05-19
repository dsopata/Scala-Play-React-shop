import {
    GET_ORDERS,
    GET_ORDER_STATUSES,
    GET_ORDER_ADDRESSES,
    GET_ORDER_PRODUCTS,
    SET_ORDER_STATUS,
    DELETE_ORDER
} from "./types";
import axios from "axios";


axios.defaults.withCredentials = true;
axios.defaults.headers = {
    'Access-Control-Allow-Origin':'http://localhost:3000'
};


export const loadOrders = () => dispatch => {
    axios
        .get("http://localhost:9000/orders")
        .then(res => dispatch({
            type: GET_ORDERS,
            payload: res.data
        }))
        .catch(error => {
            console.log(error);
        });
};

export const loadOrderStatuses = () => dispatch => {
    axios.get("http://localhost:9000/ordersStatuses")
        .then(res => dispatch({
            type: GET_ORDER_STATUSES,
            payload: res.data
        }))
        .catch(error => {
            console.log(error);
        });
};

export const loadOrdersAdresses = () => dispatch => {
    axios.get("http://localhost:9000/ordersAdresses")
        .then(res => dispatch({
            type: GET_ORDER_ADDRESSES,
            payload: res.data
        }))
        .catch(error => {
            console.log(error);
        });
};

export const loadOrderProducts = () => dispatch => {
    axios.get("http://localhost:9000/orders/products")
        .then(res => dispatch({
            type: GET_ORDER_PRODUCTS,
            payload: res.data
        }))
        .catch(error => {
            console.log(error);
        });
};

export const setOrderStatus = (orderId, orderStatusId) => dispatch => {
    axios.post("http://localhost:9000/orders/status/" + orderId, { orderStatusId: parseInt(orderStatusId)})
        .then(res => dispatch({
            type: SET_ORDER_STATUS,
            payload: res.data
        }))
        .catch(error => {
            console.log(error);
        });
};

export const deleteOrder = (orderId) => dispatch => {
    axios.delete("http://localhost:9000/orders/" + orderId, {})
        .then(res => dispatch({
            type: DELETE_ORDER,
            payload: orderId
        }))
        .catch(error => {
            console.log(error);
        });
};


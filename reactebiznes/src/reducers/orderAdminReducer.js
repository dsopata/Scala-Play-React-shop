import {
    DELETE_ORDER,
    GET_ORDER_ADDRESSES,
    GET_ORDER_PRODUCTS,
    GET_ORDER_STATUSES,
    GET_ORDERS,
    SET_ORDER_STATUS
} from "../actions/types";

const initialState = {
    orders: {},
    orderStatuses: {},
    orderAdresses: {},
    orderProducts: {}
};


export default function (state = initialState, action = {}) {
    switch (action.type) {
        case GET_ORDERS:
            return {
                ...state,
                orders: action.payload
            };
        case GET_ORDER_STATUSES:
            return {
                ...state,
                orderStatuses: action.payload
            };
        case GET_ORDER_ADDRESSES:
            return {
                ...state,
                orderAdresses: action.payload
            };
        case GET_ORDER_PRODUCTS:
            return {
                ...state,
                orderProducts: action.payload
            }
        case SET_ORDER_STATUS:
            return {
                ...state
            }
        case DELETE_ORDER:
            return {
                ...state,
                orders: state.orders.filter((order) => order.id !== action.payload)
            }
        default:
            return state;
    }
}

import {ADD_TO_CART, CHECKOUT, GET_CART, REMOVE_FROM_CART} from "../actions/types";

const initialState = {
    cartItems: [],
    total: 0
};


export default function (state = initialState, action = {}) {
    switch (action.type) {
        case GET_CART:
            return {
                ...state
            };
        case ADD_TO_CART: {
            let addedItem = action.item;
            let existedItem = state.cartItems.find(item => addedItem.id === item.id)
            if (existedItem) {
                return {
                    ...state,
                }
            } else {
                let newTotal = state.total + addedItem.price;

                return {
                    ...state,
                    cartItems: [...state.cartItems, addedItem],
                    total: newTotal
                }

            }
        }
        case REMOVE_FROM_CART: {
            let removedItem = action.item;
            let newTotal = state.total - removedItem.price;

            return {
                ...state,
                cartItems: state.cartItems.filter((item) => item.id !== removedItem.id),
                total: newTotal
            }
        }
        case CHECKOUT: {
            return {
                cartItems: [],
                total: 0
            };
        }
        default:
            return state;
    }
}

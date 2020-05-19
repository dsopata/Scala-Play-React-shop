import {
    DELETE_PRODUCT,
    FILTER_PRODUCTS,
    GET_CATEGORIES,
    GET_CATEGORY,
    GET_PRODUCT,
    GET_PRODUCTS
} from "../actions/types";

const initialState = {
    items: []
};

export default function (state = initialState, action = {}) {
    switch (action.type) {
        case GET_PRODUCTS:
            return {
                ...state,
                items: action.payload
            };
        case GET_PRODUCT:
            return {
                ...state,
                product: action.payload
            };
        case GET_CATEGORIES:
            return {
                ...state,
                categories: action.payload
            };
        case GET_CATEGORY:
            return {
                ...state,
                category: action.payload
            };
        case DELETE_PRODUCT:
            debugger
            return {
                ...state,
                products: state.items.filter((item) => item.id != action.payload),
                filteredProducts : this.products
            };
        case FILTER_PRODUCTS:
            return {
                ...state,
                filteredProducts: state.items.filter((item) => {
                    return action.categoryId == 'all'
                       ? item.category != action.categoryId
                       : item.category == action.categoryId
                })
            };
        default:
            return state;
    }
}

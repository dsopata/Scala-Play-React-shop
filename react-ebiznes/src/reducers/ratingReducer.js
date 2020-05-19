import {} from "../actions/types";
import {GET_RATING, ADD_RATING} from "../actions/types";

const initialState = {
    comments: [],
};


export default function (state = initialState, action = {}) {
    switch (action.type) {
        case GET_RATING:
        case ADD_RATING:
            return {
                ...state,
                rating: action.payload
            };
        default:
            return state;
    }
}

import {} from "../actions/types";
import {GET_COMMENTS} from "../actions/types";
import {ADD_COMMENT} from "../actions/types";
import {DELETE_COMMENT} from "../actions/types";

const initialState = {
    comments: [],
};


export default function (state = initialState, action = {}) {
    switch (action.type) {
        case GET_COMMENTS:
            return {
                ...state,
                comments: action.payload
            };
        case ADD_COMMENT:
            return {
                ...state,
                comments: [...state.comments, action.payload]
            };
        case DELETE_COMMENT: {
            return {
                ...state,
                comments: state.comments.filter((comment) => comment.id !== action.payload.id)
            }
        }
        default:
            return state;
    }
}

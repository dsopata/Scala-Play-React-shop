import {GET_RATING, ADD_RATING} from "../actions/types";
import axios from "axios";


axios.defaults.withCredentials = true;
axios.defaults.headers = {
    'Access-Control-Allow-Origin':'http://localhost:3000'
};
export const getRating = (productId) => dispatch => {
    axios
        .get("http://localhost:9000/rating/" + productId, {})
        .then(res => dispatch({
            type: GET_RATING,
            payload: res.data
        }))
        .catch(err =>
            console.log(err)
        );
};


export const addRating = (productId, value) => dispatch => {
    axios
        .put("http://localhost:9000/rating/" + productId, {value: value})
        .then(res => dispatch({
            type: ADD_RATING,
            payload: res.data
        }))
        .catch(err =>
            console.log(err)
        );
};

import {GET_USER, SET_USER, CLEAR_USER} from "../actions/types";

import axios from "axios";
import {GET_USER_BY_ID} from "./types";

axios.defaults.withCredentials = true;
axios.defaults.headers = {
    'Access-Control-Allow-Origin':'http://localhost:3000'
};
export const setUser = () => dispatch => {
    axios
        .get("http://localhost:9000/user", {withCredentials: true})
        .then(res => {
            dispatch({
                type: SET_USER,
                payload: res.data
            })
        })
        .catch(err =>
            console.log(err)
        );
};


export const getUser = ()  => {
    return ({
    type: GET_USER,
})};

export const getUserById = (id) => dispatch => {
    axios
        .get("http://localhost:9000/user/" + id, {})
        .then(res => {
            dispatch({
                type: GET_USER_BY_ID,
                payload: res.data
            })
        })
        .catch(err =>
            console.log(err)
        );
};



export const clearUser = () => {
    clearLocalStorage()
    window.location.href = "http://localhost:9000/signOut";
    return {
        type: CLEAR_USER,
    }

};

function clearLocalStorage() {
    try {
        localStorage.clear("state")
    } catch (e) {
        console.log(e)
    }
}


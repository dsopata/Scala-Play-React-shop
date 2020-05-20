import {GET_USER, SET_USER, CLEAR_USER} from "../actions/types";
import _ from 'lodash';

const initialState = {
    isLogged: false,
    isAdmin: false,
    user: {}
};

function clearLocalStorage() {
    try {
        localStorage.clear("state")
    } catch (e) {
        console.log(e)
    }
}

function saveToLocalStorage(state) {
    try {
        const serializedState = JSON.stringify(state)
        localStorage.setItem("state", serializedState)
    } catch (e) {
        console.log(e)
    }
}

function loadFromLocalStorage() {
    try {
        return JSON.parse(localStorage.getItem("state"));
    } catch (e) {
        console.log(e)
    }
}

export default function (state = initialState, action = {}) {

    switch (action.type) {
        case GET_USER:
            return {
                ...state
            };
        case SET_USER:
                let newState = {
                    ...state,
                    user: action.payload,
                    isAdmin: action.payload.roleId === 1,
                    isLogged: !_.isEmpty(action.payload)
                };
                saveToLocalStorage(newState)
            return newState;
        case CLEAR_USER:
            clearLocalStorage()
            window.reload()
            return initialState;
        default:
            return loadFromLocalStorage() || state;
    }
}

import {GET_COMMENTS, ADD_COMMENT, DELETE_COMMENT} from "../actions/types";
import axios from "axios";


axios.defaults.withCredentials = true;
axios.defaults.headers = {
    'Access-Control-Allow-Origin':'http://localhost:3000'
};
export const getComments = (productId) => dispatch => {
    axios
        .get("http://localhost:9000/comments/" + productId, { withCredentials: true })
        .then(res => dispatch({
            type: GET_COMMENTS,
            payload: res.data
        }))
        .catch(err =>
            console.log(err)
        );
};


export const addComment = (id, user, text) => dispatch => {
    let payload = {
        text: text,
        userName: user.fullName,
        userAvatar: user.avatarURL,
        createdDate: Date.now()
    };
    axios
        .post("http://localhost:9000/comments/" + id, payload)
        .then(res => dispatch({
            type: ADD_COMMENT,
            payload: {
                ...payload,
                id: res.data.id
            }
        }))
        .catch(err =>
            console.log(err)
        );
};

export const deleteComment = (id) => dispatch => {
    axios
        .delete("http://localhost:9000/comments/" + id)
        .then(res => dispatch({
            type: DELETE_COMMENT,
            payload: {
                id: id
            }
        }))
        .catch(err =>
            console.log(err)
        );
};



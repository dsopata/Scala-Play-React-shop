import {ADD_TO_CART, CHECKOUT, REMOVE_FROM_CART} from "../actions/types";
import axios from "axios";

axios.defaults.withCredentials = true;
axios.defaults.headers = {
    'Access-Control-Allow-Origin':'http://localhost:3000'
};

export const addToCart=(item)=>{
    return{
        type: ADD_TO_CART,
        item
    }
};

export const removeFromCart=(item)=>{
    return{
        type: REMOVE_FROM_CART,
        item
    }
};


export const checkout=(userId, total, cartItems, address)=>{
    axios.defaults.withCredentials = true;
    axios.defaults.headers = {
        'Access-Control-Allow-Origin':'http://localhost:3000'
    };

    let orders = cartItems.map(item => ({
        name: item.name,
        description: item.description,
        price: item.price,
        subtotal: item.price,
    }));
    axios
        .post("http://localhost:9000/sales", {order_date: Date.now(),
            total: total,
            user_id: userId,
                addressStreet: address.street,
                addressCity: address.city,
                addressCountry: address.country,
                addressPostalCode: address.postalCode,
            order: orders

        })
            .catch(err => {
                console.log(err)
            });
    return ({
        type: CHECKOUT
    })
};


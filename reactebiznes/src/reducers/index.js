import {combineReducers} from "redux";
import cartReducer from "./cartReducer";
import productsReducer from "./productsReducer";
import userReducer from "./userReducer";
import orderAdminReducer from "./orderAdminReducer";
import commentsReducer from "./commentsReducer";
import ratingReducer from "./ratingReducer";


export default combineReducers({
    cart: cartReducer,
    products: productsReducer,
    user: userReducer,
    orderAdminReducer: orderAdminReducer,
    comments: commentsReducer,
    rating: ratingReducer
});

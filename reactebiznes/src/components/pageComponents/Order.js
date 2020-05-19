import React, {Component} from 'react'
import {connect} from 'react-redux'
import {checkout} from '../../actions/cartActions.js'
import {getUser, setUser} from "../../actions/userActions";

class Order extends Component {

    emptyAddress = () =>
        !this.props.address ||
        !this.props.address.street ||
        !this.props.address.city ||
        !this.props.address.postalCode ||
        !this.props.address.country


    checkCheckout = () => {
        if(!this.props.user){
            alert("Please log in!");
        } else if(this.props.cartItems && this.props.cartItems.length === 0) {
            alert("Your cart is empty");
        } else if(this.emptyAddress()) {
                alert("Please fullfill your address");
        } else {
            this.props.checkout(this.props.user.user.userID, this.props.total, this.props.cartItems, this.props.address)
            alert("Your order will be proceed");
        }
    };


    render(){
        let login = this.props.user.isLogged && !this.emptyAddress() ? "btn btn-primary": "btn disabled"
        return(
            <div className="right">
                <span className="collection-item"><b>Total: {this.props.total}$ </b></span>
                <span className="checkout">
                    <button className={login} onClick={this.checkCheckout}>Checkout</button>
                </span>
            </div>
        )
    }
}

const mapStateToProps = (state)=>{
    return{
        cartItems: state.cart.cartItems,
        total: state.cart.total,
        user: state.user
    }
};

const mapDispatchToProps = (dispatch)=>{

    return{
        checkout: (userId, total, cartItems, address) => {
            dispatch(checkout(userId, total, cartItems, address))
        },
        getUser: () => {
            dispatch(getUser())
        },
        setUser: () => {
            dispatch(setUser())
        }
    }
};

export default connect(mapStateToProps,mapDispatchToProps)(Order)

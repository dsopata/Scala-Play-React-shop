import React, {Component} from 'react';
import {Link} from 'react-router-dom'
import {connect} from "react-redux";
import {getUser, setUser, clearUser} from "../../actions/userActions";

class Menu extends Component {

    render() {
        let branding = <Link to="/" className="brand-logo navbar-dark">Ebiznes</Link>;

        let login = this.props.user.isLogged
            ? <li className="nav-item"><a className="nav-link" onClick={() => clearUser() } href={"#"}>Logout</a></li>
            : <li className="nav-item"><a className="nav-link" href="http://localhost:9000/authenticate/google">Log in</a></li>


        let shoppingCart = this.props.user.isLogged && this.props.cart.cartItems.length > 0
            ? <li className="nav-item"><Link className="nav-link" to="/cart">Cart</Link></li>
            : ""

        let adminList = !this.props.user.isAdmin ? "" :
            <div className="navbar-nav mr-auto">
                    <li className="nav-item"><Link to="/orders" className="nav-link">orders</Link></li>
                    <li className="nav-item"><Link to="/products/add"  className="nav-link">add product</Link></li>
                    <li className="nav-item"><Link to="/categories/add"  className="nav-link">add category</Link></li>
            </div>

        return (
            <nav className="navbar  navbar-dark bg-primary  navbar-expand-lg">
                <a className="navbar-brand" href="#">{branding}</a>
                <div className=" form-inline" >
                    {adminList}
                </div>
                <div className=" form-inline" >
                    <div className="navbar-nav mr-auto">
                        {shoppingCart}
                        {login}
                    </div>
                </div>


            </nav>

        );
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.user,
        cart: state.cart
    }
};

const mapDispatchToProps = (dispatch) => ({
    getUser: () => {
        dispatch(getUser())
    },
    setUser: () => {
        dispatch(setUser())
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(Menu)


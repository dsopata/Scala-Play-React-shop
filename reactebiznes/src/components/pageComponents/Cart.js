 import React, {Component} from 'react';
import {connect} from 'react-redux'
import Order from './/Order'
 import {removeFromCart} from "../../actions/cartActions";

class Cart extends Component {

    constructor(props) {
        super(props);
        this.state= ({
            ...this.state,
            address: {

            }
        });
    }


    handleAddressChange = e => {
        e.preventDefault();
        const {name, value} = e.target;
        this.setState({
            ...this.state,
            address: {
                ...this.state.address,
                [name]: value.toString()
            }
        });
    };


    render() {


        let addedItems = this.props.cartItems.length ?
            (
                this.props.cartItems.map(item => {
                    return (
                        <div className={"card"} key={item.id}>
                            <div className="item-img">
                                <img src={item.image} alt={item.name}/>
                            </div>
                            <div className={"card-body"}>
                                <div className="item-desc">
                                    <h3>{item.name}</h3>
                                    <h6>{item.description}</h6>
                                    <h7>
                                        <span className="left">Price: {item.price}$</span>
                                    </h7>
                                </div>

                                <div className="right add-remove mdc-layout-grid" >
                                    <div className="mdc-layout-grid__cell">
                                        <button className="btn btn-warning" onClick={() => {this.props.removeFromCart(item)}}>remove</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                })
            ) : ( <p>Your cart is empty</p> );
        return (
            <div className="container">
                <div className="cart">
                    <div>
                        <h5 className="left">Cart:</h5>
                    </div>
                    <div className="collection">
                        {addedItems}
                    </div>
                </div>
                <div className={"row"}>
                    <div className="card col-sm-12">
                        <div className="card-body ">
                            <h5>Address:</h5>

                            <form>
                                <div className="form-group">
                                    <label htmlFor="exampleInputEmail1">Street</label>
                                    <input label="Street" name="street" className="form-control"  value={this.props.street} placeholder="Street" onChange={this.handleAddressChange}  />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="exampleInputPassword1">City</label>
                                    <input label="City" name="city"  className="form-control"  value={this.props.city} placeholder="City" onChange={this.handleAddressChange}  />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="exampleInputPassword1">Postal Code</label>
                                    <input label="postalCode" name="postalCode"  className="form-control"   value={this.props.state} placeholder="postal code" onChange={this.handleAddressChange}  />
                                </div>
                                    <div className="form-group">
                                    <label htmlFor="exampleInputPassword1">Country</label>
                                    <input label="Country" name="country"  className="form-control"  value={this.props.country} placeholder="Country" onChange={this.handleAddressChange}  />
                                    </div>
                            </form>

                        </div>
                    </div>
                    <div className="card col-sm-12">
                        <div className="card-body ">
                            <Order address={this.state.address}/>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        cartItems: state.cart.cartItems,
        address: state.address
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        removeFromCart(item) {
            dispatch(removeFromCart(item))
        }
    }
};
export default connect(mapStateToProps, mapDispatchToProps)(Cart)

import React, {Component} from "react";
import {deleteOrder, setOrderStatus} from "../../actions/orderAdminActions";
import Select from 'react-select'

import {connect} from "react-redux";

class OrderItem extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    handleChange(event, orderId) {
        this.props.setOrderStatus(orderId, event.value)
    }

    mapStatuses(statuses) {
        return statuses.map(
            (status) => {
                return {value: status.id, label: status.name}
            }
        )
    }

    mapStautsName(salesAddressId, mappedStatuses) {
        return mappedStatuses.find(status => status.value === salesAddressId).label
    }

    deleteOrder(orderId) {
        this.props.deleteOrder(orderId)
    }

    dateFormat(date) {
        return Intl.DateTimeFormat("en-GB", {
            year: "numeric",
            month: "long",
            day: "2-digit"
        }).format(date)
    }

    render() {

        let order = this.props.order;
        let address = this.props.address;
        let products = this.props.products;
        let statuses = this.props.statuses;

        let addressElement =
            address && address.city ?
                <ul className="list-group col-xs-6">
                    <li className="list-group-item">City: {address.city}</li>
                    <li className="list-group-item">Country: {address.country}</li>
                    <li className="list-group-item">Postal Code: {address.postalCode}</li>
                    <li className="list-group-item">Street: {address.street}</li>
                </ul>
                : ""

        let productsElement =
            products && products.length > 0 ?
                products.map(product => (
                    <tr>
                        <td>{product.name}</td>
                        <td>{product.price}</td>
                    </tr>
                ))
                : ""

        let mappedStatuses = statuses && statuses.length > 0 ? this.mapStatuses(statuses) : {};
        let statusesElement =
            statuses && statuses.length > 0 ?
                <Select placeholder={this.mapStautsName(order.orderStatusId, mappedStatuses)} options={mappedStatuses}
                        onChange={(e) => this.handleChange(e, order.id)}/>
                : ""
        return (
            <div className="">
                <div className="card">
                    <div className="card-body">
                        <h3>Order id:{order.id}</h3>
                        <p>Status: {statusesElement}</p>
                        <p>Date: {this.dateFormat((order.order_date))}</p>
                        <h4>Address:</h4> <p>{addressElement}</p>
                        <p>Products:</p>
                        <table className="table">
                            <thead>
                            <tr>
                                <th scope="col">Name</th>
                                <th scope="col">Price</th>
                            </tr>
                            </thead>
                            <tbody>
                            {productsElement}
                            </tbody>
                        </table>
                        <p>Total: <b>{order.total} $</b></p>
                        <button className={"btn btn-danger"} onClick={() => this.deleteOrder(order.id)}>Delete Order
                        </button>
                    </div>
                </div>
            </div>
        );
    }

}

const mapStateToProps = (state) => {
    return {
        orders: state.orderAdminReducer.orders,
        orderStatuses: state.orderAdminReducer.orderStatuses,
        orderAdresses: state.orderAdminReducer.orderAdresses,
        orderProducts: state.orderAdminReducer.orderProducts
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        setOrderStatus: (orderId, statusId) => {
            dispatch(setOrderStatus(orderId, statusId))
        },
        deleteOrder: (orderId) => {
            dispatch(deleteOrder(orderId))
        },
    }
};
export default connect(mapStateToProps, mapDispatchToProps)(OrderItem)
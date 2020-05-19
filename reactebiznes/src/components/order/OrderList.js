import React, {Component} from "react";
import OrderItem from "./OrderItem";
import {connect} from "react-redux";
import {loadOrderProducts, loadOrders, loadOrdersAdresses, loadOrderStatuses} from "../../actions/orderAdminActions";

class OrderList extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
        this.props.loadOrderStatuses();
        this.props.loadOrdersAdresses();
        this.props.loadOrders();
        this.props.loadOrderProducts();
    }

    fetchById(arr, id, identifierIndex) {
        return arr.filter((element) => element[identifierIndex] === id)
    }

    render() {

        let orders =
            this.props.orders && this.props.orders.length > 0 &&
            this.props.orderStatuses &&  this.props.orderStatuses.length > 0 &&
            this.props.orderAdresses &&  this.props.orderAdresses.length > 0 &&
            this.props.orderProducts && this.props.orderProducts.length > 0

             ? (
                this.props.orders.map(order => (
                    <OrderItem key={order.id}
                               order={order}
                               address={this.fetchById(this.props.orderAdresses, order.salesAddressId, "id")[0]}
                               statuses={this.props.orderStatuses}
                               products={this.fetchById(this.props.orderProducts, order.id, "orderId")}
                   />
                ))
            ) : (
                <p >There is no orders</p>
            );
        return (
            <div className="container">
                <ul className="">
                    <div className="collection">
                        <h3>Orders</h3>
                    </div>
                    <ul>
                        {orders}
                    </ul>
                </ul>
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
        loadOrders: () => {
            dispatch(loadOrders())
        },
        loadOrderStatuses: () => {
            dispatch(loadOrderStatuses())
        },
        loadOrdersAdresses: () => {
            dispatch(loadOrdersAdresses())
        },
        loadOrderProducts: () => {
            dispatch(loadOrderProducts())
        },
    }
};
export default connect(mapStateToProps, mapDispatchToProps)(OrderList)

import React, {Component} from "react";

import CommentsList from "../comments/CommentsList";
import Rating from "../rating/Rating";

import {addToCart} from "../../actions/cartActions";
import {connect} from "react-redux";
import {deleteProduct, getCategory, getProduct} from "../../actions/itemsActions";
import {Link} from "react-router-dom";

class ProductPage extends Component {
    constructor(props) {
        super(props);
        this.state= ({

        })
    }

   componentDidMount() {
    let id = this.props.match.params.id
     this.props.getProduct(id)
  }

    buyFunc(product) {
        this.props.addToCart(product)
    }

    deleteProduct(id) {
        this.props.deleteProduct(id)
        window.location.href = "/";
    }

    render() {
        if(this.props.product && this.props.product.category && !this.props.category) {
            this.props.getCategory(this.props.product.category)
        }
        let product = this.props.product;
        let category = this.props.category;
        let editSection = product && this.props.user.isAdmin ?
            <div className={"container"}>
                <button className={"btn btn-warning"}>
                    <Link to={'/products/edit/' + product.id}>Edit Product</Link>
                </button> &nbsp;
                <button className={"btn btn-danger"} onClick={() => this.deleteProduct(product.id)}>Delete product</button>
            </div>
            : ""
        return (
            product && category ?
            <div className={"container"}>
                <div className="title" >
                    <h1>{product.name}</h1> {editSection}
                    <img src={product.image} />
                    <h5> Category: {category.name} </h5>
                    <div className="secondary-content">
                        <span>Price: {product.price} $ </span>

                        <button className="btn btn-primary" onClick={() => this.buyFunc(product)}>Buy</button>
                    </div>
                </div>
                <br />

                <Rating
                    productId={product.id}
                />
                <br />

                <h5>Description: </h5>
                <p>
                    {product.description}
                </p>

                <CommentsList
                    product={product}
                />
            </div>
                : ""
        )
    }

}

const mapStateToProps = (state) => {
    return {
        items: state.products.items,
        user: state.user,
        product: state.products.product,
        category: state.products.category
    }
};

const mapDispatchToProps = (dispatch) => ({
    addToCart: (product) => {
        dispatch(addToCart(product))
    },
    getProduct: (id) => {
        dispatch(getProduct(id))
    },
    getCategory: (id) => {
        dispatch(getCategory(id))
    },
    deleteProduct: (id) => {
        dispatch(deleteProduct(id))
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(ProductPage)


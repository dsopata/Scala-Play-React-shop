import React, {Component} from 'react';
import {connect} from 'react-redux'
import {addToCart} from '../../actions/cartActions'
import {filterProductsByCategory, getCategories, getProducts} from "../../actions/itemsActions";
import {Link} from "react-router-dom";
import Select from "react-select";

class Home extends Component {

    componentDidMount() {
        this.props.getProducts();
        this.props.getCategories();
    }

    handleClick = (id) => {
        this.props.addToCart(id);
    };


    mapCategories(categories) {
        let mapped = categories.map(
            (category) => {
                return  {value: category.id, label: category.name}
            }
        )
        mapped.unshift({value: "all", label: "All Categories"})

        return mapped
    }

    filterProducts(e) {
        this.props.filterProductsByCategory(e.value)
    }

    render() {
        let categoryFilter = this.props.categories ?
            <Select
                    options={this.mapCategories(this.props.categories)}
                    onChange={(e) => this.filterProducts(e)}
            />

            : "";
        let items = this.props.filteredProducts || this.props.items || []
        let disabledButton = this.props.user && this.props.user.isLogged ? "" : "disabled"
        let itemList = items.length > 0 ? items.map(item => (
            <div className="card" key={item.id}>
                <div className="row no-gutters">
                    <div className="col-auto">
                        <img src={item.image} alt={item.name} className={"img-fluid"}/>
                    </div>
                    <div className="col">
                        <div className="card-block px-2">
                            <div className={"card-body"}>
                            <h5 className="card-title"><Link to={'product/' + item.id}
                                                             className="brand-logo">{item.name}</Link></h5>
                            <p className="card-text">{item.description}</p>
                            <p><b>Price: {item.price} $ </b></p>
                            <p>
                                <button disabled={disabledButton} className="btn btn-primary"
                                        onClick={() => {
                                    this.handleClick(item)
                                }}>Add to Cart
                                </button>
                            </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


        )) : (
            <div className="card" >
                <div className="card-body">
                    {"No products"}
                </div>

            </div>
        );

        return (
            <div className="container products-container">
                <h1>{"Products:"}</h1>
                    Filter by {categoryFilter}
                    <br/>
                <div className="box s9">
                    {itemList}
                </div>
            </div>
        )
    }

}

const mapStateToProps = (state) => {
    return {
        items: state.products.items,
        categories: state.products.categories,
        filteredProducts: state.products.filteredProducts,
        user: state.user
    }
};
const mapDispatchToProps = (dispatch) => ({
    addToCart: (id) => {
        dispatch(addToCart(id))
    },
    getCategories: () => {
        dispatch(getCategories())
    },
    getProducts: () => {
        dispatch(getProducts())
    },
    filterProductsByCategory: (categoryId) => {
        dispatch(filterProductsByCategory(categoryId))
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(Home)

import React, {Component} from 'react';
import {createProduct, getCategories, getCategory, getProduct, updateProduct} from "../../actions/itemsActions";
import {connect} from "react-redux";
import Select from "react-select";


class ProductForm extends Component {

    constructor(props) {
        super(props);
        this.state = ({})
    }

    componentDidMount() {
        this.props.getCategories()
        let id = this.props.match.params.id
        if(id) {
            this.props.getProduct(id)
        }
    }

    mapCategories(categories) {
        return categories.map(
            (category) => {
                return  {value: category.id, label: category.name}
            }
        )
    }

    submitForm(e) {
        e.preventDefault();
        let id = this.props.match.params.id

        const formData = new FormData(e.target)
        let payload = {
            name: formData.get("name"),
            description: formData.get("description"),
            price: formData.get("price"),
            category: formData.get("category"),
            image: formData.get("image")
        }
        if(!isNaN(parseInt(id))) {
            this.props.updateProduct(id, payload)
        } else {
            this.props.createProduct(payload)
        }
        window.location.href = "/";

    }



    render() {
        let idUpdate = !isNaN(this.props.match.params.id)
        let product = idUpdate ? this.props.product : "";
        let categories = this.props.categories;
        let category = product && !this.props.category ? this.props.getCategory(product.category) : this.props.category;
        let mappedCategories = this.mapCategories(categories ? categories : [])
        let defaultSelectValue =  idUpdate && category ? this.mapCategories([category])[0] : {};

        let categorySelect = defaultSelectValue && !isNaN(defaultSelectValue.value)
            ? <div>Category:  <Select name={"category"} defaultValue={defaultSelectValue} options={mappedCategories}  /></div>
            : <div>Category:  <Select name={"category"} options={mappedCategories}  /></div>

        return (
        <div className={"container"}>
            <form onSubmit={(e) => this.submitForm(e, product)}>
                <h2> {product ? "Update" : "Create"} Product</h2>
                <div className="form-group">Name: <input name={"name"} className="form-control" placeholder={"Name"} defaultValue={product ? product.name : ""}/></div>
                <div className="form-group">Description <input name={"description"} className="form-control" placeholder={"Description"} defaultValue={product ? product.description : ""}/></div>
                <div className="form-group">Price: <input className="form-control"  name={"price"} placeholder={"price"} type={"number"} defaultValue={product ? product.price : ""}/></div>
                <div className="form-group">{categorySelect}</div>
                <div className="form-group">Image URL: <input name={"image"} className="form-control" placeholder={"Image URL"} defaultValue={product ? product.image : ""}/></div>
                <button className={"btn btn-primary"}>Submit</button>
            </form>

        </div>)
    }
}

const mapStateToProps = (state) => {
    return {
        product: state.products.product,
        category: state.products.category,
        categories: state.products.categories
    }
};


const mapDispatchToProps = (dispatch) => ({
    getProduct: (id) => {
        dispatch(getProduct(id))
    },
    getCategory: (id) => {
        dispatch(getCategory(id))
    },
    getCategories: () => {
        dispatch(getCategories())
    },
    updateProduct: (id, payload) => {
        dispatch(updateProduct(id, payload))
    },
    createProduct: (payload) => {
        dispatch(createProduct(payload))
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(ProductForm)



import React, {Component} from "react";
import axios from "axios";

class ProductItem extends Component {
    constructor(props) {
        super(props);
        this.state = {category: {}};
    }

    componentDidMount() {
        this.loadReports();
    }

    loadReports() {
        axios.get("/categories/" + this.props.product.category)
            .then(response => {
                const category = response.data;
                this.setState({
                    category,
                });
            })
            .catch(error => {
                this.setState({
                        error
                    }
                );
                console.log(error);
            });
    }

    render() {
        let product = this.props.product;
        let category = this.state.category;

        return (
            <li className="collection-item">
                <span className="title" onClick={() => this.props.expandFunc(null)}>
                    <h4>{product.name}</h4>
                    <div className="secondary-content">
                        <span>{product.price} $</span>

                        <button className="waves-effect waves-light btn-small" onClick={() => this.props.buyFunc(product.id)}>Buy
                    </button>
                        </div>
                </span>
                <p>Price: {product.price}</p>
                <p>
                    {product.description}
                    <i className="grey-text">{category.name}</i>
                </p>

            </li>
        )
    }


}


export default ProductItem;
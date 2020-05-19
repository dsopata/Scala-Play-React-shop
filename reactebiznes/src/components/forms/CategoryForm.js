import React, {Component} from 'react';
import axios from "axios";

class CategoryForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data: {
                name: ""
            }
        };
    }

    handleChange = e => {
        e.preventDefault();
        const {name, value} = e.target;

        this.setState({
            ...this.state.data,
            data: {
                [name]: value
            }
        });
    };

    conf = {
        withCredentials: true,
        headers: {
            'Access-Control-Allow-Origin':'http://localhost:3000'
        }
    };

    handleSubmit = e => {
        e.preventDefault();
       axios
            .post('/categories', this.state.data, this.conf )
            .catch(errors => {
                console.log(errors)
            });
        window.location.href = "/";

    };

    render() {
        return (
            <div className="container ">
                <h3>Add category</h3>

                <form className="col s12" onSubmit={this.handleSubmit}>
                    <div className="input-field">
                        <input id="name" name="name" type="text" className="form-control"
                              placeholder={"Category name"} onChange={this.handleChange}/>
                        <br />
                    </div>
                    <button className="btn btn-primary" type="submit" >Save</button>

                </form>
            </div>
        );
    }
}

export default CategoryForm;


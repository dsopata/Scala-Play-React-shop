import React, {Component} from 'react';
import {addComment} from "../../actions/commentsActions";
import {connect} from "react-redux";
import {getUser} from "../../actions/userActions";

class CommentsForm extends Component {

    constructor(props) {
        super(props);

        this.state = {
            data: {
                name: ""
            },
            user: ""
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

    handleSubmit = that => e => {
        e.preventDefault();
        that.props.addComment(that.props.productId, that.props.user, that.state.commentText)
    };

    render() {
        return (
            this.props.user.activated ?
            <div className="container row">
                <form className="col s12" onSubmit={this.handleSubmit(this)}>
                    <div className="input-field col s12">


                        <div className="form-group">
                            <label htmlFor="commentText"> Add comment:</label>
                            <input data-length="255" onChange={this.handleChange} id="commentText" name="commentText" className="form-control" />
                            <br />
                            <button className="btn btn-primary">Add</button>
                        </div>
                    </div>
                </form>
            </div>
                : ""
        );
    }
}

const mapStateToProps = (state)=>{
    return{
        user: state.user.user
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        addComment: (id, user, text) => {
            dispatch(addComment(id, user, text))
        },
        getUser: () => {
            dispatch(getUser())
        },
    }
};

export default connect( mapStateToProps, mapDispatchToProps)(CommentsForm)


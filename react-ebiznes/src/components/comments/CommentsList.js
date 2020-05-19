import React, {Component} from 'react';
import CommentsForm from "../forms/CommentsForm";
import {getComments} from "../../actions/commentsActions";
import {connect} from "react-redux";
import CommentItem from "./CommentItem";
import {getUser} from "../../actions/userActions";

class CommentsList extends Component {

    constructor(props) {
        super(props);

        this.state = {
            data: {
                name: ""
            },
            product: "",
            user: ""
        };
    }

    componentDidMount() {
        if(this.props.product) {
            this.props.getComments(this.props.product.id)
        }
    }

    conf = {
        withCredentials: true,
        headers: {
            'Access-Control-Allow-Origin':'http://localhost:3000'
        }
    };

    render() {
        let comments =
            this.props.comments && this.props.comments.length > 0 ? (
                this.props.comments.map(comment => (
                    <CommentItem key={comment.id} comment={comment} isAdmin={this.props.user && this.props.user.roleId === 1} Func={this.Func}/>
                ))
            ) : (
                <p className="collection-item">There is no comments!</p>
            );

        return (
            this.props.product ?
            <div className="comments-list container row">
                <h5>Comments</h5>
                <CommentsForm productId={this.props.product.id} />
                {comments}
            </div>
                : ""
        );
    }
}

const mapStateToProps = (state) => {
    return {
        comments: state.comments.comments,
        user: state.user.user
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        getComments: (id) => {
            dispatch(getComments(id))
        },
        getUser: () => {
            dispatch(getUser())
        }
    }
};
export default connect(mapStateToProps, mapDispatchToProps)(CommentsList)


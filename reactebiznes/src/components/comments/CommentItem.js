import React, {Component} from "react";
import {deleteComment } from "../../actions/commentsActions";
import {connect} from "react-redux";

class CommentItem extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

   deleteComment() {
       this.props.deleteComment(this.props.comment.id)
   }


    render() {
        let comment = this.props.comment;
        let date =  Intl.DateTimeFormat("en-GB", {
            year: "numeric",
            month: "long",
            day: "2-digit"
        }).format(comment.createdDate)
        let deleteButton = this.props.isAdmin ? <button className={"btn btn-danger"} onClick={() => {this.deleteComment()}}>X</button> : "";
        return (
            <div className="card col-sm-12" >
                <div className="card-body">
                    <h5 className="card-title"><img src={comment.userAvatar}  /> {comment.userName}</h5>
                    <h6 className="card-subtitle mb-2 text-muted"><span>Date: {date}</span></h6>
                    <p className="card-text">{comment.text}</p>
                    <a href="#" className="card-link">{deleteButton}</a>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return ""
};

const mapDispatchToProps = (dispatch) => {
    return {
        deleteComment: (id) => {
            dispatch(deleteComment(id))
        }
    }
};
export default connect(mapStateToProps, mapDispatchToProps)(CommentItem)

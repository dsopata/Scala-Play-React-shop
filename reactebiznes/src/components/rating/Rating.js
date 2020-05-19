import React, {Component} from "react";

import {connect} from "react-redux";
import {addRating, getRating} from "../../actions/ratingActions";
import  RatingUI  from 'material-ui-rating'

class Rating extends Component {
    constructor(props) {
        super(props);
        this.state = {rating: 0, user: ""};
    }

    componentDidMount() {
        if(this.props.productId) {
            this.props.getRating(this.props.productId)
        }
    }

    addRating(value) {
        this.props.addRating(this.props.productId, value)
    }

    render() {
        return (
            !isNaN(this.props.rating) ?
                <div>
                    Rating:
                    <RatingUI
                        value={this.props.rating}
                        max={"5"}
                        onChange={(value) => this.addRating(value)}
                        readOnly={!this.props.user.isLogged}
                    />

                </div>
            : ""

        )
    }


}

const mapStateToProps = (state) => {
    return {
        rating: state.rating.rating,
        user: state.user
    }
};

const mapDispatchToProps = (dispatch) => ({
    getRating: (id) => {
        dispatch(getRating(id))
    },
    addRating: (id, value) => {
        dispatch(addRating(id, value))
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(Rating)


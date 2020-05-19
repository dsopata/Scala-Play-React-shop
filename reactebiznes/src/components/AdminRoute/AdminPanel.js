import React from "react";
import {Redirect, Route} from "react-router-dom";
import {connect} from "react-redux";

const AdminPanel = ({component: Component, user, ...rest}) => {
    return (
    <Route
        {...rest}
        render={props =>
            (user.isLogged === true && user.isAdmin === true) ? (
                <Component {...props} />
            ) : (
                <Redirect to="/"/>
            )
        }
    />
    )
};


const mapStateToProps = state => ({
    user: state.user
});

export default connect(mapStateToProps)(AdminPanel);

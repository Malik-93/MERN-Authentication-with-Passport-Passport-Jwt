import React from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
const ProfilePrivateRoute = ({ component: Component, auth, adminAuth, ...rest }) => (
    <Route
        {...rest}
        render={props =>
            auth.isAuthenticated === true || adminAuth.isAuthenticated === true ? (
                <Component {...props} />
            ) : (
                    <Redirect to="/login" />
                )
        }
    />
);
ProfilePrivateRoute.propTypes = {
    auth: PropTypes.object.isRequired,
    adminAuth: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
    auth: state.auth,
    adminAuth: state.adminAuthReducer
});
export default connect(mapStateToProps)(ProfilePrivateRoute);
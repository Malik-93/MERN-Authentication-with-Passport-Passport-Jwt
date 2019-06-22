import React from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
const AdminAddProduct = ({ component: Component, adminAuth, ...rest }) => (
    <Route
        {...rest}
        render={props =>
            adminAuth.isAuthenticated === true ? (
                <Component {...props} />
            ) : (
                    <Redirect to="/login" />
                )
        }
    />
);
AdminAddProduct.propTypes = {
    adminAuth: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
    adminAuth: state.adminAuthReducer
});
export default connect(mapStateToProps)(AdminAddProduct);
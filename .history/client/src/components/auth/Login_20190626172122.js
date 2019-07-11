import React, { Component } from "react";
import { Link } from "react-router-dom";
import { loginUser, facebookLogin } from "../../Redux/Actions/authActions";
import { connect } from 'react-redux';
import PropTypes from "prop-types";
import classnames from "classnames";
import Switch from "react-switch";
import { loginAdmin } from "../../Redux/Actions/Admin/authActions";
class Login extends Component {
    constructor() {
        super();
        this.state = {
            email: "",
            password: "",
            errors: {},
            checked: false
        };
        this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount() {
        if (this.props.auth.isAuthenticated) {
            this.props.history.push('/dashboard')
        } else if (this.props.adminAuth.isAuthenticated) {
            this.props.history.push('/admin/addProduct')
        }
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.auth.isAuthenticated) {
            this.props.history.push("/dashboard"); // push user to dashboard when they login
        }  else if(nextProps.adminAuth.isAuthenticated) {
            this.props.history.push("/admin/addProduct"); // push user to dashboard when they login
        }
        if (nextProps.errors) {
            this.setState({
                errors: nextProps.errors
            });
        }
    }
    handleChange() {
        this.setState({ checked: !this.state.checked });
    }

    onChange = e => {
        this.setState({ [e.target.id]: e.target.value });
    };

    userLogin = e => {
        e.preventDefault();
        const userData = {
            email: this.state.email,
            password: this.state.password
        };
        this.props.loginUser(userData)
    };

    adminLogin = e => {
        e.preventDefault();
        const adminData = {
            email: this.state.email,
            password: this.state.password
        };
        this.props.loginAdmin(adminData)
    };
facebookLoginHandle = () => {
    const token = "EAAE4ZAtC5MQ8BAAAdWqlFMFZBYb0S8sMT5i043KXWHYR7ZAGzTlUkI2TZC3jqQ091PJwHoTtZCv06NvH7ntXPrggIeG8lIqeafM7ZAyihZAOWjWXmktQRrBt8u3v7DvSblL23yTxjgPZCMexWJxBSdlJYZAuvF1ZBvsuDW2A4ZBZA9TXygZDZD"
    this.props.facebookLogin(token)
}
    render() {
        const { errors } = this.state;
        return (
            <div className="container">
                <div style={{ marginTop: "4rem" }} className="row">
                    <div className="col s8 offset-s2">
                        <Link to="/" className="btn-flat waves-effect">
                            <i className="material-icons left">keyboard_backspace</i> Back to
                            home
            </Link>
                        <div className="col s12" style={{ paddingLeft: "11.250px" }}>
                            <h4>
                                <b>Login</b> below
              </h4>
                            <p className="grey-text text-darken-1">
                                Don't have an account? <Link to="/register">Register</Link>
                            </p>
                        </div>
                        <form noValidate onSubmit={ this.state.checked ? this.adminLogin : this.userLogin }>
                            <div className="input-field col s12">
                                <input
                                    onChange={this.onChange}
                                    value={this.state.email}
                                    error={errors.email}
                                    id="email"
                                    type="email"
                                    className={classnames("", {
                                        invalid: errors.email || errors.emailNotFound
                                    })}
                                />
                                <label htmlFor="email">Email</label>
                                <span className="red-text">
                                    {errors.email}
                                    {errors.emailNotFound}
                                </span>
                            </div>
                            <div className="input-field col s12">
                                <input
                                    onChange={this.onChange}
                                    value={this.state.password}
                                    error={errors.password}
                                    id="password"
                                    type="password"
                                    className={classnames("", {
                                        invalid: errors.password || errors.passwordIncorrect
                                    })}
                                />
                                <label htmlFor="password">Password</label>
                                <span className="red-text">
                                    {errors.password}
                                    {errors.passwordIncorrect}
                                </span>
                            </div>
                            <div className=" col s12" style={{paddingLeft: '11.250px'}}>
                                <Switch onChange={this.handleChange} checked={this.state.checked} /><br />
                                <span style={{ paddingBottom: '25px' }}><b>{this.state.checked ? <span>Login as an admin</span> : <span>Login as a user</span>}</b></span>
                            </div>
                            <div className="col s12" style={{ paddingLeft: "11.250px" }}>
                                <button
                                    style={{
                                        width: "150px",
                                        borderRadius: "3px",
                                        letterSpacing: "1.5px",
                                        marginTop: "1rem"
                                    }}
                                    type="submit"
                                    className="btn btn-large waves-effect waves-light hoverable blue accent-3"
                                >
                                    Login
                </button>
                            </div>
                        </form>
                        <div className="col s12" style={{ paddingLeft: "11.250px" }}>
                            <button
                                style={{
                                    width: "150px",
                                    borderRadius: "3px",
                                    letterSpacing: "1.5px",
                                    marginTop: "1rem"
                                }}
                                type="submit"
                                className="btn btn-large waves-effect waves-light hoverable blue accent-3"
                                onClick={this.facebookLoginHandle}
                            >
                                facebook
                </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
Login.propTypes = {
    loginUser: PropTypes.func.isRequired,
    loginAdmin: PropTypes.func.isRequired,
    facebookLogin: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors,
    adminAuth: state.adminAuthReducer
});
export default connect(
    mapStateToProps,
    { loginUser, loginAdmin, facebookLogin }
)(Login);
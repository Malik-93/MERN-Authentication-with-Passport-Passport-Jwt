import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
// import classnames from "classnames";
import { addProduct } from './../../../Redux/Actions/productsAction';
import { logoutAdmin } from './../../../Redux/Actions/Admin/authActions';
class AdminProduct extends Component {
    constructor() {
        super();
        this.state = {
            title: "",
            description: "",
            company: "",
            price: "",
            productImage: {},
            errors: {}
        };
    }
    onChangeFile = (e) => {
        this.setState({ [e.target.id]: e.target.files[0] })
    }
    onChange = e => {
        this.setState({ [e.target.id]: e.target.value });
    };

    onSubmit = e => {
        e.preventDefault();
        const { title, description, company, price, productImage } = this.state;
        let formData = new FormData();
        formData.append('title', title)
        formData.append('description', description)
        formData.append('company', company)
        formData.append('price', price)
        formData.append('productImage', productImage)
        this.props.addProduct(formData);
        this.setState({
            title: "",
            description: "",
            company: "",
            price: "",
            productImage: {},
        })
    };
    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col s8 offset-s2">
                        <Link to="/" className="btn-flat waves-effect">
                            <i className="material-icons left">keyboard_backspace</i> Back to
                            home
            </Link>

                        <div className="col s12" style={{ paddingLeft: "11.250px" }}>
                            <h4>
                                <b>Add New Product</b>
                            </h4>
                        </div>
                        <form noValidate onSubmit={this.onSubmit} >
                            <div className="input-field col s12">
                                <input
                                    onChange={this.onChange}
                                    value={this.state.title}
                                    // error={errors.name}
                                    id="title"
                                    type="text"
                                // className={classnames("", {
                                //     invalid: errors.name
                                // })}
                                />
                                <label htmlFor="title">Title</label>
                                {/* <span className="red-text">{errors.name}</span> */}
                            </div>
                            <div className="input-field col s12">
                                <input
                                    onChange={this.onChange}
                                    value={this.state.description}
                                    // error={errors.email}
                                    id="description"
                                    type="text"
                                // className={classnames("", {
                                //     invalid: errors.email
                                // })}
                                />
                                <label htmlFor="description">Description</label>
                                {/* <span className="red-text">{errors.email}</span> */}
                            </div>
                            <div className="input-field col s12">
                                <input
                                    onChange={this.onChange}
                                    value={this.state.company}
                                    // error={errors.password}
                                    id="company"
                                    type="text"
                                // className={classnames("", {
                                //     invalid: errors.password
                                // })}
                                />
                                <label htmlFor="password">Company</label>
                                {/* <span className="red-text">{errors.password}</span> */}
                            </div>
                            <div className="input-field col s12">
                                <input
                                    onChange={this.onChange}
                                    value={this.state.price}
                                    // error={errors.confPassword}
                                    id="price"
                                    type="text"
                                // className={classnames("", {
                                //     invalid: errors.confPassword
                                // })}
                                />
                                <label htmlFor="Price">Price</label>
                                {/* <span className="red-text">{errors.confPassword}</span> */}
                            </div>
                            <div className="input-field col s12">
                                <input type="file" name="productImage" id="productImage" onChange={this.onChangeFile} />
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
                                    Add
                </button>
                            </div>
                        </form>
                        <div className="col s12" style={{ paddingLeft: "11.250px" }}>
                            <button
                            onClick={(e) => {
                                e.preventDefault()
                                this.props.logoutAdmin()
                            }
                        }
                                style={{
                                    width: "150px",
                                    borderRadius: "3px",
                                    letterSpacing: "1.5px",
                                    marginTop: "1rem"
                                }}
                                type="submit"
                                className="btn btn-large waves-effect waves-light hoverable red accent-3"
                            >
                                Log Out
                </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
AdminProduct.propTypes = {
    addProduct: PropTypes.func.isRequired,
    logoutAdmin: PropTypes.func.isRequired,
    dbProduct: PropTypes.object.isRequired,
    // errors: PropTypes.object.isRequired,
    isLoading: PropTypes.bool.isRequired
};

const mapStateToProps = state => ({
    dbProduct: state.productsReducer.oneProduct,
    errors: state.errors,
    isLoading: state.productsReducer.isLoading
});

export default connect(
    mapStateToProps,
    { addProduct, logoutAdmin }
)(AdminProduct);
import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../Redux/Actions/authActions";
import { getAllProducts, getOneProduct, deleteProduct } from "../../Redux/Actions/productsAction";
import Loading from "../Loading";
import { Link } from 'react-router-dom';

class Dashboard extends Component {
    state = {
        errorMessage: '',
        success: '',
        firstLoading: true
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.dbErrors) {
            this.setState({ errorMessage: nextProps.dbErrors.message })
        }
    }

    componentDidMount() {
        this.props.getAllProducts()
        setTimeout(() => {
            this.setState({ firstLoading: false })
        }, 3500);
    }
    getOneProduct = (id) => {
        this.props.getOneProduct(id)
    }

    deleteProduct = (id) => {
        this.props.deleteProduct(id, this.props.history)

    }

    onLogoutClick = e => {
        e.preventDefault();
        this.props.logoutUser();
    };
    render() {
        console.log(this.state.firstLoading)

        if (this.props.isLoading || this.state.firstLoading) {
            return (
                <div>
                    <Loading />
                </div>
            )
        } else {
            const { user } = this.props.auth;
            return (
                <div style={{ height: "75vh" }} className="container valign-wrapper">
                    {this.state.errorMessage ? alert(this.state.errorMessage) : ''}
                    <div className="row">
                        <div className="col s12 center-align">
                            <h4>
                                <b>Hey there,</b> { user.name.split(" ")[0] }
                                <p className="flow-text grey-text text-darken-1">
                                    You are logged into a full-stack{" "}
                                    <span style={{ fontFamily: "monospace" }}>MERN</span> app
              </p>
                            </h4>

                            <div>
                                {this.props.dbProduct.length > 0 ? this.props.dbProduct.map((product, index) => {
                                    return <div key={index}>
                                        <img src={product.productImage} alt='productImg' height='50%' width='50%' onClick={() => this.getOneProduct(product._id)} />
                                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                                            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: "space-evenly" }}>
                                                <div>
                                                    <span>
                                                        <b>Title: </b>
                                                    </span>
                                                    </div>
                                                    <div>
                                                    <span>
                                                        {product.title}
                                                    </span>
                                                </div>
                                            </div>

                                            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: "space-evenly" }}>
                                                <div>
                                                    <span>
                                                        <b>Description: </b>
                                                    </span>
                                                    </div>
                                                    <div>
                                                    <span>
                                                        {product.description}
                                                    </span>
                                                </div>
                                        
                                            </div>

                                            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: "space-evenly" }}>
                                                <div>
                                                    <span>
                                                        <b>Company: </b>
                                                    </span>
                                                    </div>
                                                    <div>
                                                    <span>
                                                        {product.company}
                                                    </span>
                                                </div>
                                                
                                            </div>

                                            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: "space-evenly" }}>
                                                <div>
                                                    <span>
                                                        <b>Price: </b>
                                                    </span>
                                                    </div>
                                                    <div>
                                                    <span>
                                                        {product.price}
                                                    </span>
                                                </div>

                                                
                                            </div>
                                            <div>
                                                <span><i className="fa fa-trash-o" style={{ color: 'red' }} onClick={() => this.deleteProduct(product._id)}></i></span>
                                            </div>

                                        </div>
                                    </div>
                                })
                                    : <div><h3>Store is empty</h3></div>
                                }
                            </div>
                            <button
                                style={{
                                    width: "150px",
                                    borderRadius: "3px",
                                    letterSpacing: "1.5px",
                                    marginTop: "1rem"
                                }}
                                onClick={this.onLogoutClick}
                                className="btn btn-large waves-effect waves-light hoverable blue accent-3"
                            >
                                Logout
            </button>

            <Link to='/users/profile'>
                            <button
                                style={{
                                    width: "150px",
                                    borderRadius: "3px",
                                    letterSpacing: "1.5px",
                                    marginTop: "1rem"
                                }}
                                className="btn btn-large waves-effect waves-light hoverable blue accent-3"
                            >
                                    Profile
                            </button>
                            </Link>
                        </div>
                    </div>
                </div>
            );
        }
    }
}
Dashboard.propTypes = {
    logoutUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    dbProduct: PropTypes.array.isRequired,
    isLoading: PropTypes.bool.isRequired,
    deleteProduct: PropTypes.func.isRequired,
    getAllProducts: PropTypes.func.isRequired,
    getOneProduct: PropTypes.func.isRequired,
    dbErrors: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
    auth: state.auth,
    dbProduct: state.productsReducer.products,
    isLoading: state.productsReducer.isLoading,
    dbOneProduct: state.productsReducer.oneProduct,
    dbErrors: state.productsReducer.errors
});
export default connect(
    mapStateToProps,
    { logoutUser, getAllProducts, getOneProduct, deleteProduct }
)(Dashboard);
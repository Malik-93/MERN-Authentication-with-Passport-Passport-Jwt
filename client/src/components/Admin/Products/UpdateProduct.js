import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
// import classnames from "classnames";
import { addProduct } from './../../../Redux/Actions/productsAction';
class UpdateModal extends Component {
    constructor() {
        super();
        this.state = {
            isModalVisible: false,
            title: "",
            description: "",
            company: "",
            price: "",
            productImage: '',
            errors: {},

        };
    }
 toggleModal = () => {
     this.setState({ isModalVisible: !this.state.isModalVisible })
 }

    onChangeFile = (e) => {
        this.setState({ [e.target.id]: e.target.files[0] })
    }
    onChange = e => {
        this.setState({ [e.target.id]: e.target.value });
    };
    onSubmit = e => {
        e.preventDefault();
        const data = new FormData()
        data.append('file', this.state.productImage)
        const newProduct = {
            title: this.state.title,
            description: this.state.description,
            company: this.state.company,
            price: this.state.price,
            productImage: data
        };
        console.log('client Product:', newProduct)

        this.props.addProduct(newProduct);
    };
    render() {
        // console.log('Client Db Product: ', this.props.dbProduct )
        // const { errors } = this.state;
        console.log(this.state.productImage)
        return (
            <Modal isOpen={this.state.isModalVisible} toggle={this.toggleModal}>
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
                        <form noValidate onSubmit={this.onSubmit} encType="multipart/form-data">
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
                                <input type="file" name="productImage" id="productImage" multiple onChange={this.onChangeFile} />
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
                    </div>
                </div>
            </div>
            </Modal>
        );
    }
}
UpdateModal.propTypes = {
    addProduct: PropTypes.func.isRequired,
    dbProduct: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired,
    isLoading: PropTypes.bool.isRequired
};

const mapStateToProps = state => ({
    dbProduct: state.productsReducer.oneProduct,
    errors: state.errors,
    isLoading: state.productsReducer.isLoading
});

export default connect(
    mapStateToProps,
    { addProduct }
)(UpdateModal);
        //         
        //             <ModalHeader toggle={this.toggle}>Modal title</ModalHeader>
        //             <ModalBody>
        //                 Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
        //   </ModalBody>
        //             <ModalFooter>
        //                 <Button color="primary" onClick={this.toggle}>Do Something</Button>{' '}
        //                 <Button color="secondary" onClick={this.toggle}>Cancel</Button>
        //             </ModalFooter>
        //         </Modal>
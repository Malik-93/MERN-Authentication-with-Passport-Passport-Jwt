import React from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import Landing from "./components/layout/Landing";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import jwt_decode from "jwt-decode";
import setAuthToken from './utils/setAuthToken';
import { setCurrentUser, logoutUser } from './Redux/Actions/authActions';
import PrivateRoute from './components/Private-Routes/PrivateRoute';
import ProfilePrivateRoute from './components/Private-Routes/Profile-Route';
import Dashboard from './components/Dashboard/Dashboard';
import AdminProduct from './components/Admin/Products/addProductForm'
import UserProfile from './components/User/User-Profile';
import AdminAddProduct from './components/Private-Routes/Admin-Routes/Add-Product';
class App extends React.Component {
  componentDidMount() {
    // Check for token to keep user logged in
    if (localStorage.jwtToken) {
      // Set auth token header auth
      const token = localStorage.jwtToken;
      setAuthToken(token);
      // Decode token and get user info and exp
      const decoded = jwt_decode(token);
      // Set user and isAuthenticated
      this.props.dispatch(setCurrentUser(decoded));
      // Check for expired token
      const currentTime = Date.now() / 1000; // to get in milliseconds
      if (decoded.exp < currentTime) {
        // Logout user
        this.props.dispatch(logoutUser());
        // Redirect to login
        window.location.href = "./login";
      }
    }
  }
  render() {
    return (
      <Router>
        <div className="App">
          <Navbar />
          <Route exact path="/" component={Landing} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/login" component={Login} />
          <Switch>
             {/* Protected Routes */}
            <PrivateRoute exact path="/dashboard" component={Dashboard} />
            <ProfilePrivateRoute exact path="/users/profile" component={UserProfile} />
            <AdminAddProduct exact path='/admin/addProduct' component={AdminProduct} />
          </Switch>
        </div>
      </Router>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    auth: state.auth
  }
}

export default connect(mapStateToProps)(App)
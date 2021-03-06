import axios from "axios";
import setAuthToken from "../../utils/setAuthToken";
import jwt_decode from "jwt-decode";
import {
    GET_ERRORS,
    SET_CURRENT_USER,
    USER_LOADING,
    EMAIL_SENT_MESSAGE,
} from "./types";
// Register User
export const registerUser = (userData, history) => dispatch => {
    axios
        .post("/api/users/register", userData)
        .then(res => {
            console.log("Sign Up From client", res.data )
            dispatch({
                type: EMAIL_SENT_MESSAGE,
                payload: res.data.message
            })

            // history.push("/login") // re-direct to login on successful register
        }) 
        .catch(err =>
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        );
};
export const resendEmailLink = email => dispatch => {
axios.post('/api/users/resendEmailToken', email)
.then(res => {
    console.log(res)
})
.catch(err => {
    console.log(err)
})
}
// Login - get user token
export const loginUser = userData => dispatch => {
    axios
        .post("/api/users/login", userData)
        .then(res => {
            // Save to localStorage
            // Set token to localStorage
            const { token } = res.data;
            localStorage.setItem("jwtToken", token);
            // Set token to Auth header
            setAuthToken(token);
            // Decode token to get user data
            const decoded = jwt_decode(token);
            // Set current user
            dispatch(setCurrentUser(decoded));
        })
        .catch(err => {
            console.log(err.response.data)
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        });
};
export const facebookLogin = (token) => dispatch => {
    axios.post('http://localhost:5000/api/users/auth/facebook', token)
        .then(res => {
            console.log(res)
        })
        .catch(err => console.log('Facebook login error:', err))
}
// Set logged in user
export const setCurrentUser = decoded => {
    return {
        type: SET_CURRENT_USER,
        payload: decoded
    };
};
// User loading
export const setUserLoading = () => {
    return {
        type: USER_LOADING
    };
};
// Log user out
export const logoutUser = () => dispatch => {
    // Remove token from local storage
    localStorage.removeItem("jwtToken");
    // Remove auth header for future requests
    setAuthToken(false);
    // Set current user to empty object {} which will set isAuthenticated to false
    dispatch(setCurrentUser({}));
};
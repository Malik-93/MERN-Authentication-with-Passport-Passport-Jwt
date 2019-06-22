import axios from "axios";
import setAuthToken from "../../../utils/setAuthToken";
import jwt_decode from "jwt-decode";
import {
    GET_ERRORS,
    SET_CURRENT_ADMIN,
    ADMIN_LOADING
} from "../types";
// Login - get admin token
export const loginAdmin = adminData => dispatch => {
    axios
        .post("/api/admin/login", adminData)
        .then(res => {
            dispatch({
                type: ADMIN_LOADING,
                payload: true
            })
            // Save to localStorage
            // Set token to localStorage
            const { token } = res.data;
            localStorage.setItem("AdminjwtToken", token);
            // Set token to Auth header
            setAuthToken(token);
            // Decode token to get user data
            const decoded = jwt_decode(token);
            // Set current user
            dispatch(setCurrentAdmin(decoded));
            dispatch({
                type: ADMIN_LOADING,
                payload: false
            })
        })
        .catch(err => {
            dispatch({
               type: GET_ERRORS,
               payload: err.response.data
           });
              dispatch({
                  type: ADMIN_LOADING,
                  payload: true
              })
        }
        );
};
// Set logged in admin
export const setCurrentAdmin = decoded => {
    return {
        type: SET_CURRENT_ADMIN,
        payload: decoded
    };
};
// Log admin out
export const logoutAdmin = () => dispatch => {
    // Remove token from local storage
    localStorage.removeItem("AdminjwtToken");
    // Remove auth header for future requests
    setAuthToken(false);
    // Set current admin to empty object {} which will set isAuthenticated to false
    dispatch(setCurrentAdmin({}));
};
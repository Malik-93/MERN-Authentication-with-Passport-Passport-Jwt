import { SET_CURRENT_ADMIN, ADMIN_LOADING, GET_ERRORS } from "../../Actions/types";
const isEmpty = require("is-empty");

const initialState = {
    isAuthenticated: false,
    admin: {},
    loading: false,
    errors: {}
};
export default function (state = initialState, action) {
    switch (action.type) {
        case SET_CURRENT_ADMIN:
            return {
                ...state,
                isAuthenticated: !isEmpty(action.payload),
                admin: action.payload
            };
        case ADMIN_LOADING:
            return {
                ...state,
                loading: true
            };
        case GET_ERRORS:
            return {
                ...state,
                errors: action.payload
            };
        default:
            return state;
    }
}
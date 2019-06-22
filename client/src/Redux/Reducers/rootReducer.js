import { combineReducers } from "redux";
import authReducer from "./authReducers";
import errorReducer from "./errorReducers";
import productsReducer from './productsReducer';
import adminAuthReducer from './Admin/admin-Auth-Reducer'
export default combineReducers({
    auth: authReducer,
    errors: errorReducer,
    productsReducer,
    adminAuthReducer
});
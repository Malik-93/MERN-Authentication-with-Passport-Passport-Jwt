//, EMAIL_VERIFICATION_TOKEN
import { SET_CURRENT_USER, USER_LOADING, EMAIL_SENT_MESSAGE } from "../Actions/types";
const isEmpty = require("is-empty");
const initialState = {
    isAuthenticated: false,
    user: {},
    loading: false,
    emailSentMessage: ''    
};
export default function (state = initialState, action) {
    switch (action.type) {
        case SET_CURRENT_USER:
            return {
                ...state,
                isAuthenticated: !isEmpty(action.payload),
                user: action.payload
            };
            case EMAIL_SENT_MESSAGE:
                return {
                    ...state,
                    emailSentMessage: action.payload
                }
        case USER_LOADING:
            return {
                ...state,
                loading: true
            };
        default:
            return state;
    }
}
import {
    SEND_SIGNUP_OTP_REQUEST,
    SEND_SIGNUP_OTP_SUCCESS,
    SEND_SIGNUP_OTP_FAIL,
    SEND_LOGIN_OTP_REQUEST,
    SEND_LOGIN_OTP_SUCCESS,
    SEND_LOGIN_OTP_FAIL,
    VERIFY_LOGIN_OTP_REQUEST,
    VERIFY_LOGIN_OTP_SUCCESS,
    VERIFY_LOGIN_OTP_FAIL,
    VERIFY_SIGNUP_OTP_REQUEST,
    VERIFY_SIGNUP_OTP_SUCCESS,
    VERIFY_SIGNUP_OTP_FAIL,
    GET_USER_REQUEST,
    GET_USER_FAIL,
    GET_USER_SUCCESS
} from "../Constant/authConstant";

const initialState = {
    loading: false,
    success: false,
    error: null,
    message: null
};

export const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case SEND_SIGNUP_OTP_REQUEST:
        case SEND_LOGIN_OTP_REQUEST:
        case VERIFY_LOGIN_OTP_REQUEST:
        case VERIFY_SIGNUP_OTP_REQUEST:
            return {
                ...state,
                loading: true,
                success: false,
                error: null
            };
        case SEND_SIGNUP_OTP_SUCCESS:
        case SEND_LOGIN_OTP_SUCCESS:
        case VERIFY_LOGIN_OTP_SUCCESS:
        case VERIFY_SIGNUP_OTP_SUCCESS:
            return {
                ...state,
                loading: false,
                success: true,
                message: action.payload
            };
        case SEND_SIGNUP_OTP_FAIL:
        case SEND_LOGIN_OTP_FAIL:
        case VERIFY_LOGIN_OTP_FAIL:
        case VERIFY_SIGNUP_OTP_FAIL:
            return {
                ...state,
                loading: false,
                success: false,
                error: action.payload
            };
        default:
            return state;
    }
};


const initialState1 = {
    loading: false,
    user: null,
    auth: false,
    error: null
};


export const userReducer = (state = initialState1, action) => {
    switch (action.type) {
        case GET_USER_REQUEST:
            return {
                ...state,
                loading: true,
                error: null
            };
        case GET_USER_SUCCESS:
            return {
                ...state,
                loading: false,
                user: action.payload.user,
                auth: action.payload.auth
            };
        case GET_USER_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
            };
        default:
            return state;
    }
};
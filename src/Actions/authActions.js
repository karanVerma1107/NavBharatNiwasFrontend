import axiosInstance from "../../axiosInstance";
import { SEND_LOGIN_OTP_FAIL,
    SEND_LOGIN_OTP_REQUEST,
    SEND_LOGIN_OTP_SUCCESS,
    SEND_SIGNUP_OTP_FAIL,
    SEND_SIGNUP_OTP_REQUEST,
    SEND_SIGNUP_OTP_SUCCESS,
    VERIFY_LOGIN_OTP_FAIL,
    VERIFY_LOGIN_OTP_REQUEST,
    VERIFY_LOGIN_OTP_SUCCESS,
    VERIFY_SIGNUP_OTP_FAIL,
    VERIFY_SIGNUP_OTP_REQUEST,
    VERIFY_SIGNUP_OTP_SUCCESS,
    GET_USER_REQUEST,
    GET_USER_FAIL,
    GET_USER_SUCCESS
 } from "../Constant/authConstant";

 // Send OTP for Signup
export const sendSignupOtp = (name, email) => async (dispatch) => {
    try {
        dispatch({ type: SEND_SIGNUP_OTP_REQUEST });

        const config = {
            headers: {
                'Content-Type': 'application/json'
            },
            
        };

        const { data } = await axiosInstance.post('/api/v1/sendSignupotp', { name, email }, config);

        dispatch({
            type: SEND_SIGNUP_OTP_SUCCESS,
            payload: data.message
        });
    } catch (error) {
        dispatch({
            type: SEND_SIGNUP_OTP_FAIL,
            payload: error.response && error.response.data.message
                ? error.response.data.message
                : error.message
        });
    }
};


// Verify OTP for Signup
export const verifySignupOtp = (email, otp) => async (dispatch) => {
    try {
        dispatch({ type: VERIFY_SIGNUP_OTP_REQUEST });

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        };

        const { data } = await axiosInstance.post('/api/v1/verifySignupOtp', { email, otp }, config);

        dispatch({
            type: VERIFY_SIGNUP_OTP_SUCCESS,
            payload: data.message
        });
    } catch (error) {
        dispatch({
            type: VERIFY_SIGNUP_OTP_FAIL,
            payload: error.response && error.response.data.message
                ? error.response.data.message
                : error.message
        });
    }
};


// Send OTP for Login
export const sendLoginOtp = (email) => async (dispatch) => {
    try {
        dispatch({ type: SEND_LOGIN_OTP_REQUEST });

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        };

        const { data } = await axiosInstance.post('/api/v1/sendLoginOtp', { email }, config);

        dispatch({
            type: SEND_LOGIN_OTP_SUCCESS,
            payload: data.message
        });
    } catch (error) {
        dispatch({
            type: SEND_LOGIN_OTP_FAIL,
            payload: error.response && error.response.data.message
                ? error.response.data.message
                : error.message
        });
    }
};




// Verify OTP for Login
export const verifyLoginOtp = (email, Otp) => async (dispatch) => {
    try {
        dispatch({ type: VERIFY_LOGIN_OTP_REQUEST });

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        };

        const { data } = await axiosInstance.post('/api/v1/verifyLoginOtp', { email, Otp }, config);

        dispatch({
            type: VERIFY_LOGIN_OTP_SUCCESS,
            payload: data.message
        });
    } catch (error) {
        dispatch({
            type: VERIFY_LOGIN_OTP_FAIL,
            payload: error.response && error.response.data.message
                ? error.response.data.message
                : error.message
        });
    }
};




// Get User from Token
export const getUserFromToken = () => async (dispatch) => {
    try {
        dispatch({ type: GET_USER_REQUEST });

        const { data } = await axiosInstance.get('/api/v1/me');

        dispatch({
            type: GET_USER_SUCCESS,
            payload: data
        });
    } catch (error) {
        dispatch({
            type: GET_USER_FAIL,
            payload: error.response && error.response.data.message
                ? error.response.data.message
                : error.message
        });
    }
};
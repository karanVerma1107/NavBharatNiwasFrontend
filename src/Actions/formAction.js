import { SUBMIT_ISALLOW_REQ,
    SUBMIT_ISALLOW_FAIL,
    SUBMIT_ISALLOW_SUCCESS,
    GET_LATEST_ISALLOW_REQ,
    GET_LATEST_ISALLOW_SUCCESS,
    GET_LATEST_ISALLOW_FAIL,
    FILL_LUCKYDRAW_REQ,
    FILL_LUCKYDRAW_SUCCESS,
    FILL_LUCKYDRAW_FAIL,
    GET_APPLICATIONS_REQ,
    GET_APPLICATIONS_SUCCESS,
    GET_APPLICATIONS_FAIL,
    GET_LUCKYDRAW_BY_ID_REQ,
    GET_LUCKYDRAW_BY_ID_FAIL,
    GET_LUCKYDRAW_BY_ID_SUCCESS,
    UPDATE_LUCKYDRAW_STATUS_REQ,
    UPDATE_LUCKYDRAW_STATUS_SUCCESS,
    UPDATE_LUCKYDRAW_STATUS_FAIL,
    GET_ALL_LUCKYDRAW_REQ,
    GET_ALL_LUCKYDRAW_SUCCESS,
    GET_ALL_LUCKYDRAW_FAIL,
    PUSH_TO_RESULT_REQ,
    PUSH_TO_RESULT_SUCCESS,
    PUSH_TO_RESULT_FAIL,
    GET_HISTORY_REQ,
    GET_HISTORY_FAIL,
    GET_HISTORY_SUCCESS,
    GET_RESULT_REQ,
    GET_RESULT_SUCCESS,
    GET_RESULT_FAIL,
    FILL_FAQ_FORM_REQ,
    FILL_FAQ_FORM_SUCCESS,
    FILL_FAQ_FORM_FAIL
 } from "../Constant/formConstant";

import axiosInstance from "../../axiosInstance";


export const makeIsallow = (data) => async (dispatch) => {
    try {
        // Dispatching request action to indicate API call is in progress
        dispatch({
            type: SUBMIT_ISALLOW_REQ,
        });

        // Define config directly inside the function
        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
        };

        // Make the API request
        const response = await axiosInstance.post('/api/v1/filldraw', data, config);
        
        // If the request is successful, dispatch the success action
        dispatch({
            type: SUBMIT_ISALLOW_SUCCESS,
            payload: response.data,  // Store the response data in the Redux state
        });

    } catch (error) {
        // If the request fails, dispatch the fail action with the error message
        dispatch({
            type: SUBMIT_ISALLOW_FAIL,
            payload: error.response ? error.response.data.message : error.message, // Get error message
        });
    }
};




export const updateLuckyDrawStatus = (id, action) => async (dispatch) => {
    try {
        // Dispatching request action to indicate API call is in progress
        dispatch({
            type: UPDATE_LUCKYDRAW_STATUS_REQ,
        });

        // Define the request body
        const data = {
            id,       // LuckyDraw ID
            action,   // Action to perform: 'approve' or 'reject'
        };

        // Define the config for the API request
        const config = {
            headers: {
                'Content-Type': 'application/json', // Sending JSON data
            },
        };

        // Make the API request to update the LuckyDraw status
        const response = await axiosInstance.put('/api/v1/update-draw-status', data, config);

        // If the request is successful, dispatch the success action
        dispatch({
            type: UPDATE_LUCKYDRAW_STATUS_SUCCESS,
            payload: response.data,  // Store the response data (the updated LuckyDraw)
        });

    } catch (error) {
        // If the request fails, dispatch the fail action with the error message
        dispatch({
            type: UPDATE_LUCKYDRAW_STATUS_FAIL,
            payload: error.response ? error.response.data.message : error.message, // Handle error message
        });
    }
};




export const faqform = (data) => async (dispatch) => {

    console.log(data)
    try {
        // Dispatching request action to indicate API call is in progress
        dispatch({
            type: FILL_FAQ_FORM_REQ,
        });

        
        // Define the config for the API request
        const config = {
            headers: {
                'Content-Type': 'application/json', // Sending JSON data
            },
        };

        // Make the API request to update the LuckyDraw status
        const response = await axiosInstance.post('/api/v1/fill-form', data, config);

        // If the request is successful, dispatch the success action
        dispatch({
            type: FILL_FAQ_FORM_SUCCESS,
            payload: response.data,  // Store the response data (the updated LuckyDraw)
        });

    } catch (error) {
        // If the request fails, dispatch the fail action with the error message
        console.error('Error in faqform action:', error);

        dispatch({
            type: FILL_FAQ_FORM_FAIL,
            payload: error.response ? error.response.data.message : error.message, // Handle error message
        });
    }
};



export const getDrawbyId = (data) => async (dispatch) => {
    try {
        // Dispatching request action to indicate API call is in progress
        dispatch({
            type: GET_LUCKYDRAW_BY_ID_REQ,
        });

        

        // Make the API request
        const response = await axiosInstance.get(`/api/v1/searchDraw/${data}`);

        // If the request is successful, dispatch the success action
        dispatch({
            type: GET_LUCKYDRAW_BY_ID_SUCCESS,
            payload: response.data,  // Store the response data in the Redux state
        });

    } catch (error) {
        // If the request fails, dispatch the fail action with the error message
        dispatch({
            type: GET_LUCKYDRAW_BY_ID_FAIL,
            payload: error.response ? error.response.data.message : error.message, // Get error message
        });
    }
};






export const getLatestIsAllow = () => async (dispatch) => {
    try {
        // Dispatching request action to indicate API call is in progress
        dispatch({
            type: GET_LATEST_ISALLOW_REQ,
        });

        // Make the API request
        const response = await axiosInstance.get('/api/v1/isAllowLatest');
        
        dispatch({
            type: GET_LATEST_ISALLOW_SUCCESS,
            payload: response.data,  // Store the response data in the Redux state
        });

    } catch (error) {
        // If the request fails, dispatch the fail action with the error message
        dispatch({
            type: GET_LATEST_ISALLOW_FAIL,
            payload: error.response ? error.response.data.message : error.message, // Get error message
        });
    }
};

export const getLatestIsAppli = () => async (dispatch) => {
    try {
        // Dispatching request action to indicate API call is in progress
        dispatch({
            type: GET_APPLICATIONS_REQ,
        });

        // Make the API request
        const response = await axiosInstance.get('/api/v1/getApplications');
        console.log('response', response);
        // If the request is successful, dispatch the success action
        dispatch({
            type: GET_APPLICATIONS_SUCCESS,
            payload: response.data,  // Store the response data in the Redux state
        });

    } catch (error) {
        // If the request fails, dispatch the fail action with the error message
        dispatch({
            type: GET_APPLICATIONS_FAIL,
            payload: error.response ? error.response.data.message : error.message, // Get error message
        });
    }
};





// Action to add a draw
export const createDraw = (formData) => async (dispatch) => {
    console.log("formData", formData);

    try {
        // Dispatch request action
        dispatch({ type: FILL_LUCKYDRAW_REQ });

        // Create FormData object to handle file uploads and other form data
        const form = new FormData();
        form.append('name', formData.name);
        form.append('phoneNo', formData.phoneNo);
        form.append('address', formData.address);
        form.append('occupation', formData.occupation);
        form.append('fatherName', formData.fatherName);
        form.append('AdhaarNo', formData.AdhaarNo);
        form.append('PANno', formData.PANno);
        form.append('DOB', formData.DOB); // Added DOB field
        form.append('nationality', formData.nationality); // Added nationality field
        form.append('project', formData.project); // Added project field

        

        // Append the image file to the FormData object
        if (formData.image) {
            form.append('image', formData.image); // Append the image with the field name 'image'
        }

        // Log FormData entries (optional for debugging)
        for (let [key, value] of form.entries()) {
            console.log(key, value);
        }

        // Configure headers for the request
        const config = {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        };

        // Make POST request to create the draw
        const  { data }  = await axiosInstance.post('/api/v1/create-draw', form, config);

        // Dispatch success action with response data
        dispatch({
            type: FILL_LUCKYDRAW_SUCCESS,
            payload: data,
        });
    } catch (error) {
        console.log("Error response:", error.response); // Check the error structure

        dispatch({
            type: FILL_LUCKYDRAW_FAIL,
            payload: error.response && error.response.data.message
                ? error.response.data.message
                : error.message,
        });
    }
};




// Action to fetch all LuckyDraws with pagination
export const getLuckyDraws = (page) => async (dispatch) => {
    try {
        dispatch({ type: GET_ALL_LUCKYDRAW_REQ });

        const response = await axiosInstance.get(`/api/v1/getAlldraws?page=${page}`);
        console.log('kiuhb', response)
        
        dispatch({
            type: GET_ALL_LUCKYDRAW_SUCCESS,
            payload: response.data, // Contains luckyDraws, totalPages, etc.
        });
    } catch (error) {
        dispatch({
            type: GET_ALL_LUCKYDRAW_FAIL,
            payload: error.response ? error.response.data.message : error.message,
        });
    }
};





// Action to fetch all LuckyDraws with pagination
export const passToresult = (id, allot) => async (dispatch) => {
    try {
        dispatch({ type: PUSH_TO_RESULT_REQ });

        const response = await axiosInstance.put(`/api/v1/pass/${id}/${allot}`);
        
        dispatch({
            type: PUSH_TO_RESULT_SUCCESS,
            payload: response.data, // Contains luckyDraws, totalPages, etc.
        });
    } catch (error) {
        dispatch({
            type: PUSH_TO_RESULT_FAIL,
            payload: error.response ? error.response.data.message : error.message,
        });
    }
};






// Action to fetch all LuckyDraws with pagination
export const getresult = () => async (dispatch) => {
    try {
        dispatch({ type: GET_HISTORY_REQ });

        const response = await axiosInstance.get(`/api/v1/history`);
        
        

        dispatch({
            type: GET_HISTORY_SUCCESS,
            payload: response.data, // Contains luckyDraws, totalPages, etc.
        });
    } catch (error) {
        dispatch({
            type: GET_HISTORY_FAIL,
            payload: error.response ? error.response.data.message : error.message,
        });
    }
};




// Action to fetch all LuckyDraws with pagination
export const result = (formId) => async (dispatch) => {
    try {
        dispatch({ type: GET_RESULT_REQ });

        const response = await axiosInstance.get(`/api/v1/result/${formId}`);
        
        console.log("result", response);

        dispatch({
            type: GET_RESULT_SUCCESS,
            payload: response.data, // Contains luckyDraws, totalPages, etc.
        });
    } catch (error) {
        dispatch({
            type: GET_RESULT_FAIL,
            payload: error.response ? error.response.data.message : error.message,
        });
    }
};
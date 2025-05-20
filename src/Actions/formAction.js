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
    FILL_FAQ_FORM_FAIL,
    FILL_COMPANY_FORM_REQUEST,
    FILL_COMPANY_FORM_SUCCESS,
    FILL_COMPANY_FORM_FAIL,
    GET_COMPANY_FORM_REQ,
    GET_COMPANY_FORM_SUCCESS,
    GET_COMPANY_FORM_FAIL,
    UPDATE_COMPANY_FORM_STATUS_REQ,
    UPDATE_COMPANY_FORM_STATUS_SUCCESS,
    UPDATE_COMPANY_FORM_STATUS_FAIL,
    GET_ALL_COMPANY_FORM_REQ,
    GET_ALL_COMPANY_FORM_SUCCESS,
    GET_ALL_COMPANY_FORM_FAIL,
    PUSH_COMPANY_TO_RESULT_SUCCESS,
    PUSH_COMPANY_TO_RESULT_REQ,
    PUSH_COMPANY_TO_RESULT_FAIL,
    GET_COMPANYFILL_BY_ID_REQ,
    GET_COMPANYFILL_BY_ID_SUCCESS,
    GET_COMPANYFILL_BY_ID_FAIL,
    GET_COMPANYFILL_REQ,
    GET_COMPANYFILL_SUCCESS,
    GET_COMPANYFILL_FAIL,
    GET_ALL_ISALLOW_REQ,
    GET_ALL_ISALLOW_SUCCESS,
    GET_ALL_ISALLOW_FAIL,
    GET_IS_ALLOW_PP_RESULT_REQUEST,
    GET_IS_ALLOW_PP_RESULT_SUCCESS,
    GET_IS_ALLOW_PP_RESULT_FAILURE,
    CREATE_COMPANY_ALLOTMENT_REQ,
    CREATE_COMPANY_ALLOTMENT_SUCCESS,
    CREATE_COMPANY_ALLOTMENT_FAIL,
    GET_ALLOTMENT_REQ,
    GET_ALLOTMENT_SUCCESS,
    GET_ALLOTMENT_FAIL,
    GET_ALLOTMENT_BY_ID_REQ,
    GET_ALLOTMENT_BY_ID_SUCCESS,
    GET_ALLOTMENT_BY_ID_FAIL,
    SUBMIT_SIGN_VALUE_REQ,
    SUBMIT_SIGN_VALUE_SUCCESS,
    SUBMIT_SIGN_VALUE_FAIL,
    CREATE_INDIVIDUAL_ALLOTMENT_REQ, 
    CREATE_INDIVIDUAL_ALLOTMENT_SUCCESS, 
    CREATE_INDIVIDUAL_ALLOTMENT_FAIL,
    SEARCH_ALLOTMENT_LETTER_REQ, 
    SEARCH_ALLOTMENT_LETTER_SUCCESS, 
    SEARCH_ALLOTMENT_LETTER_FAIL , 
    SEE_ALL_FAQS_REQ,
    SEE_ALL_FAQS_SUCCESS,
    SEE_ALL_FAQS_FAIL
 } from "../Constant/formConstant";

import axiosInstance from "../../axiosInstance";




export const fetchAllFAQs = () => async (dispatch) => {
    try {
      dispatch({ type: SEE_ALL_FAQS_REQ });
  
      const { data } = await axiosInstance.get('/api/v1/seefaq');
  
      dispatch({
        type: SEE_ALL_FAQS_SUCCESS,
        payload: data.data,
      });
    } catch (error) {
      dispatch({
        type: SEE_ALL_FAQS_FAIL,
        payload: error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
      });
    }
  };
  


export const searchAllotments = (query) => async (dispatch) => {
    try {
      dispatch({ type: SEARCH_ALLOTMENT_LETTER_REQ });
  
      const { data } = await axiosInstance.get(`/api/v1/getAllotment/${query}`);
  
      dispatch({
        type: SEARCH_ALLOTMENT_LETTER_SUCCESS,
        payload: data.results,
      });
    } catch (error) {
      dispatch({
        type: SEARCH_ALLOTMENT_LETTER_FAIL,
        payload: error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
      });
    }
  };



export const createIndiAllotment = (allotmentData) => async (dispatch, getState) => {
    try {
        dispatch({ type: CREATE_INDIVIDUAL_ALLOTMENT_REQ });

        

        const config = {
            headers: {
                'Content-Type': 'application/json',
                
            },
        };

        const { data } = await axiosInstance.post('/api/v1/createIndiAllotment', allotmentData, config);

        dispatch({
            type: CREATE_INDIVIDUAL_ALLOTMENT_SUCCESS,
            payload: data,
        });

    } catch (error) {
        dispatch({
            type: CREATE_INDIVIDUAL_ALLOTMENT_FAIL,
            payload: error.response && error.response.data.message 
                ? error.response.data.message 
                : error.message,
        });
    }
};




// Action to update signature
export const updateSignature = (allotmentId, signature) => async (dispatch) => {
    try {
        dispatch({ type: SUBMIT_SIGN_VALUE_REQ });

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        };

        const { data } = await axiosInstance.post(
            `/api/v1/sign/${allotmentId}`,
            { signature },
            config
        );

        dispatch({
            type: SUBMIT_SIGN_VALUE_SUCCESS,
            payload: data.message
        });

    } catch (error) {
        dispatch({
            type: SUBMIT_SIGN_VALUE_FAIL,
            payload: error.response && error.response.data.message
                ? error.response.data.message
                : error.message
        });
    }
};




export const getAllotmentById = (id) => async (dispatch) => {
    try {
        dispatch({ type: GET_ALLOTMENT_BY_ID_REQ });

        const { data } = await axiosInstance.get(`/api/v1/getAllotmentbyId/${id}`);

        dispatch({
            type: GET_ALLOTMENT_BY_ID_SUCCESS,
            payload: data.allotment,
        });
    } catch (error) {
        dispatch({
            type: GET_ALLOTMENT_BY_ID_FAIL,
            payload: error.response && error.response.data.message
                ? error.response.data.message
                : error.message,
        });
    }
};



// Function to fetch IsAllow results by ID
export const getallAllotment = () => async (dispatch) => {
    try {
      dispatch({ type: GET_ALLOTMENT_REQ });
  
      const  { data }  = await axiosInstance.get(`/api/v1/getAllotment`);
  
     

      dispatch({ 
        type: GET_ALLOTMENT_SUCCESS, 
        payload: data.allotments // Contains 'result' & 'resultCompany'  
      });
  
    } catch (error) {
      dispatch({ 
        type: GET_ALLOTMENT_FAIL, 
        payload: error.response?.data?.message || "Something went wrong" 
      });
    }
  };




// Function to create a company allotment
export const createCompanyAllotment = (allotmentData) => async (dispatch) => {
    try {
        dispatch({ type: CREATE_COMPANY_ALLOTMENT_REQ }); // Dispatch request action to set loading state

        const config = {
            headers: {
                'Content-Type': 'application/json', // Set the header to application/json
            },
        };

        const response = await axiosInstance.post('/api/v1/createCAllotment', allotmentData, config); // Send the data to the backend
        console.log(response.data); // Check the response here
        dispatch({
            type: CREATE_COMPANY_ALLOTMENT_SUCCESS,
            payload: response.data, // The response data from the backend
        });
    } catch (error) {
        dispatch({
            type: CREATE_COMPANY_ALLOTMENT_FAIL,
            payload: error.response && error.response.data.message
                ? error.response.data.message
                : error.message,
        });
    }
};






// Function to fetch IsAllow results by ID
export const getIsAllowResults = (id) => async (dispatch) => {
    try {
      dispatch({ type: GET_IS_ALLOW_PP_RESULT_REQUEST });
  
      const { data } = await axiosInstance.get(`/api/v1/getisallow/${id}`);
  
      dispatch({ 
        type: GET_IS_ALLOW_PP_RESULT_SUCCESS, 
        payload: data.data // Contains 'result' & 'resultCompany'  
      });
  
    } catch (error) {
      dispatch({ 
        type: GET_IS_ALLOW_PP_RESULT_FAILURE, 
        payload: error.response?.data?.message || "Something went wrong" 
      });
    }
  };



export const getIsAllowRecords = (page) => async (dispatch) => {
    try {
      dispatch({ type: GET_ALL_ISALLOW_REQ });
  
      const { data } = await axiosInstance.get(`/api/v1/getAllisallow?page=${page}`, {
       
      });
  
      dispatch({
        type: GET_ALL_ISALLOW_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: GET_ALL_ISALLOW_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };




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




export const updateCDrawStatus = (id, action) => async (dispatch) => {
    try {
        // Dispatching request action to indicate API call is in progress
        dispatch({
            type: UPDATE_COMPANY_FORM_STATUS_REQ,
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

        console.log('alalala')

        // Make the API request to update the LuckyDraw status
        const response = await axiosInstance.put('/api/v1/update-company-status', data, config);

        // If the request is successful, dispatch the success action
        dispatch({
            type: UPDATE_COMPANY_FORM_STATUS_SUCCESS,
            payload: response.data,  // Store the response data (the updated LuckyDraw)
        });

    } catch (error) {
        // If the request fails, dispatch the fail action with the error message
        dispatch({
            type: UPDATE_COMPANY_FORM_STATUS_FAIL,
            payload: error.response ? error.response.data.message : error.message, // Handle error message
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






export const getCDrawbyId = (data) => async (dispatch) => {
    try {
        // Dispatching request action to indicate API call is in progress
        dispatch({
            type: GET_COMPANY_FORM_REQ,
        });

        

        // Make the API request
        const response = await axiosInstance.get(`/api/v1/companyDraw/${data}`);

        // If the request is successful, dispatch the success action
        dispatch({
            type: GET_COMPANY_FORM_SUCCESS,
            payload: response.data.companyFill,  // Store the response data in the Redux state
        });

    } catch (error) {
        // If the request fails, dispatch the fail action with the error message
        dispatch({
            type: GET_COMPANY_FORM_FAIL,
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




export const getLatestCAppli = () => async (dispatch) => {
    try {
        // Dispatching request action to indicate API call is in progress
        dispatch({
            type: GET_COMPANYFILL_REQ,
        });

        // Make the API request
        const response = await axiosInstance.get('/api/v1/getCApplications');
        console.log('response', response);
        // If the request is successful, dispatch the success action
        dispatch({
            type: GET_COMPANYFILL_SUCCESS,
            payload: response.data,  // Store the response data in the Redux state
        });

    } catch (error) {
        // If the request fails, dispatch the fail action with the error message
        dispatch({
            type: GET_COMPANYFILL_FAIL,
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
        form.append('paymentPlan', formData.paymentPlan); // Added paymentPlan field
        // Add the new fields for plot size and preference
        form.append('plotSize', formData.plotSize); // Added plotSize field
        form.append('preference', formData.preference); 
        form.append('Executive', formData.Executive); // Added Executive field

        // Append the images (Aadhaar and PAN photos) if they exist
        if (formData.adhaarPhoto) {
            form.append('adhaarPhoto', formData.adhaarPhoto); // Append the Adhaar photo
        }

        if (formData.adhaarPhoto2) {
            form.append('adhaarPhoto2', formData.adhaarPhoto2); // Append the Adhaar photo
        }

        if (formData.panPhoto) {
            form.append('panPhoto', formData.panPhoto); // Append the PAN photo
        }

        // Append the main profile image if it exists
        if (formData.image) {
            form.append('image', formData.image); // Append the profile image
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
        const { data } = await axiosInstance.post('/api/v1/create-draw', form, config);

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



export const createCompanyFill = (formData) => async (dispatch) => {
    console.log("formData", formData);  // Debugging log for form data

    try {
        // Dispatch the request action to update the state (isProcessing = true)
        dispatch({ type: FILL_COMPANY_FORM_REQUEST });

        // Create a FormData object for handling file uploads and other form data
        const form = new FormData();
        form.append('companyName', formData.companyName);
        form.append('authorizedSignatory', formData.authorizedSignatory);
        form.append('gstNumber', formData.gstNumber);
        form.append('panNumber', formData.panNumber);
        form.append('Executive', formData.Executive); // Added Executive field
        form.append('companyAddress', formData.companyAddress);
        form.append('authorizedSignatoryAddress', formData.authorizedSignatoryAddress);
        form.append('paymentPlan', formData.paymentPlan);
        form.append('project', formData.project); // Added project field
// Add the new fields for plot size and preference
form.append('plotSize', formData.plotSize); // Added plotSize field
form.append('preference', formData.preference); // Added preference field
        // Append the images (PAN and Passport photos)
        if (formData.panPhoto) {
            form.append('panPhoto', formData.panPhoto);
        }

        if (formData.passportPhoto) {
            form.append('passportPhoto', formData.passportPhoto);
        }

        // Log FormData entries (optional for debugging purposes)
        for (let [key, value] of form.entries()) {
            console.log(key, value);
        }

        // Configure headers for the request
        const config = {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        };

        // Make POST request to create the company fill form
        const { data } = await axiosInstance.post('/api/v1/company-fill', form, config);

        // Dispatch success action with response data
        dispatch({
            type: FILL_COMPANY_FORM_SUCCESS,
            payload: data,
        });
    } catch (error) {
        console.log("Error response:", error.response);  // Log error response for debugging

        // Dispatch failure action if there is an error
        dispatch({
            type: FILL_COMPANY_FORM_FAIL,
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
export const getCDraws = (page) => async (dispatch) => {
    try {
        dispatch({ type: GET_ALL_COMPANY_FORM_REQ });

        const response = await axiosInstance.get(`/api/v1/getCompany?page=${page}`);
        console.log('kiuhb', response)
        
        dispatch({
            type: GET_ALL_COMPANY_FORM_SUCCESS,
            payload: response.data, // Contains luckyDraws, totalPages, etc.
        });
    } catch (error) {
        dispatch({
            type: GET_ALL_COMPANY_FORM_FAIL,
            payload: error.response ? error.response.data.message : error.message,
        });
    }
};







// Action to fetch all LuckyDraws with pagination
export const passToresult = (id, allot, gift) => async (dispatch) => {
    try {
        dispatch({ type: PUSH_TO_RESULT_REQ });

        const response = await axiosInstance.put(`/api/v1/pass/${id}/${allot}/${gift}`);
        
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



// Action to pass company to result
export const passCToresult = (companyId, allot, gift) => async (dispatch) => {
    try {
        dispatch({ type: PUSH_COMPANY_TO_RESULT_REQ });

        const response = await axiosInstance.put(`/api/v1/Cpass/${companyId}/${allot}/${gift}`);
        
        dispatch({
            type: PUSH_COMPANY_TO_RESULT_SUCCESS,
            payload: response.data, // The response data containing the success message and other relevant info
        });
    } catch (error) {
        dispatch({
            type: PUSH_COMPANY_TO_RESULT_FAIL,
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
import { ADD_SITE_FAIL, ADD_SITE_REQUEST, ADD_SITE_SUCCESS,
    GET_IMAGES_REQUEST,
    GET_IMAGES_SUCCESS,
    GET_IMAGES_FAIL,
    GET_ONGOING_SITE_REQUEST,
    GET_ONGOING_SITE_SUCCESS,
    GET_ONGOING_SITE_FAIL,
    GET_UPCOMING_SITE_REQUEST,
    GET_UPCOMING_SITE_SUCCESS,
    GET_UPCOMING_SITE_FAIL,
    GET_TESTIMONIAL_SITE_REQUEST,
    GET_TESTIMONIAL_SITE_SUCCESS,
    GET_TESTIMONIAL_SITE_FAIL,
    GET_SITE_BY_ID_REQUEST,
    GET_SITE_BY_ID_SUCCESS,
    GET_SITE_BY_ID_FAIL,
    GET_FORM_BY_ID_REQUEST,
    GET_FORM_BY_ID_SUCCESS,
    GET_FORM_BY_ID_FAIL
 } from "../Constant/siteConstant";
import axiosInstance from "../../axiosInstance";

// Action to add a site
export const addSite = (siteData) => async (dispatch) => {
    console.log("siteData", siteData);
    try {
        // Dispatch request action
        dispatch({ type: ADD_SITE_REQUEST });

        // Create FormData object to handle file uploads and other form data
        const formData = new FormData();
        formData.append('name', siteData.name);
        formData.append('description', siteData.description);
        formData.append('current', siteData.current);
        formData.append('formYes', siteData.formYes);

        // Append each image to the FormData object
        siteData.images.forEach((image) => {
            formData.append('images', image); // Use 'images' as the field name
        });

        // Log FormData entries
        for (let [key, value] of formData.entries()) {
            console.log(key, value);
        }

        // Configure headers for the request
        const config = {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        };

        // Make POST request to add site
        const { data } = await axiosInstance.post('/api/v1/createSite', formData, config);

        // Dispatch success action with response data
        dispatch({
            type: ADD_SITE_SUCCESS,
            payload: data,
        });
    } catch (error) {
        // Dispatch fail action with error message
        dispatch({
            type: ADD_SITE_FAIL,
            payload: error.response && error.response.data.message
                ? error.response.data.message
                : error.message,
        });
    }
};

// Action to get images
export const getImages = () => async (dispatch) => {
    try {
        // Dispatch request action
        dispatch({ type: GET_IMAGES_REQUEST });

        // Make GET request to fetch images
        const response = await axiosInstance.get('/api/v1/getImages');
        console.log('Response:', response);
        
        // Dispatch success action with response data
        dispatch({
            type: GET_IMAGES_SUCCESS,
            payload: response.data,
        });
    } catch (error) {
        // Dispatch fail action with error message
        dispatch({
            type: GET_IMAGES_FAIL,
            payload: error.response && error.response.data.message
                ? error.response.data.message
                : error.message,
        });
    }
};




// Action to get ongoing sites
export const getOngoingSites = (page) => async (dispatch) => {
    try {
        // Dispatch request action
        dispatch({ type: GET_ONGOING_SITE_REQUEST });

        // Make GET request to fetch ongoing sites
        const { data } = await axiosInstance.get(`/api/v1/sites/ongoing?page=${page}`);

        // Dispatch success action with response data
        dispatch({
            type: GET_ONGOING_SITE_SUCCESS,
            payload: data,
        });
    } catch (error) {
        // Dispatch fail action with error message
        dispatch({
            type: GET_ONGOING_SITE_FAIL,
            payload: error.response && error.response.data.message
                ? error.response.data.message
                : error.message,
        });
    }
};




// Action to get ongoing sites
export const getSitebyID = (id) => async (dispatch) => {
    try {
        // Dispatch request action
        dispatch({ type: GET_SITE_BY_ID_REQUEST });

        // Make GET request to fetch ongoing sites
        const { data } = await axiosInstance.get(`/api/v1/getSite/${id}`);

        // Dispatch success action with response data
        dispatch({
            type: GET_SITE_BY_ID_SUCCESS,
            payload: data,
        });
    } catch (error) {
        // Dispatch fail action with error message
        dispatch({
            type: GET_SITE_BY_ID_FAIL ,
            payload: error.response && error.response.data.message
                ? error.response.data.message
                : error.message,
        });
    }
};





// Action to get ongoing sites
export const getformbyID = (id) => async (dispatch) => {
    try {
        // Dispatch request action
        dispatch({ type: GET_FORM_BY_ID_REQUEST });

        // Make GET request to fetch ongoing sites
        const { data } = await axiosInstance.get(`/api/v1/draw/${id}`);
        console.log('API Response:', data);  // Check the actual API response

        // Dispatch success action with response data
        dispatch({
            type: GET_FORM_BY_ID_SUCCESS,
            payload: data.draw,
        });
    } catch (error) {
        // Dispatch fail action with error message
        dispatch({
            type: GET_FORM_BY_ID_FAIL ,
            payload: error.response && error.response.data.message
                ? error.response.data.message
                : error.message,
        });
    }
};






// Action to get upcoming sites
export const getUpcomingSites = (page) => async (dispatch) => {
    try {
        // Dispatch request action
        dispatch({ type: GET_UPCOMING_SITE_REQUEST });

        // Make GET request to fetch upcoming sites
        const { data } = await axiosInstance.get(`/api/v1/sites/upcoming?page=${page}`);
       
        // Dispatch success action with response data
        dispatch({
            type: GET_UPCOMING_SITE_SUCCESS,
            payload: data,
        });
    } catch (error) {
        // Dispatch fail action with error message
        dispatch({
            type: GET_UPCOMING_SITE_FAIL,
            payload: error.response && error.response.data.message
                ? error.response.data.message
                : error.message,
        });
    }
};


// Action to get testimonial sites
export const getTestimonialSites = (page) => async (dispatch) => {
    try {
        // Dispatch request action
        dispatch({ type: GET_TESTIMONIAL_SITE_REQUEST });

        // Make GET request to fetch testimonial sites
        const { data } = await axiosInstance.get(`/api/v1/sites/testimonial?page=${page}`);

        // Dispatch success action with response data
        dispatch({
            type: GET_TESTIMONIAL_SITE_SUCCESS,
            payload: data,
        });
    } catch (error) {
        // Dispatch fail action with error message
        dispatch({
            type: GET_TESTIMONIAL_SITE_FAIL,
            payload: error.response && error.response.data.message
                ? error.response.data.message
                : error.message,
        });
    }
};
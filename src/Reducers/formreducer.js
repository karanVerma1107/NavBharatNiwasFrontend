import { SUBMIT_ISALLOW_REQ,
    SUBMIT_ISALLOW_SUCCESS,
    SUBMIT_ISALLOW_FAIL,
    GET_LATEST_ISALLOW_REQ,
    GET_LATEST_ISALLOW_FAIL,
    GET_LATEST_ISALLOW_SUCCESS,
    FILL_LUCKYDRAW_REQ,
    FILL_LUCKYDRAW_SUCCESS,
    FILL_LUCKYDRAW_FAIL,
    GET_APPLICATIONS_REQ,
    GET_APPLICATIONS_SUCCESS,
    GET_APPLICATIONS_FAIL,
    GET_LUCKYDRAW_BY_ID_REQ,
    GET_LUCKYDRAW_BY_ID_SUCCESS,
    GET_LUCKYDRAW_BY_ID_FAIL,
    UPDATE_LUCKYDRAW_STATUS_REQ,
    UPDATE_LUCKYDRAW_STATUS_SUCCESS,
    UPDATE_LUCKYDRAW_STATUS_FAIL,
    GET_ALL_LUCKYDRAW_FAIL,
    GET_ALL_LUCKYDRAW_REQ,
    GET_ALL_LUCKYDRAW_SUCCESS,
    PUSH_TO_RESULT_REQ,
    PUSH_TO_RESULT_SUCCESS,
    PUSH_TO_RESULT_FAIL,
    GET_HISTORY_REQ,
    GET_HISTORY_SUCCESS,
    GET_HISTORY_FAIL,
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
    GET_COMPANY_FORM_FAIL,
    GET_COMPANY_FORM_SUCCESS,
    UPDATE_COMPANY_FORM_STATUS_REQ,
    UPDATE_COMPANY_FORM_STATUS_SUCCESS,
    UPDATE_COMPANY_FORM_STATUS_FAIL,
    GET_ALL_COMPANY_FORM_REQ,
    GET_ALL_COMPANY_FORM_SUCCESS,
    GET_ALL_COMPANY_FORM_FAIL,
    PUSH_COMPANY_TO_RESULT_SUCCESS,
    PUSH_COMPANY_TO_RESULT_REQ,
    PUSH_COMPANY_TO_RESULT_FAIL,
    GET_COMPANYFILL_BY_ID_SUCCESS,
    GET_COMPANYFILL_BY_ID_REQ,
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





// Reducer for Seeing All FAQs
export const seeAllFAQsReducer = (state = { faqs: [] }, action) => {
    switch (action.type) {
      case SEE_ALL_FAQS_REQ:
        return { loading: true, faqs: [] };
      case SEE_ALL_FAQS_SUCCESS:
        return { loading: false, faqs: action.payload };
      case SEE_ALL_FAQS_FAIL:
        return { loading: false, Error: action.payload };
      default:
        return state;
    }
  };
  




 const initialState0010 = {
    loading: false,
    allotments: [],
    error: null,
  };
  



 export const searchAllotmentReducer = (state = initialState0010, action) => {
    switch (action.type) {
      case SEARCH_ALLOTMENT_LETTER_REQ:
        return {
          ...state,
          loading: true,
          error: null,
        };
  
      case SEARCH_ALLOTMENT_LETTER_SUCCESS:
        return {
          ...state,
          loading: false,
          allotments: action.payload, // backend returns allotments in results
        };
  
      case SEARCH_ALLOTMENT_LETTER_FAIL:
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
  
      default:
        return state;
    }
  };





 const initialState120202 = {
    Loading: false,
    success: false,
    Error: null,
    message: null
};

export const signatureReducer = (state = initialState120202, action) => {
    switch (action.type) {
        case SUBMIT_SIGN_VALUE_REQ:
            return {
                ...state,
                loading: true,
                success: false,
                error: null
            };
        
        case SUBMIT_SIGN_VALUE_SUCCESS:
            return {
                ...state,
                loading: false,
                success: true,
                message: action.payload
            };
        
        case SUBMIT_SIGN_VALUE_FAIL:
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




 const initialState33333 = {
    loading: false,
    allotment: null,
    error: null,
};

export const allotmentbyIDReducer = (state = initialState33333, action) => {
    switch (action.type) {
        case GET_ALLOTMENT_BY_ID_REQ:
            return {
                ...state,
                loading: true,
            };

        case GET_ALLOTMENT_BY_ID_SUCCESS:
            return {
                ...state,
                loading: false,
                allotment: action.payload,
                error: null,
            };

        case GET_ALLOTMENT_BY_ID_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };

        default:
            return state;
    }
};




 // Initial State
const initialState929 = {
    loading: false,
    allotment: null,
    message: null,
    Error: null,
};


 // Initial State
 const initialState9291 = {
    loading: false,
    allotments: [],
    Error: null,
};



// Reducer
export const allotmentReducer = (state = initialState9291, action) => {
    switch (action.type) {
        case GET_ALLOTMENT_REQ:
            return { ...state, loading: true };
        case GET_ALLOTMENT_SUCCESS:
            return { ...state, loading: false, allotments: action.payload };
        case GET_ALLOTMENT_FAIL:
            return { ...state, loading: false, Error: action.payload };
        default:
            return state;
    }
};

// Reducer Function
export const companyAllotmentReducer = (state = initialState929, action) => {
    switch (action.type) {
        case CREATE_COMPANY_ALLOTMENT_REQ:
            return {
                ...state,
                loading: true,
            };
        case CREATE_COMPANY_ALLOTMENT_SUCCESS:
            return {
                ...state,
                loading: false,
                allotment: action.payload.allotment, // allotment data returned from action
                message: action.payload.message, // success message returned from action
                Error: null,
            };
        case CREATE_COMPANY_ALLOTMENT_FAIL:
            return {
                ...state,
                loading: false,
                allotment: null,
                Error: action.payload, // error message returned from action
            };
        default:
            return state;
    }
};





// Reducer Function
export const IndiAllotmentReducer = (state = initialState929, action) => {
    switch (action.type) {
        case CREATE_INDIVIDUAL_ALLOTMENT_REQ:
            return {
                ...state,
                loading: true,
            };
        case CREATE_INDIVIDUAL_ALLOTMENT_SUCCESS:
            return {
                ...state,
                loading: false,
                allotment: action.payload.allotment, // allotment data returned from action
                message: action.payload.message, // success message returned from action
                Error: null,
            };
        case CREATE_INDIVIDUAL_ALLOTMENT_FAIL:
            return {
                ...state,
                loading: false,
                allotment: null,
                Error: action.payload, // error message returned from action
            };
        default:
            return state;
    }
};




 const defaultState = { // Replaced 'initialState' with 'defaultState'
    isLoading: false,
    result: [],
    resultCompany: [],
    error: null,
  };
  
  export const isAllowResultsReducer = (state = defaultState, action) => {
    switch (action.type) {
      case GET_IS_ALLOW_PP_RESULT_REQUEST:
        return { ...state, isLoading: true };
  
      case GET_IS_ALLOW_PP_RESULT_SUCCESS:
        return {
          ...state,
          isLoading: false,
          result: action.payload.result, // LuckyDraw results
          resultCompany: action.payload.resultCompany, // CompanyFill results
        };
  
      case GET_IS_ALLOW_PP_RESULT_FAILURE:
        return { ...state, isLoading: false, error: action.payload };
  
      default:
        return state;
    }
  };






 const isAllowState = {
    isLoading: false,
    isAllowRecords: [],
    totalRecords: 0,
    totalPages: 0,
    currentPage: 1,
    error: null,
  };
  
  export const isAllowHandler = (state = isAllowState, action) => {
    switch (action.type) {
      case GET_ALL_ISALLOW_REQ:
        return {
          ...state,
          isLoading: true,
        };
  
      case GET_ALL_ISALLOW_SUCCESS:
        return {
          ...state,
          isLoading: false,
          isAllowRecords: action.payload.isAllow,
          totalRecords: action.payload.totalRecords,
          totalPages: action.payload.totalPages,
          currentPage: action.payload.currentPage,
          error: null,
        };
  
      case GET_ALL_ISALLOW_FAIL:
        return {
          ...state,
          isLoading: false,
          error: action.payload,
        };
  
      default:
        return state;
    }
  };






 // Initial state for the reducer
const initialState = {
    loading: false,
    message : null,
    error: null
};

// The reducer function to handle the actions
export const formReducer = (state = initialState, action) => {
    switch (action.type) {
        case SUBMIT_ISALLOW_REQ:
            return {
                ...state,
                loading: true,  // Set loading to true when the request is initiated
            };

        case SUBMIT_ISALLOW_SUCCESS:
            return {
                ...state,
                loading: false,  // Set loading to false once the data is fetched
                message: action.payload.message,  // Store the fetched data in the state
                error: null,  // Clear any previous error
            };

        case SUBMIT_ISALLOW_FAIL:
            return {
                ...state,
                loading: false,  // Set loading to false if the request failed
                isAllowData: null,  // Clear any previous data
                error: action.payload,  // Store the error message in the state
            };

        default:
            return state;
    }
};




const initialStatee = {
    Loading: false,
    message: null ,
    Error: null,
};

// Reducer to handle the push company to result action
export const pushCompanyToResultReducer = (state = initialStatee, action) => {
    switch (action.type) {
        case PUSH_COMPANY_TO_RESULT_REQ:
            return {
                ...state,
                Loading: true,
                success: false,
                Error: null,
            };

        case PUSH_COMPANY_TO_RESULT_SUCCESS:
            return {
                ...state,
                Loading: false,
                success: true,
                Error: null,
                message: action.payload.message, // Success message from API response
            };

        case PUSH_COMPANY_TO_RESULT_FAIL:
            return {
                ...state,
                Loading: false,
                success: false,
                Error: action.payload, // Error message from API response
            };

        default:
            return state;
    }
};





// Initial state
const initialState0 = {
    loading: false,
    companyFill: null,
    error: null
};

// Reducer function
export const getcompanyFormReducer = (state = initialState0, action) => {
    switch (action.type) {
        case GET_COMPANY_FORM_REQ:
            return {
                ...state,
                loading: true,  // Set loading to true when request is made
            };
        case GET_COMPANY_FORM_SUCCESS:
            return {
                ...state,
                loading: false,  // Set loading to false when success
                companyFill: action.payload,  // Assign payload (company fill data)
                error: null,  // Clear any error
            };
        case GET_COMPANY_FORM_FAIL:
            return {
                ...state,
                loading: false,  // Set loading to false on failure
                companyFill: null,  // Clear the company fill data
                error: action.payload,  // Set the error message
            };
        default:
            return state;
    }
};



// Initial state for the reducer
const initialState1 = {
    loading: false,
    permit: null,
    error: null
};

// The reducer function to handle the actions
export const getIsAllowReducer = (state = initialState1, action) => {
    switch (action.type) {
        case GET_LATEST_ISALLOW_REQ:
            return {
                ...state,
                loading: true,  // Set loading to true when the request is initiated
            };

        case GET_LATEST_ISALLOW_SUCCESS:
            return {
                ...state,
                loading: false,  // Set loading to false once the data is fetched
                permit: action.payload.isAllow,  // Store the fetched data in the state
                error: null,  // Clear any previous error
            };

        case GET_LATEST_ISALLOW_FAIL:
            return {
                ...state,
                loading: false,  // Set loading to false if the request failed
                permit: null,  // Clear any previous data
                error: action.payload,  // Store the error message in the state
            };

        default:
            return state;
    }
};





const initialState2 = {
    isProcessing: false,   // Loading state renamed to 'isProcessing'
    messageContent: '',    // Message state renamed to 'messageContent'
    errorContent: '',      // Error state renamed to 'errorContent'
};

export const fillLuckyDrawReducer = (state = initialState2, action) => {
    switch (action.type) {
        case FILL_LUCKYDRAW_REQ:
            return {
                ...state,
                isProcessing: true,   // Set loading to true when request is made
            };

        case FILL_LUCKYDRAW_SUCCESS:
            return {
                ...state,
                isProcessing: false,  // Set loading to false on success
                messageContent: action.payload.message, // Store success message
            };

        case FILL_LUCKYDRAW_FAIL:
            return {
                ...state,
                isProcessing: false,  // Set loading to false on failure
                errorContent: action.payload,   // Store error message
            };

        default:
            return state;
    }
};



export const fillCompanyFormReducer = (state = initialState2, action) => {
    switch (action.type) {
        case FILL_COMPANY_FORM_REQUEST:
            return {
                ...state,
                isProcessing: true,   // Set processing to true when request is made
            };

        case FILL_COMPANY_FORM_SUCCESS:
            return {
                ...state,
                isProcessing: false,  // Set processing to false on success
                messageContent: action.payload.message, // Store success message
            };

        case FILL_COMPANY_FORM_FAIL:
            return {
                ...state,
                isProcessing: false,  // Set processing to false on failure
                errorContent: action.payload,   // Store error message
            };

        default:
            return state;
    }
};







const initialState3 = {
    applications: [],   // Array to hold applications data
    loading: false,     // Indicates loading state
    error: null         // To store any errors
};

export const applicationsReducer = (state = initialState3, action) => {
    switch (action.type) {
        case GET_APPLICATIONS_REQ:
            return {
                ...state,
                loading: true,  // Set loading to true when the request starts
                error: null     // Clear any previous errors
            };

        case GET_APPLICATIONS_SUCCESS:
            return {
                ...state,
                loading: false,         // Set loading to false once request is done
                appli: action.payload.formFilled, // Store the fetched applications data
                error: null             // Clear any errors
            };

        case GET_APPLICATIONS_FAIL:
            return {
                ...state,
                loading: false,  // Set loading to false when there's an error
                error: action.payload // Store the error message
            };

        default:
            return state;
    }
};



export const CapplicationsReducer = (state = initialState3, action) => {
    switch (action.type) {
        case GET_COMPANYFILL_REQ:
            return {
                ...state,
                loading: true,  // Set loading to true when the request starts
                error: null     // Clear any previous errors
            };

        case GET_COMPANYFILL_SUCCESS:
            return {
                ...state,
                loading: false,         // Set loading to false once request is done
                appli: action.payload.companyFill, // Store the fetched applications data
                error: null             // Clear any errors
            };

        case GET_COMPANYFILL_FAIL:
            return {
                ...state,
                loading: false,  // Set loading to false when there's an error
                error: action.payload // Store the error message
            };

        default:
            return state;
    }
};














const initialState4 = {
    appli: [],   // Array to hold applications data
    loading: false,     // Indicates loading state
    error: null         // To store any errors
};

export const luckydrawReducer = (state = initialState4, action) => {
    switch (action.type) {
        case GET_LUCKYDRAW_BY_ID_REQ:
            return {
                ...state,
                loading: true,  // Set loading to true when the request starts
                error: null     // Clear any previous errors
            };

        case GET_LUCKYDRAW_BY_ID_SUCCESS:
            return {
                ...state,
                loading: false,         // Set loading to false once request is done
                appli: action.payload.luckyDraw, // Store the fetched applications data
                error: null             // Clear any errors
            };

        case GET_LUCKYDRAW_BY_ID_FAIL:
            return {
                ...state,
                loading: false,  // Set loading to false when there's an error
                error: action.payload // Store the error message
            };

        default:
            return state;
    }
};



const initialState5 = {
    message: null,   // Array to hold applications data
    processing: false,     // Indicates loading state
    fault: null         // To store any errors
};

export const statusUpdateReducer = (state = initialState5, action) => {
    switch (action.type) {
        case UPDATE_LUCKYDRAW_STATUS_REQ:
            return {
                ...state,
                processing: true,  // Set loading to true when the request starts
                fault: null     // Clear any previous errors
            };

        case UPDATE_LUCKYDRAW_STATUS_SUCCESS:
            return {
                ...state,
                processing: false,         // Set loading to false once request is done
                message: action.payload.message, // Store the fetched applications data
                fault: null             // Clear any errors
            };

        case UPDATE_LUCKYDRAW_STATUS_FAIL:
            return {
                ...state,
                processing: false,  // Set loading to false when there's an error
                fault: action.payload // Store the error message
            };

        default:
            return state;
    }
};



const initialState01 = {
    message: null,   // Array to hold applications data
    processing: false,     // Indicates loading state
    fault: null         // To store any errors
};

export const CstatusUpdateReducer = (state = initialState01, action) => {
    switch (action.type) {
        case UPDATE_COMPANY_FORM_STATUS_REQ:
            return {
                ...state,
                processing: true,  // Set loading to true when the request starts
                fault: null     // Clear any previous errors
            };

        case UPDATE_COMPANY_FORM_STATUS_SUCCESS:
            return {
                ...state,
                processing: false,         // Set loading to false once request is done
                message: action.payload.message, // Store the fetched applications data
                fault: null             // Clear any errors
            };

        case UPDATE_COMPANY_FORM_STATUS_FAIL:
            return {
                ...state,
                processing: false,  // Set loading to false when there's an error
                fault: action.payload // Store the error message
            };

        default:
            return state;
    }
};








const initialState6 = {
    loading: false,
    luckyDraws: [],
    totalLuckyDraws: 0,
    totalPages: 0,
    currentPage: 0,
    error: null,
  };
  
export const getluckyDrawReducer = (state = initialState6, action) => {
    switch (action.type) {
      case GET_ALL_LUCKYDRAW_REQ:
        return {
          ...state,
          loading: true,
          error: null,
        };
        
      case GET_ALL_LUCKYDRAW_SUCCESS:
        return {
          ...state,
          loading: false,
          luckyDraws: action.payload.luckyDraws,   // List of lucky draws fetched
          totalLuckyDraws: action.payload.totalLuckyDraws,   // Total number of lucky draws
          totalPages: action.payload.totalPages,  // Total number of pages based on pagination
          currentPage: action.payload.currentPage, // Current page number
        };
        
      case GET_ALL_LUCKYDRAW_FAIL:
        return {
          ...state,
          loading: false,
          error: action.payload,  // Store the error message in case of failure
        };
  
      default:
        return state;
    }
  };






// Initial State renamed to initialCompanyFillState
const initialCompanyFillState = {
    loading: false,
    companyFills: [],
    totalCompanyFills: 0,
    totalPages: 0,
    currentPage: 0,
    error: null,
};

// Reducer with renamed initial state
export const getCompanyFillsReducer = (state = initialCompanyFillState, action) => {
    switch (action.type) {
        case GET_ALL_COMPANY_FORM_REQ:
            return {
                ...state,
                loading: true,
                error: null,
            };
        
        case GET_ALL_COMPANY_FORM_SUCCESS:
            return {
                ...state,
                loading: false,
                companyFills: action.payload.companyFills,    // List of company fills fetched
                totalCompanyFills: action.payload.totalCompanyFills, // Total number of company fills
                totalPages: action.payload.totalPages,  // Total number of pages based on pagination
                currentPage: action.payload.currentPage, // Current page number
            };

        case GET_ALL_COMPANY_FORM_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload,  // Store the error message in case of failure
            };
        
        default:
            return state;
    }
};



// Initial state for the reducer
const initialState8 = {
    Loading: false,
    Message : null,
    Error: null
};




export const passtoresult = (state = initialState8, action) => {
    switch (action.type) {
        case PUSH_TO_RESULT_REQ:
            return {
                ...state,
                Loading: true,  // Set loading to true when the request starts
                Error: null     // Clear any previous errors
            };

        case PUSH_TO_RESULT_SUCCESS:
            return {
                ...state,
                Loading: false,         // Set loading to false once request is done
                Message: action.payload.message, // Store the fetched applications data
                Error: null             // Clear any errors
            };

        case PUSH_TO_RESULT_FAIL:
            return {
                ...state,
                Loading: false,  // Set loading to false when there's an error
                Error: action.payload // Store the error message
            };

        default:
            return state;
    }
};





// Initial state for the reducer
const initialState9 = {
    Loading: false,
    results : [],
    Error: null
};




export const resultReducer = (state = initialState9, action) => {
    switch (action.type) {
        case GET_HISTORY_REQ:
            return {
                ...state,
                Loading: true,  // Set loading to true when the request starts
                Error: null     // Clear any previous errors
            };

        case GET_HISTORY_SUCCESS:
            return {
                ...state,
                Loading: false,         // Set loading to false once request is done
                results: action.payload.updatedIsAllowDocs, // Store the fetched applications data
                Error: null             // Clear any errors
            };

        case GET_HISTORY_FAIL:
            return {
                ...state,
                Loading: false,  // Set loading to false when there's an error
                Error: action.payload // Store the error message
            };

        default:
            return state;
    }
};



const initialState11 = {
    loading: false,
    luckyDraws: [], // Stores the lucky draws from the API
    message: '', // Store any messages (like wait until the form opens)
    error: '', // Error message if something goes wrong
  };
  
  export const formAndResultsReducer = (state = initialState11, action) => {
    switch (action.type) {
      case GET_RESULT_REQ:
        return {
          ...state,
          loading: true, // Set loading to true while fetching
        };
  
      case GET_RESULT_SUCCESS:
        return {
          ...state,
          loading: false, // Loading finished
          luckyDraws: action.payload.luckyDraws || [], // Store lucky draws or set empty array
          companyForms: action.payload.companyForms || [], // Store lucky draws or set empty array
          message: action.payload.message || '', // Store message if the form is not open yet
        };
  
      case GET_RESULT_FAIL:
        return {
          ...state,
          loading: false, // Loading finished
          error: action.payload, // Store error message from the action payload
        };
  
      default:
        return state;
    }
  };



  const initialState12 = {
    process: false,  // To track if the form is being submitted
    text: null,        // To hold messages for success or failure
    error: null,       // To store any errors that occur
  };
  
  export const faqFormReducer = (state = initialState12, action) => {
    switch (action.type) {
      case FILL_FAQ_FORM_REQ:
        return {
          ...state,
          process: true,        // Set the process flag to true when the request starts
          text: null,  // A text message to show the user
          error: '',            // Clear any previous error
        };
  
      case FILL_FAQ_FORM_SUCCESS:
        return {
          ...state,
          process: false,       // Set process flag to false when submission is complete
          text: action.payload.message, // Success message
          error: null,            // No error in case of success
        };
  
      case FILL_FAQ_FORM_FAIL:
        return {
          ...state,
          process: false,       // Set process flag to false when the submission fails
          text: null ,             // Clear any success text
          error: action.payload.error , // Set error message from the payload
        };
  
      default:
        return state;
    }
  };




  const initialState95 = {
    loading: false,
    companyFill: {},
    error: null
  };
  
  export const companyFillByIdReducer = (state = initialState95, action) => {
    switch (action.type) {
      case GET_COMPANYFILL_BY_ID_REQ:
        return { ...state, loading: true };
  
      case GET_COMPANYFILL_BY_ID_SUCCESS:
        return { ...state, loading: false, companyFill: action.payload };
  
      case GET_COMPANYFILL_BY_ID_FAIL:
        return { ...state, loading: false, error: action.payload };
  
      default:
        return state;
    }
  };
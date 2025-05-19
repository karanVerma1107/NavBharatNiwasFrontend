import { 
    ADD_SITE_REQUEST,
    ADD_SITE_SUCCESS,
    ADD_SITE_FAIL, 
    GET_IMAGES_REQUEST,
    GET_IMAGES_FAIL,
    GET_IMAGES_SUCCESS,
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
    GET_FORM_BY_ID_FAIL,
    GET_SEARCHED_SITE_SUCCESS,
    GET_SEARCHED_SITE_REQ,
    GET_SEARCHED_SITE_FAIL,
    GET_SITE_BY_STATE_CITY_REQ,
    GET_SITE_BY_STATE_CITY_SUCCESS,
    GET_SITE_BY_STATE_CITY_FAIL,
    ADD_BLOG_SUCCESS,
    ADD_BLOG_REQ,
    ADD_BLOG_FAIL,
    GET_BLOG_REQ,
    GET_BLOG_SUCCESS,
    GET_BLOG_FAIL,
    GET_ALL_BLOGS_REQ,
    GET_ALL_BLOGS_SUCCESS,
    GET_ALL_BLOGS_FAIL,
    GET_BLOG_BY_PERMALINK_REQ,
  GET_BLOG_BY_PERMALINK_SUCCESS,
  GET_BLOG_BY_PERMALINK_FAIL,

} from "../Constant/siteConstant";




const initialState2211 = {
  loading: false,
  blogs: [],
  error: null,
};

export const blogByPermalinkReducer = (state = initialState2211, action) => {
  switch (action.type) {
    case GET_BLOG_BY_PERMALINK_REQ:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case GET_BLOG_BY_PERMALINK_SUCCESS:
      return {
        ...state,
        loading: false,
        blogs: action.payload, // Assuming payload is an array of blogs
        error: null,
      };
    case GET_BLOG_BY_PERMALINK_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload, // error message
        blogs: [],
      };
    default:
      return state;
  }
};


export const getAllBlogsReducer = (state = { article: [] }, action) => {
  switch (action.type) {
    case GET_ALL_BLOGS_REQ:
      return { ...state, busy: true };

    case GET_ALL_BLOGS_SUCCESS:
      return {
        busy: false,
        article: action.payload
      };

    case GET_ALL_BLOGS_FAIL:
      return {
        busy: false,
        mistake: action.payload
      };

    default:
      return state;
  }
};

export const addBlogReducer = (state = { blocksData: [] }, action) => {
  switch (action.type) {
    case ADD_BLOG_REQ:
      return { loading: true };

    case ADD_BLOG_SUCCESS:
      return {
        loading: false,
        success: true,
        blog: action.payload.data,
        blocksData: [...state.blocksData, action.payload.data], // Add the new blog to blocksData
      };

    case ADD_BLOG_FAIL:
      return {
        loading: false,
        error: action.payload
      };

    default:
      return state;
  }
};


export const getBlogReducer = (state = { entry: {} }, action) => {
  switch (action.type) {
    case GET_BLOG_REQ:
      return { ...state, processing: true };

    case GET_BLOG_SUCCESS:
      return {
        processing: false,
        entry: action.payload
      };

    case GET_BLOG_FAIL:
      return {
        processing: false,
        problem: action.payload
      };

    default:
      return state;
  }
};

export const siteByStateCityReducer = (state = { fetchedSites: [] }, action) => {
  switch (action.type) {
    case GET_SITE_BY_STATE_CITY_REQ:
      return { isFetching: true, fetchedSites: [] };
    case GET_SITE_BY_STATE_CITY_SUCCESS:
      return { isFetching: false, fetchedSites: action.payload };
    case GET_SITE_BY_STATE_CITY_FAIL:
      return { isFetching: false, fetchError: action.payload };
    default:
      return state;
  }
};


const initialAddSiteState = {
    loading: false,
    site: null,
    error: null,
    message: null,
};

export const AddsiteReducer = (state = initialAddSiteState, action) => {
    switch (action.type) {
        case ADD_SITE_REQUEST:
            return {
                ...state,
                loading: true,
                message: null,
            };
        case ADD_SITE_SUCCESS:
            return {
                ...state,
                loading: false,
                site: action.payload.site,
                message: action.payload.message,
            };
        case ADD_SITE_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload,
                message: null,
            };
        default:
            return state;
    }
};

const initialGetImagesState = {
    loading: false,
    data: [],
    error: null,
};

export const getImagesReducer = (state = initialGetImagesState, action) => {
    switch (action.type) {
        case GET_IMAGES_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case GET_IMAGES_SUCCESS:
            return {
                ...state,
                loading: false,
                data: action.payload.sites,
            };
        case GET_IMAGES_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        default:
            return state;
    }
};

const initialGetOngoingSiteState = {
    loading: false,
    sites: [],
    error: null,
    pages: null,
};

export const getOngoingSiteReducer = (state = initialGetOngoingSiteState, action) => {
    switch (action.type) {
        case GET_ONGOING_SITE_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case GET_ONGOING_SITE_SUCCESS:
            return {
                ...state,
                loading: false,
                sites: action.payload.sites,
                pages: action.payload.pages,
            };
        case GET_ONGOING_SITE_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        default:
            return state;
    }
};

const initialGetUpcomingSiteState = {
    loading: false,
    sites: [],
    error: null,
    pages: null,
};

export const getUpcomingSiteReducer = (state = initialGetUpcomingSiteState, action) => {
    switch (action.type) {
        case GET_UPCOMING_SITE_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case GET_UPCOMING_SITE_SUCCESS:
            return {
                ...state,
                loading: false,
                sites: action.payload.sites,
                pages: action.payload.pages,
            };
        case GET_UPCOMING_SITE_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        default:
            return state;
    }
};

const initialGetTestimonialSiteState = {
    loading: false,
    sites: [],
    error: null,
    pages: null,
};

export const getTestimonialSiteReducer = (state = initialGetTestimonialSiteState, action) => {
    switch (action.type) {
        case GET_TESTIMONIAL_SITE_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case GET_TESTIMONIAL_SITE_SUCCESS:
            return {
                ...state,
                loading: false,
                sites: action.payload.sites,
                pages: action.payload.pages,
            };
        case GET_TESTIMONIAL_SITE_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        default:
            return state;
    }
};




const initialState = {
    site: null,
    loading: false,
    error: null,
  };
  
 export const siteReducer = (state = initialState, action) => {
    switch (action.type) {
      case GET_SITE_BY_ID_REQUEST:
        return {
          ...state,
          loading: true,
          error: null,  // reset error on new request
        };
      case GET_SITE_BY_ID_SUCCESS:
        return {
          ...state,
          loading: false,
          site: action.payload.site,  // store the site data from action payload
        };
      case GET_SITE_BY_ID_FAIL:
        return {
          ...state,
          loading: false,
          error: action.payload,  // store the error from action payload
        };
      default:
        return state;
    }
  };


  

const initialState4 = {
    draw: null,
    loading: false,
    error: null,
  };
  
 export const formAPPReducer = (state = initialState4, action) => {
    switch (action.type) {
      case GET_FORM_BY_ID_REQUEST:
        return {
          ...state,
          loading: true,
          error: null,  // reset error on new request
        };
      case GET_FORM_BY_ID_SUCCESS:
        return {
          ...state,
          loading: false,
          draw: action.payload,  // store the site data from action payload
        };
      case GET_FORM_BY_ID_FAIL:
        return {
          ...state,
          loading: false,
          error: action.payload,  // store the error from action payload
        };
      default:
        return state;
    }
  };


  const initialState0 = {
    isLoading: false, // Changed from loading to isLoading
    sites: [],
    error: null,
  };
  
  export const siteSearchReducer = (state = initialState0, action) => {
    switch (action.type) {
      case GET_SEARCHED_SITE_REQ:
        return {
          ...state,
          isLoading: true,  // Changed from loading to isLoading
          error: null,
        };
  
      case GET_SEARCHED_SITE_SUCCESS:
        return {
          ...state,
          isLoading: false,  // Changed from loading to isLoading
          sites: action.payload,  // Update with the sites fetched
        };
  
      case GET_SEARCHED_SITE_FAIL:
        return {
          ...state,
          isLoading: false,  // Changed from loading to isLoading
          error: action.payload,  // Set error message
        };
  
      default:
        return state;
    }
  };
  
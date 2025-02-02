import {legacy_createStore as createStore, combineReducers, applyMiddleware} from 'redux'
import { thunk }  from 'redux-thunk';
import {composeWithDevTools}from 'redux-devtools-extension'
import { authReducer, userReducer } from './src/Reducers/authReducer';
import { AddsiteReducer, formAPPReducer, getImagesReducer, getOngoingSiteReducer, getTestimonialSiteReducer, getUpcomingSiteReducer, siteReducer, siteSearchReducer } from './src/Reducers/siteReducer';
import { applicationsReducer, CstatusUpdateReducer, faqFormReducer, fillCompanyFormReducer, fillLuckyDrawReducer,  formAndResultsReducer,  formReducer, getcompanyFormReducer, getIsAllowReducer, getluckyDrawReducer, luckydrawReducer, passtoresult, resultReducer, statusUpdateReducer } from './src/Reducers/formreducer';


const rootReducer = combineReducers({
auth:authReducer,
user:userReducer,
addsite: AddsiteReducer,
images: getImagesReducer,
upcoming:getUpcomingSiteReducer,
ongoing:getOngoingSiteReducer,
testimonial:getTestimonialSiteReducer,
makeform: formReducer,
latestisallow: getIsAllowReducer,
filldrawform: fillLuckyDrawReducer,
appli:applicationsReducer,
getsite:siteReducer,
form: formAPPReducer,
getdraw: luckydrawReducer,
updateStatus: statusUpdateReducer,
getalldraws:getluckyDrawReducer,
passResult:passtoresult,
getresult: resultReducer,
result:formAndResultsReducer,
faq: faqFormReducer   ,
search :siteSearchReducer,
companyfill: fillCompanyFormReducer,
getCF:getcompanyFormReducer,
Cupdate: CstatusUpdateReducer
});

// learn what thunk actually do
const middleware = [thunk];

const Store = createStore(
    rootReducer,
    composeWithDevTools(applyMiddleware(...middleware))
);

export default Store;
import {legacy_createStore as createStore, combineReducers, applyMiddleware} from 'redux'
import { thunk }  from 'redux-thunk';
import {composeWithDevTools}from 'redux-devtools-extension'
import { authReducer, userReducer } from './src/Reducers/authReducer';
import { addBlogReducer, AddsiteReducer, formAPPReducer, getAllBlogsReducer, getBlogReducer, getImagesReducer, getOngoingSiteReducer, getTestimonialSiteReducer, getUpcomingSiteReducer, siteByStateCityReducer, siteReducer, siteSearchReducer } from './src/Reducers/siteReducer';
import { allotmentbyIDReducer, allotmentReducer, applicationsReducer, CapplicationsReducer, companyAllotmentReducer, companyFillByIdReducer, CstatusUpdateReducer, faqFormReducer, fillCompanyFormReducer, fillLuckyDrawReducer,  formAndResultsReducer,  formReducer, getCompanyFillsReducer, getcompanyFormReducer, getIsAllowReducer, getluckyDrawReducer, IndiAllotmentReducer, isAllowHandler, isAllowResultsReducer, luckydrawReducer, passtoresult, pushCompanyToResultReducer, resultReducer, searchAllotmentReducer, seeAllFAQsReducer, signatureReducer, statusUpdateReducer } from './src/Reducers/formreducer';


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
faq: faqFormReducer,
search :siteSearchReducer,
companyfill: fillCompanyFormReducer,
getCF:getcompanyFormReducer,
Cupdate: CstatusUpdateReducer,
getallc: getCompanyFillsReducer,
passCtoR:pushCompanyToResultReducer,
getCbyid: companyFillByIdReducer,
getuserC: CapplicationsReducer,
getAllisallow: isAllowHandler,
getIsallRREE:isAllowResultsReducer,
createAllotC: companyAllotmentReducer,
getAllot: allotmentReducer,
allotbyid:allotmentbyIDReducer,
sign:signatureReducer,
createAllotL: IndiAllotmentReducer,
searchAllotments: searchAllotmentReducer,
getFaq: seeAllFAQsReducer,
appsu:siteByStateCityReducer,
getblog:getBlogReducer,
addblog:addBlogReducer,
getallblog: getAllBlogsReducer
});

// learn what thunk actually do
const middleware = [thunk];

const Store = createStore(
    rootReducer,
    composeWithDevTools(applyMiddleware(...middleware))
);

export default Store;
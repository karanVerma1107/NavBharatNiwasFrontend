import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getLatestIsAllow, createCompanyFill } from './Actions/formAction';
import { getSearchedSite } from './Actions/siteActions'; // Import search sites action
import { toast } from 'react-toastify'; // Assuming you're using react-toastify
import './luckydrawform.css';

const CompanyFillForm = () => {
    const { loading, permit, error } = useSelector(state => state.latestisallow);
    const { isProcessing, messageContent, errorContent } = useSelector(state => state.companyfill);
    const dispatch = useDispatch();

    // Form data state initialization
    const [formData, setFormData] = useState({
        companyName: '',
        authorizedSignatory: '',
        gstNumber: '',
        Executive:'',
        panNumber: '',
        companyAddress: '',
        authorizedSignatoryAddress: '',
        paymentPlan: '',
        plotSize: '125 SQY - 150 SQY', // Modified Plot Size
        preference: 'Corner', // Modified Preference
        panPhoto: null,
        passportPhoto: null,
        project: '',
    });

    const [searchQuery, setSearchQuery] = useState('');
    const [charges, setCharges] = useState(null);
    const { sites, isLoading } = useSelector(state => state.search);

    // Handle input field change
    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value,
        });
    };

    // Handle file input change for PAN and Passport photos
    const handleFileChange = (e) => {
        const { name, files } = e.target;
        const file = files[0];

        if (file) {
            // Check if the file is an image
            if (file.type.startsWith('image/')) {
                setFormData({
                    ...formData,
                    [name]: file,
                });
            } else {
                alert('Please select an image file.');
            }
        }
    };


 const allPaymentPlans = [
  "Down Payment Plan",
  "Possession Link Payment Plan",
  "Flexi Payment Plan",
  "Self Funding Plan",
  "Loan Payment Plan"
];

// Inside your component state
const [currentPlans, setCurrentPlans] = useState(['']);


const handlePaymentPlan = (plan) => {
    console.log("Current Plans:", currentPlans);
  if (!Array.isArray(currentPlans)) return "hidden1-option";
  return currentPlans.includes(plan) ? "show-option" : "hidden1-option";
};



    // Handle project change for site suggestions
    const handleProjectChange = (e) => {
        const { value } = e.target;
        setFormData({ ...formData, project: value });
        setSearchQuery(value);

        if (value) {
            dispatch(getSearchedSite(value)); // Call search action with the value
        }
    };

    const handleSiteClick = (siteName, charges, plan) => {
        setFormData({ ...formData, project: siteName });
        setSearchQuery('');
        setCharges(charges);
        setCurrentPlans(plan);
    };

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(createCompanyFill(formData)); // Dispatch the action with form data
    };

    // Show success/error messages from the Redux store
    useEffect(() => {
        if (messageContent) {
            toast.success(messageContent);
        }

        if (errorContent) {
            toast.error(errorContent);
        }
    }, [messageContent, errorContent]);

    return (
        <div className="lucky-draw-form">
            <h1 className="form-heading">
                Company Fill Form {permit && <h2>{permit.formName}</h2>}
            </h1>

            <form onSubmit={handleSubmit} className="form-container">
                {/* Company Name */}
                <div className="form-group">
                    <label htmlFor="companyName" className="label">Company Name</label>
                    <input
                        type="text"
                        id="companyName"
                        name="companyName"
                        value={formData.companyName}
                        onChange={handleChange}
                        className="input-field"
                        required
                    />
                </div>

                {/* Authorized Signatory */}
                <div className="form-group">
                    <label htmlFor="authorizedSignatory" className="label">Authorized Signatory</label>
                    <input
                        type="text"
                        id="authorizedSignatory"
                        name="authorizedSignatory"
                        value={formData.authorizedSignatory}
                        onChange={handleChange}
                        className="input-field"
                        required
                    />
                </div>

                {/* GST Number */}
                <div className="form-group">
                    <label htmlFor="gstNumber" className="label">GST Number</label>
                    <input
                        type="text"
                        id="gstNumber"
                        name="gstNumber"
                        value={formData.gstNumber}
                        onChange={handleChange}
                        className="input-field"
                        required
                    />
                </div>

                {/* PAN Number */}
                <div className="form-group">
                    <label htmlFor="panNumber" className="label">PAN Number</label>
                    <input
                        type="text"
                        id="panNumber"
                        name="panNumber"
                        value={formData.panNumber}
                        onChange={handleChange}
                        className="input-field"
                        required
                    />
                </div>

                {/* Company Address */}
                <div className="form-group">
                    <label htmlFor="companyAddress" className="label">Company Address</label>
                    <input
                        type="text"
                        id="companyAddress"
                        name="companyAddress"
                        value={formData.companyAddress}
                        onChange={handleChange}
                        className="input-field"
                        required
                    />
                </div>

                {/* Authorized Signatory Address */}
                <div className="form-group">
                    <label htmlFor="authorizedSignatoryAddress" className="label">Authorized Signatory Address</label>
                    <input
                        type="text"
                        id="authorizedSignatoryAddress"
                        name="authorizedSignatoryAddress"
                        value={formData.authorizedSignatoryAddress}
                        onChange={handleChange}
                        className="input-field"
                        required
                    />
                </div>

                 <div className="form-group">
                    <label htmlFor="Executive" className="label">Executive</label>
                    <input
                        type="text"
                        id="Executive"
                        name="Executive"
                        value={formData.Executive}
                        onChange={handleChange}
                        className="input-field"
                        required
                    />
                </div>

                {/* Project */}
                <div className="form-group">
                    <label htmlFor="project" className="label">Project</label>
                    <input
                        type="text"
                        id="project"
                        name="project"
                        value={formData.project}
                        onChange={handleProjectChange}
                        className="input-field"
                        required
                    />
                    {sites.length > 0 && searchQuery && (
                        <div className="site-suggestions">
                            {sites.map((site, index) => (
                                <div
                                    key={index}
                                    className="site-item"
                                    onClick={() => handleSiteClick(site.name, site.charges, site.PaymentPlan)}
                                    style={{ color: 'black', cursor: 'pointer' }}
                                >
                                    {site.name}
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Payment Plan Dropdown */}
                <div className="form-group">
                    <label htmlFor="paymentPlan" className="label">Payment Plan</label>
                    <select
                        id="paymentPlan"
                        name="paymentPlan"
                        value={formData.paymentPlan}
                        onChange={handleChange}
                        className="input-field"
                        required
                        style={{ backgroundColor: 'white' }}
                    >
                       {allPaymentPlans.map((plan, idx) => (
      <option
        key={idx}
        value={plan}
        className={handlePaymentPlan(plan)}
      >
        {plan}
      </option>
    ))}
                    </select>
                </div>

                {/* Plot Size Dropdown */}
                <div className="form-group">
                    <label htmlFor="plotSize" className="label">Plot Size</label>
                    <select
                        id="plotSize"
                        name="plotSize"
                        value={formData.plotSize}
                        onChange={handleChange}
                        className="input-field"
                        required
                        style={{ backgroundColor: 'white' }}
                    >   
                        <option value='50 SQY  - 125 SQY'>50 SQY  - 125 SQY</option>
                        <option value="125 SQY - 150 SQY">125 SQY - 150 SQY</option>
                        <option value="150 SQY - 200 SQY">150 SQY - 200 SQY</option>
                        <option value="ABOVE 200 SQY">ABOVE 200 SQY</option>
                    </select>
                </div>

                {/* Preference Dropdown */}
                <div className="form-group">
                    <label htmlFor="preference" className="label">Preference</label>
                    <select
                        id="preference"
                        name="preference"
                        value={formData.preference}
                        onChange={handleChange}
                        className="input-field"
                        required
                        style={{ backgroundColor: 'white' }}
                    >
                        <option value="Corner">Corner</option>
                        <option value="Park Facing">Park Facing</option>
                        <option value="N/A">N/A</option>
                    </select>
                </div>

                {/* PAN Photo Upload */}
                <div className="form-group">
                    <label htmlFor="panPhoto" className="label">PAN Photo</label>
                    <input
                        type="file"
                        id="panPhoto"
                        name="panPhoto"
                        onChange={handleFileChange}
                        className="input-field"
                    />
                </div>

                {/* Passport Photo Upload */}
                <div className="form-group">
                    <label htmlFor="passportPhoto" className="label">Passport Photo</label>
                    <input
                        type="file"
                        id="passportPhoto"
                        name="passportPhoto"
                        onChange={handleFileChange}
                        className="input-field"
                    />
                </div>

                {charges && <p style={{ color: 'black' }}><span>Note: </span>The amount of {charges} is refundable in case of no allotment under this scheme.</p>}

                <div className="form-actions">
                    <button type="submit" className="submit-btn">
                        {isProcessing ? 'Submitting...' : 'Submit'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default CompanyFillForm;

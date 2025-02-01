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
        panNumber: '',
        companyAddress: '',
        authorizedSignatoryAddress: '',
        paymentPlan: 'Down Payment Plan',
        panPhoto: null,
        passportPhoto: null,
        project: '',
    });

    const [searchQuery, setSearchQuery] = useState('');
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

    // Handle project change for site suggestions
    const handleProjectChange = (e) => {
        const { value } = e.target;
        setFormData({ ...formData, project: value });
        setSearchQuery(value);

        if (value) {
            dispatch(getSearchedSite(value)); // Call search action with the value
        }
    };

    const handleSiteClick = (siteName) => {
        setFormData({ ...formData, project: siteName });
        setSearchQuery('');
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
                                    onClick={() => handleSiteClick(site.name)}
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
                        style={{backgroundColor: 'white'}}
                    >
                        <option value="Down Payment Plan">Down Payment Plan</option>
                        <option value="Possession Link Payment Plan">Possession Link Payment Plan</option>
                        <option value="Flexi Payment Plan">Flexi Payment Plan</option>
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

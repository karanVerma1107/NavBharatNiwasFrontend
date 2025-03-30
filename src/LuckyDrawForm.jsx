import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getLatestIsAllow, createDraw } from './Actions/formAction';
import { getSearchedSite } from './Actions/siteActions'; // Import search sites action
import ImageModal from './ImageModal';
import { toast } from 'react-toastify'; // Assuming you're using react-toastify
import './luckydrawform.css';

const LuckyDrawForm = () => {
    const { loading, permit, error } = useSelector(state => state.latestisallow);
    const { isProcessing, messageContent, errorContent } = useSelector(state => state.filldrawform);
    const dispatch = useDispatch();

    const [formData, setFormData] = useState({
        name: '',
        phoneNo: '',
        address: '',
        occupation: '',
        fatherName: '',
        AdhaarNo: '',
        PANno: '',
        DOB: '',               // New field for Date of Birth
        nationality: '',       // New field for nationality
        project: '',           // New field for project
        paymentPlan: 'Down Payment Plan', // New field for Payment Plan
        plotSize: '125 SQY - 150 SQY', // Modified Plot Size
        preference: 'Corner', // Modified Preference
        image: null,
        adhaarPhoto: null,     // New field for Adhaar Photo
        panPhoto: null         // New field for PAN Photo
    });

    const [searchQuery, setSearchQuery] = useState('');
    
    const { sites, isLoading } = useSelector((state) => state.search);
const [charges, setCharges] = useState(null);
    const [modalImage, setModalImage] = useState(null);
    const [adhaarPreview, setAdhaarPreview] = useState(null);
    const [panPreview, setPanPreview] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);

    useEffect(() => {
        dispatch(getLatestIsAllow());
    }, [dispatch]);

    useEffect(() => {
        if (messageContent) {
            toast.success(messageContent);
        }

        if (errorContent) {
            toast.error(errorContent);
        }
    }, [messageContent, errorContent]);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value,
        });
    };

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

                // Preview the image
                const imageUrl = URL.createObjectURL(file);
                setImagePreview(imageUrl); // Update the image preview
            } else {
                alert('Please select an image file.');
            }
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(createDraw(formData));
    };

    const handleProjectChange = (e) => {
        const { value } = e.target;
        setFormData({ ...formData, project: value });
        setSearchQuery(value);
        
        if (value) {
            dispatch(getSearchedSite(value)); // Call search action with the value
        }
    };

    const handleSiteClick = (siteName, charges) => {
        setFormData({ ...formData, project: siteName });
        setSearchQuery('');
        setCharges(charges);
    };

    return (
        <div className="lucky-draw-form">
            <h1 className="form-heading">
                Lucky Draw Form {permit && <h2>{permit.formName}</h2>}
            </h1>

            <form onSubmit={handleSubmit} className="form-container">
                <div className="form-group">
                    <label htmlFor="name" className="label">Name</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="input-field"
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="phoneNo" className="label">Phone Number</label>
                    <input
                        type="number"
                        id="phoneNo"
                        name="phoneNo"
                        value={formData.phoneNo}
                        onChange={handleChange}
                        className="input-field"
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="address" className="label">Address</label>
                    <input
                        type="text"
                        id="address"
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        className="input-field"
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="occupation" className="label">Occupation</label>
                    <input
                        type="text"
                        id="occupation"
                        name="occupation"
                        value={formData.occupation}
                        onChange={handleChange}
                        className="input-field"
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="fatherName" className="label">Father's Name</label>
                    <input
                        type="text"
                        id="fatherName"
                        name="fatherName"
                        value={formData.fatherName}
                        onChange={handleChange}
                        className="input-field"
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="AdhaarNo" className="label">Adhaar Number</label>
                    <input
                        type="number"
                        id="AdhaarNo"
                        name="AdhaarNo"
                        value={formData.AdhaarNo}
                        onChange={handleChange}
                        className="input-field"
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="PANno" className="label">PAN Number</label>
                    <input
                        type="text"
                        id="PANno"
                        name="PANno"
                        value={formData.PANno}
                        onChange={handleChange}
                        className="input-field"
                        required
                    />
                </div>

                {/* New input fields for DOB, Nationality, and Project */}
                <div className="form-group">
                    <label htmlFor="DOB" className="label">Date of Birth</label>
                    <input
                        type="date"
                        id="DOB"
                        name="DOB"
                        value={formData.DOB}
                        onChange={handleChange}
                        className="input-field"
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="nationality" className="label">Nationality</label>
                    <input
                        type="text"
                        id="nationality"
                        name="nationality"
                        value={formData.nationality}
                        onChange={handleChange}
                        className="input-field"
                        required
                    />
                </div>

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
                                    onClick={() => handleSiteClick(site.name , site.charges)}
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
                        <option value="Down Payment Plan">Down Payment Plan</option>
                        <option value="Possession Link Payment Plan">Possession Link Payment Plan</option>
                        <option value="Flexi Payment Plan">Flexi Payment Plan</option>
                    </select>
                </div>

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
        <option value="">Select Plot Size</option>
        <option value='50 SQY  - 125 SQY'>50 SQY  - 125 SQY</option>
        <option value="125 SQY - 150 SQY">125 SQY - 150 SQY</option>
        <option value="150 SQY - 200 SQY">150 SQY - 200 SQY</option>
        <option value="ABOVE 200 SQY">ABOVE 200 SQY</option>
    </select>
</div>

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
        <option value="">Select Preference</option>
        <option value="Corner">Corner</option>
        <option value="Park Facing">Park Facing</option>
        <option value="N/A">N/A</option>
    </select>
</div>

                {/* Adhaar Photo Upload */}
                <div className="form-group">
                    <label htmlFor="adhaarPhoto" className="label">Adhaar Photo</label>
                    <input
                        type="file"
                        id="adhaarPhoto"
                        name="adhaarPhoto"
                        onChange={handleFileChange}
                        className="input-field"
                    />
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

                {/* Image Upload Section */}
                <div className="form-group">
                    <label htmlFor="image" className="label">Upload Profile Image</label>
                    <input
                        type="file"
                        id="image"
                        name="image"
                        onChange={handleFileChange}
                        className="input-field"
                    />
                </div>

                {imagePreview && (
                    <div className="image-preview">
                        <img src={imagePreview} alt="Image Preview" className="image-preview-img" style={{ width: '13vmax', height: '15vmax' }} />
                    </div>
                )}

               {charges && <p style={{ color: 'black' }}><span>Note: </span>The amount of {charges} is refundable in case of no allotment under this scheme.</p>}

                <div className="form-actions">
                    <button type="submit" className="submit-btn">
                        {isProcessing ? 'Submitting...' : 'Submit'}
                    </button>
                </div>
            </form>

            {modalImage && (
                <ImageModal image={modalImage} onClose={() => setModalImage(null)} />
            )}
        </div>
    );
};

export default LuckyDrawForm;

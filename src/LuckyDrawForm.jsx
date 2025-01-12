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
        image: null,
    });

    // Local state to handle the input value
    const [searchQuery, setSearchQuery] = useState('');
    
    // Destructure sites and isLoading from Redux state
    const { sites, isLoading } = useSelector((state) => state.search);

    const [modalImage, setModalImage] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);

    useEffect(() => {
        dispatch(getLatestIsAllow());
    }, [dispatch]);

    useEffect(() => {
        // Show success toast when messageContent is updated
        if (messageContent) {
            toast.success(messageContent);
        }

        // Show error toast when errorContent is updated
        if (errorContent) {
            toast.error(errorContent);
        }
    }, [messageContent, errorContent]);

    // Function to handle form data change
    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value,
        });
    };

    // Handle file change for image input
    const handleFileChange = (e) => {
        const file = e.target.files[0]; // Only get the first file
        if (file) {
            // Check if the file is an image
            if (file.type.startsWith('image/')) {
                setFormData({
                    ...formData,
                    image: file,
                });

                // Preview the image
                const imageUrl = URL.createObjectURL(file); // Create a temporary URL for the selected image
                setImagePreview(imageUrl); // Update the image preview
            } else {
                alert('Please select an image file.');
            }
        }
    };

    // Function to handle submit form
    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(createDraw(formData));
    };

    // Function to handle the search query change in the 'project' field
    const handleProjectChange = (e) => {
        const { value } = e.target;
        setFormData({ ...formData, project: value });
        setSearchQuery(value);
        
        // Trigger site search if the project input is not empty
        if (value) {
            dispatch(getSearchedSite(value)); // Call search action with the value
        }
    };

    // Function to handle selecting a site from the list
    const handleSiteClick = (siteName) => {
        setFormData({ ...formData, project: siteName });
        setSearchQuery(''); // Clear search query once a site is selected
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
                        onChange={handleProjectChange} // Use the new handleChange function
                        className="input-field"
                        required
                    />
                    {/* Display matching sites below the project input */}
                    {sites.length > 0 && searchQuery && (
                        <div className="site-suggestions">
                            {sites.map((site, index) => (
                                <div
                                    key={index}
                                    className="site-item"
                                    onClick={() => handleSiteClick(site.name)} // Fill the input when clicked
                                    style={{ color: 'black', cursor: 'pointer' }}
                                >
                                    {site.name}
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Image upload section */}
                <div className="form-group">
                    <label htmlFor="image" className="label">Upload Image</label>
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

                <div className="form-actions">
                    {/* Button text changes based on isProcessing state */}
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

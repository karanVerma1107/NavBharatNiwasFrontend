import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCDrawbyId, updateCDrawStatus } from './Actions/formAction'; // Adjust action import as necessary
import { toast } from 'react-toastify';
import './SearchDraw.css';
import ImageShowFull from './ImageShowFull';

const SearchCompanyFill = () => {
  const [id, setId] = useState('');
  const { error, loading, companyFill } = useSelector(state => state.getCF);  // Update state selector
  const { message, fault, processing } = useSelector(state => state.Cupdate); // Extract message, fault, and processing
  const dispatch = useDispatch();

  // State for storing image to display in the modal
  const [modalImage, setModalImage] = useState(null);

  // Function to open modal with the selected image
  const openModal = (image) => {
    setModalImage(image);
  };

  // Function to close the modal
  const closeModal = () => {
    setModalImage(null);
  };

  const handleSearch = () => {
    if (id) {
      dispatch(getCDrawbyId(id));  // Dispatch action to fetch company form by ID
    }
  };

  // Handle Approve or Reject actions
  const handleApprove = () => {
    if (companyFill && companyFill._id) {
      dispatch(updateCDrawStatus(companyFill._id, 'approve'));
    }
  };

  const handleReject = () => {
    if (companyFill && companyFill._id) {
      dispatch(updateCDrawStatus(companyFill._id, 'reject'));
    }
  };

  // UseEffect to trigger toast on success or error
  useEffect(() => {
    if (message) {
      toast.success(message);  // Show success message toast
    }

    if (fault) {
      toast.error(fault);  // Show error message toast
    }
  }, [message, fault]);

  return (
    <div className="search-container">
      <h2 className="heading">Find Company Form by ID</h2>
      <div className="input-container">
        <input
          type="text"
          placeholder="Enter ID"
          value={id}
          onChange={(e) => setId(e.target.value)}
          className="search-input"
        />
        <button
          onClick={handleSearch}
          className={`find-button ${loading ? 'loading' : ''}`}
          disabled={loading}
        >
          {loading ? 'Finding...' : 'Find'}
        </button>
      </div>
      {error && <div className="error-message">{error}</div>}
      {companyFill && (
        <div className="application-details">
          {/* Display company form details */}
          <p><strong>Company Name:</strong> {companyFill.companyName}</p>
          <p><strong>Authorized Signatory:</strong> {companyFill.authorizedSignatory}</p>
          <p><strong>GST Number:</strong> {companyFill.gstNumber}</p>
          <p><strong>PAN Number:</strong> {companyFill.panNumber}</p>
          <p><strong>Company Address:</strong> {companyFill.companyAddress}</p>
          <p><strong>Authorized Signatory Address:</strong> {companyFill.authorizedSignatoryAddress}</p>
          <p><strong>Project:</strong> {companyFill.project}</p>
          <p><strong>Status:</strong> {companyFill.status}</p>
          <p><strong>Payment Plan:</strong> {companyFill.paymentPlan}</p>
          <p><strong>Allotment:</strong> {companyFill.allotment}</p>

          {/* Display PAN Photo */}
          {companyFill.panPhoto && (
            <div className="photo-container">
              <p><strong>PAN Photo:</strong></p>
              <img
                src={companyFill.panPhoto} 
                alt="PAN"
                style={{ width: '17vmax', height: '15vmax', objectFit: 'cover' }}
                onClick={() => openModal(companyFill.panPhoto)}  // Open modal on image click
              />
            </div>
          )}

          {/* Approve and Reject buttons appear for Pending or Approved status */}
          {['pending', 'approved'].includes(companyFill.status) && (
            <div className="action-buttons">
              <button 
                onClick={handleApprove} 
                className="approve-button"
                disabled={processing}  // Disable if processing
              >
                {processing ? 'Approving...' : 'Approve'}
              </button>
              <button 
                onClick={handleReject} 
                className="reject-button"
                disabled={processing}  // Disable if processing
              >
                {processing ? 'Rejecting...' : 'Reject'}
              </button>
            </div>
          )}
          
          {/* Display "Processing..." text below the button if processing is true */}
          {processing && <p className="processing-text">Processing...</p>}
        </div>
      )}

      {/* Conditionally render the modal if modalImage exists */}
      {modalImage && <ImageShowFull image={modalImage} onClose={closeModal} />}
    </div>
  );
};

export default SearchCompanyFill;

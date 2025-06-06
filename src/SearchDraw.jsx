import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getDrawbyId, updateLuckyDrawStatus } from './Actions/formAction'; // Make sure the action is imported
import { toast } from 'react-toastify';
import './SearchDraw.css';
import ImageShowFull from './ImageShowFull';

const SearchDraw = () => {
  const [id, setId] = useState('');
  const { error, loading, appli } = useSelector(state => state.getdraw);
  const { message, fault, processing } = useSelector(state => state.updateStatus); // Extract message, fault, and processing
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
      dispatch(getDrawbyId(id));
    }
  };

  // Handle Approve or Reject actions
  const handleApprove = () => {
    if (appli && appli._id) {
      dispatch(updateLuckyDrawStatus(appli._id, 'approve'));
    }
  };

  const handleReject = () => {
    if (appli && appli._id) {
      dispatch(updateLuckyDrawStatus(appli._id, 'reject'));
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
      <h2 className="heading">Find LuckyDraw by ID</h2>
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
      {appli && (
        <div className="application-details">
          {/* You can display the found lucky draw details here */}
          <p>Ticket ID: {appli._id}</p>
          <p>Name: {appli.name}</p>
          <p>Phone: {appli.phoneNo}</p>
          {/* Add more fields based on the structure of appli */}
          <p><strong>Status:</strong> {appli.status}</p>

          {/* Display PAN and Aadhaar Photos */}
          {appli.adhaarPhoto && (
            <div className="photo-container">
              <p><strong>Aadhaar Photo:</strong></p>
              <img
                src={appli.adhaarPhoto} 
                alt="Aadhaar" 
                style={{ width: '17vmax', height: '15vmax', objectFit: 'cover' }}
                onClick={() => openModal(appli.adhaarPhoto)}  // Open modal on image click
              />
            </div>
          )}

          {appli.panPhoto && (
            <div className="photo-container">
              <p><strong>PAN Photo:</strong></p>
              <img
                src={appli.panPhoto} 
                alt="PAN" 
                style={{ width: '17vmax', height: '15vmax', objectFit: 'cover' }}
                onClick={() => openModal(appli.panPhoto)}  // Open modal on image click
              />
            </div>
          )}

          {/* Approve and Reject buttons appear for pending or approved status */}
          {['pending', 'approved'].includes(appli.status) && (
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

export default SearchDraw;

import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCDraws } from './Actions/formAction';
import './Findalldraw.css'; // Import the CSS file for styling
import ImageShowFull from './ImageShowFull';
import { passCToresult, updateCDrawStatus } from './Actions/formAction';
import { toast } from 'react-toastify';

const FindCdraws = () => {
    const dispatch = useDispatch();

    // Set initial page number to 1
    const [currentPage, setCurrentPage] = useState(1);

    const { loading, error, companyFills, totalPages } = useSelector(state => state.getallc);
    const { Loading, message, Error } = useSelector(state => state.passCtoR);

    // For the modal functionality
    const [modalImage, setModalImage] = useState(null);

    // Open modal to show the image
    const openModal = (image) => {
        setModalImage(image);
    };

    // Close the modal
    const closeModal = () => {
        setModalImage(null);
    };

    // Handle page change logic
    const handlePageChange = (page) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
        }
    };

    const handleReject = (id) => {
        console.log('Reject triggered');
        dispatch(updateCDrawStatus(id, 'reject')); // Pass the ID and 'reject' status

        // After a delay of 2 seconds (2000 milliseconds), reload the page
        setTimeout(() => {
            window.location.reload(); // This will reload the current page
        }, 2000);
    };

    // For handling the allot value input
    const [allot, setAllot] = useState(''); // State to store the allot value

    const handleAllotChange = (e) => {
        setAllot(e.target.value); // Update allot value on input change
    };

    // Handle the pass to result action
    const handlePassToResult = (companyId, allot) => {
        console.log('Pass to result triggered');
        dispatch(passCToresult(companyId, allot)); // Pass both companyId and allot to the action
    };

    // Display toast notifications when Message or Error changes
    useEffect(() => {
        if (message) {
            toast.success(message); // Show success message as toast
        }
        if (Error) {
            toast.error(Error); // Show error message as toast
        }
    }, [message, Error]);

    // Fetch CompanyFills when the component mounts or when the page changes
    useEffect(() => {
        dispatch(getCDraws(currentPage));
    }, [dispatch, currentPage]);

    return (
        <div className="findalldraw-container">
            <h2 className="heading">Get All Company Fills</h2>

            {/* Display loading spinner or error message */}
            {loading && <p className="loading-text">Loading...</p>}
            {error && <p className="error-text">{error}</p>}

            <div className="lucky-draws-wrapper">
                {companyFills.map((companyFill) => (
                    <div key={companyFill._id} className="lucky-draw-item">
                        
                        {/* Display Passport Photo next to Company Name */}
                        {companyFill.passportPhoto && (
                            <img 
                                src={companyFill.passportPhoto} 
                                alt="Passport" 
                                className="lucky-draw-img"
                                onClick={() => openModal(companyFill.passportPhoto)} // Open modal on image click
                            />
                        )}
                        <h3 className="lucky-draw-name">{companyFill.companyName}</h3>
                        <p className="lucky-draw-info">Authorized Signatory: {companyFill.authorizedSignatory}</p>
                        <p className="lucky-draw-info">Company Address: {companyFill.companyAddress}</p>

                        {/* Input field for allot */}
                        <input
                            type="text"
                            value={allot}
                            onChange={handleAllotChange}
                            placeholder="Enter allot"
                            className="allot-input"
                            style={{
                                width: '12vmax',
                                height: '2.5vmax',
                                fontSize: '1.5vmax',
                            }}
                        />

                        {/* Pass to Result button */}
                        <button
                            className="pass-to-result-btn"
                            onClick={(e) => {
                                e.stopPropagation(); // Prevent triggering the image click action
                                handlePassToResult(companyFill._id, allot); // Pass both id and allot value
                            }}
                        >
                            Pass to Result
                        </button>

                        {/* Reject button */}
                        <button
                            className="reject-btn"
                            onClick={(e) => {
                                e.stopPropagation(); // Prevent triggering other actions
                                handleReject(companyFill._id); // Pass the id and 'reject' status
                            }}
                            style={{
                                width: '10vmax',
                                height: '3vmax',
                                fontSize: '1.5vmax',
                                backgroundColor: '#FF5733', // Red for reject
                                color: '#fff',
                                border: 'none',
                                borderRadius: '8px',
                                cursor: 'pointer',
                                marginBottom: '1vmax',
                            }}
                        >
                            Reject
                        </button>
                    </div>
                ))}
            </div>

            {/* Pagination Controls */}
            <div className="pagination-controls">
                <button
                    className="pagination-btn"
                    disabled={currentPage === 1}
                    onClick={() => handlePageChange(currentPage - 1)}
                >
                    Previous
                </button>
                <span className="pagination-text">
                    Page {currentPage} of {totalPages}
                </span>
                <button
                    className="pagination-btn"
                    disabled={currentPage === totalPages}
                    onClick={() => handlePageChange(currentPage + 1)}
                >
                    Next
                </button>
            </div>

            {/* Image Modal with ImageShowFull component */}
            {modalImage && (
                <ImageShowFull image={modalImage} onClose={closeModal} />
            )}
        </div>
    );
};

export default FindCdraws;

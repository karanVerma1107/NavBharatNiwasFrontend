import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getLuckyDraws } from './Actions/formAction';
import './Findalldraw.css'; // Import the CSS file for styling
import ImageShowFull from './imageShowFull';
import { passToresult } from './Actions/formAction';
import { toast } from 'react-toastify';
import { updateLuckyDrawStatus } from './Actions/formAction';

const Findalldraw = () => {
    const dispatch = useDispatch();
    
    // Set initial page number to 1
    const [currentPage, setCurrentPage] = useState(1);

    const { loading, error, luckyDraws, totalPages } = useSelector(state => state.getalldraws);

    const {Loading, Message, Error} = useSelector(state=>state.passResult);

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
        // If the page is within the valid range, update the current page
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
        }
    };

    // For handling the allot value input
    const [allot, setAllot] = useState(''); // State to store the allot value

    const handleAllotChange = (e) => {
        setAllot(e.target.value); // Update allot value on input change
    };

    const handlePassToResult = (id, allot) => {
        console.log('Pass to result triggered');
        console.log('LuckyDraw ID:', id);
        console.log('Allot:', allot);
        dispatch(passToresult(id, allot)); // Pass both ID and allot to the action
    };

    const goto = (id) => {
        window.open(`/draw/${id}`, '_blank');
    };


    const handleReject = (id) => {
        console.log('Reject triggered');
        dispatch(updateLuckyDrawStatus(id, 'reject')); // Pass the ID and 'reject' status
    };



    // Display toast notifications when Message or Error changes
    useEffect(() => {
        if (Message) {
            toast.success(Message); // Show success message as toast
        }
        if (Error) {
            toast.error(Error); // Show error message as toast
        }
    }, [Message, Error]);

    // Fetch Lucky Draws when the component mounts or when the page changes
    useEffect(() => {
        dispatch(getLuckyDraws(currentPage));
    }, [dispatch, currentPage]);

    return (
        <div className="findalldraw-container">
            <h2 className="heading">Get All Lucky Draw Forms</h2>

            {/* Display loading spinner or error message */}
            {loading && <p className="loading-text">Loading...</p>}
            {error && <p className="error-text">{error}</p>}

            <div className="lucky-draws-wrapper">
                {luckyDraws.map((luckyDraw) => (
                    <div key={luckyDraw._id} className="lucky-draw-item" >
                        <img
                            src={luckyDraw.image}
                            alt="Lucky Draw"
                            className="lucky-draw-img"
                            onClick={() => openModal(luckyDraw.image)} // Open modal on image click
                        />
                        <h3 className="lucky-draw-name"  onClick={() => { goto(luckyDraw._id) }}>{luckyDraw.name}</h3>
                        <p className="lucky-draw-info">Father's Name: {luckyDraw.fatherName}</p>
                        <p className="lucky-draw-info">Address: {luckyDraw.address}</p>

                        {/* Input field for allot */}
                        <input
                            type="text"
                            value={allot}
                            onChange={handleAllotChange}
                            placeholder="Enter allot"
                            className="allot-input"
                            style={{
                                width: '12vx',
                                height: '2.5x',
                                fontSize: '1.5vmax',

                            }}
                        />

                        {/* Pass to Result button */}
                        <button
                            className="pass-to-result-btn"
                            onClick={(e) => {
                                e.stopPropagation(); // Prevent triggering the image click action
                                handlePassToResult(luckyDraw._id, allot); // Pass both id and allot value
                            }}
                        >
                            Pass to Result
                        </button>


                        <button
                            className="reject-btn"
                            onClick={(e) => {
                                e.stopPropagation(); // Prevent triggering the image click action
                                handleReject(luckyDraw._id); // Pass the id and 'reject' status
                            }}
                            style={{
                                width: '5vmax',
                                height: '2.5vmax',
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

export default Findalldraw;

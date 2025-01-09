import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getLuckyDraws } from './Actions/formAction';
import './Findalldraw.css'; // Import the CSS file for styling
import ImageShowFull from './imageShowFull';
import { passToresult } from './Actions/formAction';
import { toast } from 'react-toastify';

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


    const handlePassToResult = (id) => {
        dispatch(passToresult(id));
    };

    const goto = (id)=>{
        window.open(`/draw/${id}`, '_blank');
      }




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
                    <div key={luckyDraw._id} className="lucky-draw-item"  onClick={()=>{goto(luckyDraw._id)}} >
                        <img
                            src={luckyDraw.image}
                            alt="Lucky Draw"
                            className="lucky-draw-img"
                            onClick={() => openModal(luckyDraw.image)} // Open modal on image click
                        />
                        <h3 className="lucky-draw-name">{luckyDraw.name}</h3>
                        <p className="lucky-draw-info">Father's Name: {luckyDraw.fatherName}</p>
                        <p className="lucky-draw-info">Address: {luckyDraw.address}</p>

                        <button
                            className="pass-to-result-btn"
                            onClick={(e) => {
                                e.stopPropagation(); // Prevent triggering the image click action
                                handlePassToResult(luckyDraw._id);
                            }}
                        >
                            Pass to Result
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

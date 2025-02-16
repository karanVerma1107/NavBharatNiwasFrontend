import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCDraws, passCToresult, updateCDrawStatus } from './Actions/formAction';
import './Findalldraw.css'; // Import the CSS file for styling
import ImageShowFull from './ImageShowFull';
import { toast } from 'react-toastify';

const FindCdraws = () => {
    const dispatch = useDispatch();

    const [currentPage, setCurrentPage] = useState(1);
    const { loading, error, companyFills, totalPages } = useSelector(state => state.getallc);
    const { Loading, message, Error } = useSelector(state => state.passCtoR);

    const [modalImage, setModalImage] = useState(null);
    const [allot, setAllot] = useState('');
    const [gift, setGift] = useState('');

    const openModal = (image) => setModalImage(image);
    const closeModal = () => setModalImage(null);
    const handlePageChange = (page) => {
        if (page >= 1 && page <= totalPages) setCurrentPage(page);
    };

    const handleReject = (id) => {
        console.log('Reject triggered');
        dispatch(updateCDrawStatus(id, 'reject'));

        setTimeout(() => {
            window.location.reload();
        }, 2000);
    };

    const handleAllotChange = (e) => setAllot(e.target.value);
    const handleGiftChange = (e) => setGift(e.target.value);

    const handlePassToResult = (companyId, allot, gift) => {
        console.log('Pass to result triggered');
        dispatch(passCToresult(companyId, allot, gift));



        setTimeout(() => {
            window.location.reload();
        }, 2000);
    };

    useEffect(() => {
        if (message) toast.success(message);
        if (Error) toast.error(Error);
    }, [message, Error]);

    useEffect(() => {
        dispatch(getCDraws(currentPage));
    }, [dispatch, currentPage]);

    return (
        <div className="findalldraw-container">
            <h2 className="heading">Get All Company Fills</h2>

            {loading && <p className="loading-text">Loading...</p>}
            {error && <p className="error-text">{error}</p>}

            <div className="lucky-draws-wrapper">
                {companyFills.map((companyFill) => {
                    const isAllotFilled = !!companyFill.allotment;
                    const isGiftFilled = !!companyFill.gift;
                    const disableInputs = isAllotFilled && isGiftFilled;
                    const disableButtons = isAllotFilled && isGiftFilled;

                    return (
                        <div key={companyFill._id} className="lucky-draw-item">
                            {companyFill.passportPhoto && (
                                <img
                                    src={companyFill.passportPhoto}
                                    alt="Passport"
                                    className="lucky-draw-img"
                                    onClick={() => openModal(companyFill.passportPhoto)}
                                />
                            )}
                            <h3 className="lucky-draw-name">{companyFill.companyName}</h3>
                            <p className="lucky-draw-info">Authorized Signatory: {companyFill.authorizedSignatory}</p>
                            <p className="lucky-draw-info">Company Address: {companyFill.companyAddress}</p>

                            {/* Input field for Allot */}
                            <input
                                type="text"
                                value={isAllotFilled ? companyFill.allotment : allot}
                                onChange={handleAllotChange}
                                placeholder="Enter allot"
                                className="allot-input"
                                disabled={isAllotFilled}
                                style={{ cursor: isAllotFilled ? 'not-allowed' : 'text' }}
                            />

                            {/* Input field for Gift */}
                            <input
                                type="text"
                                value={isGiftFilled ? companyFill.gift : gift}
                                onChange={handleGiftChange}
                                placeholder="Enter gift"
                                className="allot-input"
                                disabled={isGiftFilled}
                                style={{ cursor: isGiftFilled ? 'not-allowed' : 'text' }}
                            />

                            {/* Pass to Result button */}
                            <button
                                className="pass-to-result-btn"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    handlePassToResult(companyFill._id, allot, gift);
                                }}
                                disabled={disableButtons}
                                style={{ cursor: disableButtons ? 'not-allowed' : 'pointer' }}
                            >
                                Pass to Result
                            </button>

                            {/* Reject button */}
                            <button
                                className="pass-to-result-btn"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    handleReject(companyFill._id);
                                }}
                                disabled={disableButtons}
                                style={{
                                    backgroundColor: '#FF5733',
                                    color: '#fff',
                                    border: 'none',
                                    borderRadius: '8px',
                                    cursor: disableButtons ? 'not-allowed' : 'pointer',
                                    marginBottom: '1vmax',
                                }}
                            >
                                Reject
                            </button>
                        </div>
                    );
                })}
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

            {modalImage && <ImageShowFull image={modalImage} onClose={closeModal} />}
        </div>
    );
};

export default FindCdraws;

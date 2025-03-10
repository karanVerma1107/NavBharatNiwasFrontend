import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getLuckyDraws, passToresult, updateLuckyDrawStatus } from './Actions/formAction';
import './Findalldraw.css'; // Import the CSS file for styling
import ImageShowFull from './ImageShowFull';
import { toast } from 'react-toastify';

const Findalldraw = () => {
    const dispatch = useDispatch();
    
    const [currentPage, setCurrentPage] = useState(1);
    const { loading, error, luckyDraws, totalPages } = useSelector(state => state.getalldraws);
    const { Loading, Message, Error } = useSelector(state => state.passResult);

    const [modalImage, setModalImage] = useState(null);

    const [allot, setAllot] = useState('');
    const [gift, setGift] = useState('');

    const handleAllotChange = (e) => setAllot(e.target.value);
    const handleGiftChange = (e) => setGift(e.target.value);

    const handlePassToResult = (id) => {
        console.log('Pass to result triggered');
        console.log('LuckyDraw ID:', id);
        console.log('Allot:', allot);
        console.log('Gift:', gift);
        dispatch(passToresult(id, allot, gift)); // Passing allot and gift


       
    };

    const handleReject = (id) => {
        console.log('Reject triggered');
        dispatch(updateLuckyDrawStatus(id, 'reject'));

        setTimeout(() => {
            window.location.reload();
        }, 2000);
    };

    useEffect(() => {
        if (Message) toast.success(Message);
        if (Error) toast.error(Error);
    }, [Message, Error]);

    useEffect(() => {
        dispatch(getLuckyDraws(currentPage));
    }, [dispatch, currentPage]);

    return (
        <div className="findalldraw-container">
            <h2 className="heading">Get All Lucky Draw Forms</h2>

            {loading && <p className="loading-text">Loading...</p>}
            {error && <p className="error-text">{error}</p>}

            <div className="lucky-draws-wrapper">
                {luckyDraws.map((luckyDraw) => {
                    const isFilled = luckyDraw.allotment && luckyDraw.gift; // Check if both fields are filled

                    return (
                        <div key={luckyDraw._id} className="lucky-draw-item">
                            <img
                                src={luckyDraw.image}
                                alt="Lucky Draw"
                                className="lucky-draw-img"
                                onClick={() => setModalImage(luckyDraw.image)}
                            />
                            <h3 className="lucky-draw-name" onClick={() => window.open(`/draw/${luckyDraw._id}`, '_blank')}>
                                {luckyDraw.name}
                            </h3>
                            <p className="lucky-draw-info">Father's Name: {luckyDraw.fatherName}</p>
                            <p className="lucky-draw-info">Address: {luckyDraw.address}</p>

                            {/* Allotment Input */}
                            <input
                                type="text"
                                value={luckyDraw.allotment || allot}
                                onChange={handleAllotChange}
                                placeholder="Enter allot"
                                className="allot-input"
                                readOnly={isFilled} // Disable editing if already filled
                            />

                            {/* Gift Input */}
                            <input
                                type="text"
                                value={luckyDraw.gift || gift}
                                onChange={handleGiftChange}
                                placeholder="Enter gift"
                                className="allot-input"
                                readOnly={isFilled} // Disable editing if already filled
                            />

<button 
    className="pass-to-result-btn" 
    onClick={() => handlePassToResult(luckyDraw._id)} 
    disabled={!!luckyDraw.allotment && !!luckyDraw.gift} 
    style={{ cursor: !!luckyDraw.allotment && !!luckyDraw.gift ? 'not-allowed' : 'pointer' }}
>
    Pass to Result
</button>

<button 
    className="pass-to-result-btn" 
    onClick={() => handleReject(luckyDraw._id)} 
    style={{ 
        backgroundColor: 'red',
        cursor: !!luckyDraw.allotment && !!luckyDraw.gift ? 'not-allowed' : 'pointer'
    }}
    disabled={!!luckyDraw.allotment && !!luckyDraw.gift}
>
    Reject
</button>

                        </div>
                    );
                })}
            </div>

            {/* Pagination Controls */}
            <div className="pagination-controls">
                <button className="pagination-btn" disabled={currentPage === 1} onClick={() => setCurrentPage(currentPage - 1)}>
                    Previous
                </button>
                <span className="pagination-text">Page {currentPage} of {totalPages}</span>
                <button className="pagination-btn" disabled={currentPage === totalPages} onClick={() => setCurrentPage(currentPage + 1)}>
                    Next
                </button>
            </div>

            {modalImage && <ImageShowFull image={modalImage} onClose={() => setModalImage(null)} />}
        </div>
    );
};

export default Findalldraw;

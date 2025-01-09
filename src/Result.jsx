import React, { useEffect } from 'react';
import { result } from './Actions/formAction';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import './result.css'

const Result = () => {
  const { formId } = useParams();
  const { loading, luckyDraws, error, message } = useSelector((state) => state.result);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(result(formId));
  }, [dispatch, formId]);

  const goto = (id) => {
    // Implement your navigation logic here (e.g., history.push or useNavigate)
    console.log('Navigate to Lucky Draw details for ID:', id);
  };

  const openModal = (image) => {
    // Implement your logic for opening a modal with the lucky draw image
    console.log('Open modal with image:', image);
  };

  const handlePassToResult = (id) => {
    // Handle passing to the result (you can implement further logic here)
    console.log('Pass to result for Lucky Draw ID:', id);
  };

  return (
    <div className="result-container">
      {loading && <div className="loading">Loading...</div>}
      {error && <div className="error-message">Error: {error}</div>}
      {message && <div className="info-message">{message}</div>}

      {luckyDraws && luckyDraws.length > 0 ? (
        <div className="lucky-draws-grid">
          {luckyDraws.map((luckyDraw) => (
            <div key={luckyDraw._id} className="lucky-draw-card" onClick={() => goto(luckyDraw._id)}>
              <img
                src={luckyDraw.image}
                alt="Lucky Draw"
                className="lucky-draw-image"
                onClick={() => openModal(luckyDraw.image)} // Open modal on image click
              />
              <div className="lucky-draw-details">
                <h3 className="lucky-draw-name">{luckyDraw.name}</h3>
                <p className="lucky-draw-info">Father's Name: {luckyDraw.fatherName}</p>
                <p className="lucky-draw-info">ID: {luckyDraw._id}</p>
              </div>

            </div>
          ))}
        </div>
      ) : (
        !message && <div className="no-results">No lucky draw results available.</div>
      )}
    </div>
  );
};

export default Result;

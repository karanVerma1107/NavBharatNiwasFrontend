import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getallAllotment } from "./Actions/formAction";
import { AiOutlineClose } from "react-icons/ai"; // Importing Close Icon
import "./GetAllotments.css"; // Importing CSS

const GetAllotments = ({ closeAllotments }) => {
  const dispatch = useDispatch();
  const { loading, allotments, error } = useSelector(state => state.getAllot);

  useEffect(() => {
    dispatch(getallAllotment());
  }, [dispatch]);

  return (
    <div className="overlay">
      <div className="allotments-container">
        <button className="close-btn" onClick={closeAllotments}>
          <AiOutlineClose size={20} />
        </button>
        <h2 style={{color:'white', fontSize:'1.5vmax'}}>Allotments</h2>
        {loading ? (
          <p className="loading">Loading...</p>
        ) : error ? (
          <p className="error">Error: {error}</p>
        ) : (
          <div className="allotments-list">
            {allotments && allotments.length > 0 ? (
              allotments.map((allotment, index) => (
                <div key={index} className="allotment-item">
                  <p><a href={`/Allotment/${allotment._id}`} target="_blank" style={{color:'white'}}>{allotment.uniqueId}</a></p>
                </div>
              ))
            ) : (
              <p className="empty">No allotments found.</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default GetAllotments;

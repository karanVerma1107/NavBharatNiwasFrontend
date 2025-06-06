import React, { useEffect } from 'react';
import './applications.css';  // Import the custom CSS file for styling
import { getLatestIsAppli } from './Actions/formAction';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

const Applications = ({ closeApp }) => {
  const dispatch = useDispatch();
  const { appli, loading, error } = useSelector(state => state.appli);

  useEffect(() => {
    dispatch(getLatestIsAppli());
  }, [dispatch]);

  return (
    <div className="applications-container">
      <button onClick={closeApp} className="close-button">X</button>
      <h2 className="applications-heading">Applications</h2>
      
      <div className="applications-content">
        {loading && <p>Loading...</p>}
        {error && <p>Error: {error}</p>}
        
        {appli && appli.length > 0 ? (
          <div className="applications-list">
            {appli.map((app) => (
              <div key={app._id} className="application-item"  style={{cursor:'pointer'}}>
                <p><strong>Ticket:</strong> {app._id}</p>
                <p><strong>Opening Date:</strong> {new Date(app.openingDate).toLocaleDateString()}</p>
                <a
                  href={`/draw/${app._id}`} 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="view-portfolio-link"
                >
                  View Ticket
                </a>
              </div>
            ))}
          </div>
        ) : (
          <p>No applications available.</p>
        )}
      </div>
    </div>
  );
};

export default Applications;

import React, { useEffect } from 'react';
import './applications.css';  // Import the custom CSS file for styling
import { getLatestCAppli } from './Actions/formAction';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';


const Companyappli = ({ closeApp }) => {
  const dispatch = useDispatch();
  const { appli, loading, error } = useSelector(state => state.getuserC);

  useEffect(() => {
    dispatch(getLatestCAppli());
  }, [dispatch]);

  return (
    <div className="applications-container">
      <button onClick={closeApp} className="close-button">X</button>
      <h2 className="applications-heading">Company Fill Applications</h2>
      
      <div className="applications-content">
        {loading && <p>Loading...</p>}
        {error && <p>Error: {error}</p>}
        
        {appli && appli.length > 0 ? (
          <div className="applications-list">
            {appli.map((app) => (
              <div key={app._id} className="application-item" style={{ cursor: 'pointer' }}>
                <p><strong>Company Name:</strong> {app.companyName}</p>
                <p><strong>Status:</strong> {app.status}</p>
                <p><strong>Created At:</strong> {new Date(app.createdAt).toLocaleDateString()}</p>
                <a
                  href={`/Cdraw/${app._id}`} 
                  className="view-portfolio-link"
                  target='_blank'
                >
                  View Details
                </a>
              </div>
            ))}
          </div>
        ) : (
          <p>No company fill applications available.</p>
        )}
      </div>
    </div>
  );
};

export default Companyappli;

import React, { useEffect } from 'react';
import { getresult } from './Actions/formAction';
import { useDispatch, useSelector } from 'react-redux';
import './Gethistory.css'; // Import the CSS file for styling

const Gethistory = ({ closeHistory }) => {
  const { Loading, results, Error } = useSelector(state => state.getresult);
  const dispatch = useDispatch();


  useEffect(() => {
    dispatch(getresult());
  }, [dispatch]);

  return (
    <div className="history-container">
      <button className="close-button" onClick={closeHistory}>X</button>
      <h2 className="title">History of Results</h2>
      <div className="results-container">
        {Loading ? (
          <p>Loading...</p>
        ) : Error ? (
          <p>Error loading results!</p>
        ) : results.length === 0 ? (
          <p>No results found.</p>
        ) : (
          results.map((result, index) => (
            <div key={index} className="result-item"   >
              <p className="form-name">{result.formName}</p>
              <button className="view-button"><a href={`/result/${result._id}`} target="_blank" rel="noopener noreferrer" style={{ color: 'white' }}>
  View Result
</a></button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Gethistory;

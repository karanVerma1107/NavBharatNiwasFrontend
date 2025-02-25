import React, { useState } from 'react';
import { searchAllotments } from './Actions/formAction';
import { useDispatch, useSelector } from 'react-redux';
import './searchallot.css';

const SearchAllotment = () => {
  const dispatch = useDispatch();
  const [query, setQuery] = useState('');

  const { loading, allotments, error } = useSelector((state) => state.searchAllotments);

  // Handle input change
  const handleInputChange = (e) => {
    setQuery(e.target.value);
    if (e.target.value.trim()) {
      dispatch(searchAllotments(e.target.value));
    }
  };

  return (
    <div className="container">
      <h1 className="title">Search Allotment</h1>

      <input
        type="text"
        value={query}
        onChange={handleInputChange}
        placeholder="Enter Unique ID..."
        className="input"
      />

      {loading && <p className="loading">Loading...</p>}
      {error && <p className="error">{error}</p>}

      <div className="results-container">
        {allotments &&
          allotments.map((allotment) => (
            <div key={allotment._id} className="card" >
              <h2 className="name"><a href={`Allotment/${allotment._id}`} target='_blank'>{allotment.name}</a></h2>
              <p className="field"><strong>Created At:</strong> {new Date(allotment.createdAt).toLocaleDateString()}</p>
              {allotment.phoneNumber && (
                <p className="field"><strong>Phone:</strong> {allotment.phoneNumber}</p>
              )}
              {allotment.company && (
                <p className="field"><strong>Company:</strong> {allotment.company}</p>
              )}
            </div>
          ))}
      </div>
    </div>
  );
};

export default SearchAllotment;

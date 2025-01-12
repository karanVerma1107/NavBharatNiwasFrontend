import React, { useState, useEffect } from 'react';
import './Searching.css'; // Import the CSS file for styling
import { getSearchedSite } from './Actions/siteActions';
import { useDispatch, useSelector } from 'react-redux';

const Searching = () => {
  const dispatch = useDispatch();

  // Local state to handle the input value
  const [searchQuery, setSearchQuery] = useState('');

  // Destructure sites and isLoading from Redux state
  const { sites, isLoading } = useSelector((state) => state.search);

  // Handle change in input field
  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchQuery(value);

    // Dispatch the search action on each input change
    if (value.trim() !== '') {
      dispatch(getSearchedSite(value)); // Call the action with the current search query
    }
  };

  return (
    <>
      <div
        className="papa"
        style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}
      >
        <h1>Welcome to Nav Bharat Niwas</h1>
        <h3>Your Trust Our Commitment</h3>

        <div className="searching-container">
          <div className="search-box">
            <input
              type="text"
              className="search-input"
              placeholder="Enter a city"
              value={searchQuery} // Bind the input field value to state
              onChange={handleSearchChange} // Trigger search on input change
            />
          </div>

          {/* Optional: Show loading spinner or message when data is loading */}
          {isLoading && <div>Loading...</div>}

          {/* Search results */}
          <div className="search-results">
            {sites && sites.length > 0 ? (
              sites.map((site) => (
                <div key={site._id} className="site-name-container">
                  <h4><a href={`/site/${site._id}`} target='_blank' style={{color:'#2c3e52'}}>{site.name}</a></h4>
                </div>
              ))
            ) : (
              <div className="no-results-message">No sites found</div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Searching;

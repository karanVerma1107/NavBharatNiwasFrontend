import React from 'react';
import './Searching.css'; // Import the CSS file for styling

const Searching = () => {
  return (<>
  <div className='papa' style={{display: 'flex', flexDirection:'column', justifyContent:'center',alignItems:'center'}}>
<h1>Welcome to Nav Bharat Niwas</h1>
<h3>Your Trust Our Commitment</h3>
  
    <div className="searching-container">
         
      <div className="search-box">
       
        <input
          type="text"
          className="search-input"
          placeholder="Enter a city"
        />
        <button className="search-btn">Search</button>
      </div>
    </div>

    </div>
    </>
  );
};

export default Searching;

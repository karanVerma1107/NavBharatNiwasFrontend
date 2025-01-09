import React, { useState } from 'react'
import './userShow.css' // Import the CSS file for styling
import { useSelector } from 'react-redux'
import { FaClipboardList, FaFileAlt, FaReceipt, FaGift, FaPhone, FaPlus, FaEdit, FaCheck, FaQuestion, FaEye } from 'react-icons/fa'
import Applications from './Applications'
import Gethistory from './Gethistory'


const UserShow = ({toggleUserShow}) => {
  const { user } = useSelector(state => state.user) // Get the user from the state

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text)
      .then(() => {
        alert('User ID copied to clipboard') // Show an alert when copy is successful
      })
      .catch(err => {
        alert('Failed to copy!') // Show an alert if copy fails
      })
  }

  const [showApplications, setShowApplications] = useState(false);
  const [showHistory, setShowHistory] = useState(false);  // New state for Gethistory

  const closeApp = () => {
    setShowApplications(false); // Function to close the Applications component
  };

  const closeHistory = () => {
    setShowHistory(false); // Function to close the Gethistory component
  };

  const handleApplicationsClick = () => {
    setShowApplications(true); // Open the Applications component
    setShowHistory(false); // Close the Gethistory component if it was open
  };

  const handleHistoryClick = () => {
    setShowHistory(true); // Open the Gethistory component
    setShowApplications(false); // Close the Applications component if it was open
  };

  const closebutton = () => {
    toggleUserShow();
  }

  return (
    <>
      <div className="user-show-container">
        <button onClick={closebutton} className="close-button">X</button>
        {user && (
          <div className="user-info">
            <p onClick={() => copyToClipboard(user._id)} className="user-id" style={{fontSize:'1.3vmax'}}>ID: {user._id}</p>
            <p><span className="bold-text">Name: </span> {user.name}</p>
            <p><span className="bold-text">Username: </span> {user.userName}</p>
          </div>
        )}
        <ul>
          <li><h3 onClick={handleApplicationsClick} style={{cursor:'pointer'}}><FaClipboardList /> My Applications</h3></li>
          <li><h3><FaFileAlt /> My EOIs</h3></li>
          <li><h3><FaReceipt /> My Receipts</h3></li>
          <li><h3 onClick={handleHistoryClick} style={{cursor:'pointer'}}><FaGift /> Lucky Draw</h3></li>
          <li><h3><FaPhone /> Contact Us</h3></li>
        </ul>
        {user && user.role === 'admin' && (
          <>
            <h3 style={{fontSize: '1.6vmax', color: 'white', marginBottom: '1.2vmax'}}>Advanced</h3>
            <ul>
              <li><h3><a href="ADD-SITE" target="_blank" style={{color: 'white'}}><FaPlus /> Add a Site</a></h3></li>
              <li><h3><FaEdit /> Edit a Site</h3></li>
              <li><h3><FaCheck /><a href="form-related" target="_blank" style={{color: 'white'}}><FaPlus />Manage form</a></h3></li>
              

            </ul>
          </>
        )}
      </div>

      {showApplications && <Applications closeApp={closeApp} />}
      {showHistory && <Gethistory closeHistory={closeHistory} />}
    </>
  )
}

export default UserShow
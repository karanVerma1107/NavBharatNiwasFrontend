import React, { useState } from 'react'
import './userShow.css' // Import the CSS file for styling
import { useSelector } from 'react-redux'
import { FaClipboardList, FaFileAlt, FaReceipt, FaGift, FaPhone, FaPlus, FaEdit, FaCheck, FaQuestion, FaEye } from 'react-icons/fa'
import Applications from './Applications'
import Companyappli from './Companyappli'
import { HiDocumentText } from "react-icons/hi";  // Heroicons
import Gethistory from './Gethistory'
import GetAllotments from './GetAllotments'

const UserShow = ({ toggleUserShow }) => {
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
  const [showCompanyAppli, setShowCompanyAppli] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [showAllotments, setShowAllotments] = useState(false); // New state for GetAllotments

  const closeApp = () => setShowApplications(false);
  const closeCompanyAppli = () => setShowCompanyAppli(false);
  const closeHistory = () => setShowHistory(false);
  const closeAllotments = () => setShowAllotments(false);

  const handleApplicationsClick = () => {
    setShowApplications(true);
    setShowCompanyAppli(false);
    setShowHistory(false);
    setShowAllotments(false);
  };

  const handleCompanyAppliClick = () => {
    setShowCompanyAppli(true);
    setShowApplications(false);
    setShowHistory(false);
    setShowAllotments(false);
  };

  const handleHistoryClick = () => {
    setShowHistory(true);
    setShowApplications(false);
    setShowCompanyAppli(false);
    setShowAllotments(false);
  };

  const handleAllotmentsClick = () => {
    setShowAllotments(true);
    setShowApplications(false);
    setShowCompanyAppli(false);
    setShowHistory(false);
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
            <p onClick={() => copyToClipboard(user._id)} className="user-id" style={{ fontSize: '1.3vmax' }}>ID: {user._id}</p>
            <p><span className="bold-text">Name: </span> {user.name}</p>
            <p><span className="bold-text">Username: </span> {user.userName}</p>
          </div>
        )}
        <ul>
          <li><h3 onClick={handleApplicationsClick} style={{ cursor: 'pointer' }}><FaClipboardList /> My Applications</h3></li>
          <li><h3 onClick={handleCompanyAppliClick} style={{ cursor: 'pointer' }}><FaClipboardList /> Company Fill Applications</h3></li>
          <li><h3 onClick={handleHistoryClick} style={{ cursor: 'pointer' }}><FaGift /> Lucky Draw</h3></li>
          <li><h3 onClick={handleAllotmentsClick} style={{ cursor: 'pointer' }}><HiDocumentText /> Allotments</h3></li>
        </ul>
        {user && user.role === 'admin' && (
          <>
            <h3 style={{ fontSize: '1.6vmax', color: 'white', marginBottom: '1.2vmax' }}>Advanced</h3>
            <ul>
              <li><h3><a href="/ADD-SITE" target="_blank" style={{ color: 'white' }}><FaPlus /> Add a Site</a></h3></li>
              <li><h3><FaEdit /> Edit a Site</h3></li>
              <li><h3><FaCheck /><a href="/form-related" target="_blank" style={{ color: 'white' }}><FaPlus /> Manage form</a></h3></li>
              <li><h3><FaCheck /><a href="/afterResult" target="_blank" style={{ color: 'white' }}><FaPlus /> After Results</a></h3></li>
            </ul>
          </>
        )}
      </div>

      {showApplications && <Applications closeApp={closeApp} />}
      {showCompanyAppli && <Companyappli closeApp={closeCompanyAppli} />}
      {showHistory && <Gethistory closeHistory={closeHistory} />}
      {showAllotments && <GetAllotments closeAllotments={closeAllotments} />}
    </>
  )
}

export default UserShow

import React from 'react';
import { FaPhoneAlt } from 'react-icons/fa';
import './Callnow.css';
import { TbClock24 } from "react-icons/tb";


const Callnow = () => {
  const phoneNumber = '+919971488477'; // Replace with the desired phone number

  const handleCall = () => {
    window.location.href = `tel:${phoneNumber}`;
  };

  return (
    <div className="call-now-container" onClick={handleCall} >
      <FaPhoneAlt className="call-icon" />
     
    </div>
  );
};

export default Callnow;
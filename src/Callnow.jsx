import React from 'react';
import { FaPhoneAlt } from 'react-icons/fa';
import './Callnow.css';
import { TbClock24 } from "react-icons/tb";


const Callnow = () => {
  const phoneNumber = '+919696581944'; // Replace with the desired phone number

  const handleCall = () => {
    window.location.href = `tel:${phoneNumber}`;
  };

  return (
    <div className="call-now-container" onClick={handleCall}>
      <FaPhoneAlt className="call-icon" />
      <div>
        <h3>Enquiry Now   <TbClock24/></h3>
        <h3>{phoneNumber}</h3>
      </div>
    </div>
  );
};

export default Callnow;
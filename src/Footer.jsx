import React from 'react';
import './Footer.css';  // Make sure to create and link the CSS file
import logo from './logoimg - Copy.jpg';
import { FaLocationDot } from "react-icons/fa6";
import { HiOutlineOfficeBuilding } from "react-icons/hi";
import { HiOfficeBuilding } from "react-icons/hi";
import { MdEmail } from "react-icons/md";
import { FaPhoneAlt } from "react-icons/fa";
import { FaInstagramSquare } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa";
import { FaSquareXTwitter } from "react-icons/fa6";
import { FaLinkedin } from "react-icons/fa";
import tp from './trans.png';

const Footer = () => {
  return (
    <div className="footer-container">
      <div className="left">
        <p>Company Info</p>
        <img src={tp} alt="Logo" className="logo-img" style={{ height: '9.7vmax', width: '21vmax' }} />
        <p  style={{ color: 'white' }}><FaPhoneAlt /> Phone: <a href="tel:+919971488477" style={{ color: 'white' }}>+919971488477</a></p>
        <p  style={{ color: 'white' }}><MdEmail /> Email: <a href="mailto:support@navbharatniwas.in" style={{ color: 'white' }}>support@navbharatniwas.in</a></p>
        <p  style={{ color: 'white' }}><HiOfficeBuilding /> Address: Sector 63, Noida, Uttar Pradesh - 208003</p>
        <p  style={{ color: 'white' }}><FaLocationDot /> Office Location: <a href="https://www.google.com/maps/place/NavBharat+Niwas+Pvt.+Ltd./@28.616352,77.378848,17z/data=!3m1!4b1!4m6!3m5!1s0x390cefff12bff2e7:0x1197b8158b9e59f5!8m2!3d28.616352!4d77.378848!16s%2Fg%2F11wxw_nntg?entry=ttu&g_ep=EgoyMDI1MDEwNy4wIKXMDSoASAFQAw%3D%3D" style={{ color: 'white' }}>Location</a></p>

        {/* Bank Details */}
        <p style={{ color: 'white' }}>Account Number: <span>924020056702191</span></p>
        <p style={{ color: 'white' }}>IFSC Code: <span>UTIB0001540</span></p>
        <p style={{ color: 'white' }}>Bank: <span>Axis Bank</span></p>
      </div>

      <div className="right">
        <p  style={{ color: 'white' }}>Follow Us</p>
        <p><FaInstagramSquare /><a href="https://www.instagram.com/navbharatniwas/" style={{ color: 'white' }}>Instagram</a></p>
        <p><FaFacebook /> <a href="https://www.facebook.com/people/NavBharat-Niwas/61572183777309/" style={{ color: 'white' }}>Facebook</a></p>
        <p><FaSquareXTwitter /> <a href="http://www.youtube.com/@NavBharatNiwas" style={{ color: 'white' }}>YouTube</a></p>

        <p><a href="/T" target="_blank" style={{ color: 'white' }}>Terms and Conditions</a></p>
      </div>
    </div>
  );
};

export default Footer;

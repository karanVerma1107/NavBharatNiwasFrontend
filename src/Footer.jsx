import React from 'react';
import './Footer.css';  // Make sure to create and link the CSS file
import logo from './logoimg - Copy.jpg'
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
import tp from './trans.png'



const Footer = () => {
  return (
    <div className="footer-container">
      <div className="left">
        <p>Company Info</p>
         <img src={tp} alt="Logo" className="logo-img" style={{ height: '9.7vmax', width: '21vmax' }} />
         <p><FaPhoneAlt/> Phone: <a href="+91 75310 27943">+919971488477</a></p>
      <p><MdEmail/> Email: <a href="mailto:support@navbharatniwas.in">support@navbharatniwas.in</a></p>
      <p><HiOfficeBuilding/>  Address: Sector 63, Noida, Uttar Pradesh - 208003</p>
      <p> <FaLocationDot/> Office Location: <a href='https://www.google.com/maps/place/NavBharat+Niwas+Pvt.+Ltd./@28.616352,77.378848,17z/data=!3m1!4b1!4m6!3m5!1s0x390cefff12bff2e7:0x1197b8158b9e59f5!8m2!3d28.616352!4d77.378848!16s%2Fg%2F11wxw_nntg?entry=ttu&g_ep=EgoyMDI1MDEwNy4wIKXMDSoASAFQAw%3D%3D'>Location</a></p>
       
      </div>
      <div className="right">
        <p>Follow Us</p>
        <p><FaInstagramSquare/><a href='https://www.instagram.com/navbharatniwas/' style={{color:'white'}}>Instagram</a> </p>
        <p><FaFacebook/> <a href='https://www.facebook.com/NavBharatNiwas'  style={{color:'white'}}> FaceBook</a></p>
        <p><FaYoutube/> YouTube</p>
       
        <p><FaSquareXTwitter/> X</p>

        <p>Privacy Policy</p>
        <p>Terms & Conditions</p>
      </div>
    </div>
  );
};

export default Footer;
import React, { useEffect } from 'react';
import { getformbyID } from './Actions/siteActions';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import './Formapp.css';  // Import your CSS file here
import logo from './logoimg - Copy.jpg'

const Form = () => {
    const { loading, error, draw } = useSelector(state => state.form);
    const dispatch = useDispatch();
    const { id } = useParams();
  
    useEffect(() => {
      dispatch(getformbyID(id));
    }, [dispatch, id]);
  
// Extract necessary information from the response
const { 
    _id, 
    userId, 
    name, 
    phoneNo, 
    occupation, 
    AdhaarNo, 
    PANno, 
    fatherName, 
    address, 
    status, 
    openingDate 
} = draw || {};

    return (<>
      <div className="formm-container">
        <div className="content">
         <div className='intro'>
        <img src={logo} alt="Logo" className="logoo" style={{width:'19.5vmax', height:'7.7vmax'}} />
        <div className='name'>
        <h1 className="company-name">Nav Bharat Niwas</h1>
          <p className="company-address">
            3rd floor, Shayama building, B-92, 63, Sector 62 Noida Uttar Pradesh - 201301
          </p>
        </div>
        </div>   
         <div className='details '>
     {/* Render image from the 'draw.image' */}
     {draw && draw.image && (
                            <img src={draw.image} alt="Draw" className="draw-image" />
                        )}

                        <p><strong>Ticket_id:</strong> {_id}</p>
                        <p><strong>userId:</strong> {userId}</p>
                        <p><strong>Name:</strong> {name}</p>
                        <p><strong>Phone Number:</strong> {phoneNo}</p>
                        <p><strong>Occupation:</strong> {occupation}</p>
                        <p><strong>Aadhaar No:</strong> {AdhaarNo}</p>
                        <p><strong>PAN No:</strong> {PANno}</p>
                        <p><strong>Father's Name:</strong> {fatherName}</p>
                        <p><strong>Address:</strong> {address}</p>
                        <p><strong>Status:</strong> {status}</p>
                        <p><strong>Opening Date:</strong> {new Date(openingDate).toLocaleDateString()}</p>

         </div>

        </div>
      </div>

      djbbjdebj
      </>
    );
  };
  

export default Form;

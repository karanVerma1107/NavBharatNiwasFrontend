import React, { useEffect } from 'react';
import { getformbyID } from './Actions/siteActions';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import './Formapp.css';  // Import your CSS file here
import logo from './logoimg - Copy.jpg';

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
        openingDate,
        DOB,
        project,
        nationality,
        image,
        paymentPlan,
        preference,
        plotSize,
        createdAt // Added the createdAt field
    } = draw || {};

    return (
      <>
        <div className="form-container">
          {/* Company Info Section */}
          <div className="company-info">
            <div className="logo-container">
              <img src={logo} alt="Logo" className="company-logo" />
            </div>
            <div className="company-address">
              <p className="address">Nav Bharat Niwas</p>
              <p className="address-details">
                3rd floor, Shayama building, B-92, 63, Sector 62 Noida Uttar Pradesh - 201301
              </p>
            </div>
          </div>

          {/* Form Details Section */}
          <div className="form-details">
            {/* Profile Image */}
            <div className="profile-container">
              {image && <img src={image} alt="User" className="profile-image" />}
            </div>
            
            {/* Form Details Table */}
            <table className="form-table">
              <tbody>
                <tr>
                  <td><strong>Ticket ID:</strong></td>
                  <td>{_id}</td>
                </tr>
                <tr>
                  <td><strong>User ID:</strong></td>
                  <td>{userId}</td>
                </tr>
                <tr>
                  <td><strong>Name:</strong></td>
                  <td>{name}</td>
                </tr>
                <tr>
                  <td><strong>Phone Number:</strong></td>
                  <td>{phoneNo}</td>
                </tr>
                <tr>
                  <td><strong>Occupation:</strong></td>
                  <td>{occupation}</td>
                </tr>
                <tr>
                  <td><strong>Aadhaar No:</strong></td>
                  <td>{AdhaarNo}</td>
                </tr>
                <tr>
                  <td><strong>PAN No:</strong></td>
                  <td>{PANno}</td>
                </tr>
                <tr>
                  <td><strong>Father's Name:</strong></td>
                  <td>{fatherName}</td>
                </tr>
                <tr>
                  <td><strong>Address:</strong></td>
                  <td>{address}</td>
                </tr>
                <tr>
                  <td><strong>Status:</strong></td>
                  <td>{status}</td>
                </tr>
                <tr>
                  <td><strong>Date of Birth:</strong></td>
                  <td>{new Date(DOB).toLocaleDateString()}</td>
                </tr>
                <tr>
                  <td><strong>Payment Plan:</strong></td>
                  <td>{paymentPlan}</td>
                </tr>
                <tr>
                  <td><strong>Preference:</strong></td>
                  <td>{preference}</td>
                </tr>
                <tr>
                  <td><strong>Plot Size:</strong></td>
                  <td>{plotSize}</td>
                </tr>
                <tr>
                  <td><strong>Project:</strong></td>
                  <td>{project}</td>
                </tr>
                <tr>
                  <td><strong>Nationality:</strong></td>
                  <td>{nationality}</td>
                </tr>
                <tr>
                  <td><strong>Opening Date:</strong></td>
                  <td>{new Date(openingDate).toLocaleDateString()}</td>
                </tr>
                {/* New Row for createdAt */}
                <tr>
                  <td><strong>Date of Filling:</strong></td>
                  <td>{new Date(createdAt).toLocaleDateString()}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </>
    );
};

export default Form;

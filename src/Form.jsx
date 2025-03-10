import React, { useEffect } from 'react';
import { getformbyID } from './Actions/siteActions';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import './Formapp.css';
import logo from './logoimg - Copy.jpg';

const Form = () => {
    const { loading, error, draw } = useSelector(state => state.form);
    const dispatch = useDispatch();
    const { id } = useParams();
  
    useEffect(() => {
      dispatch(getformbyID(id));
    }, [dispatch, id]);
  
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
        createdAt 
    } = draw || {};

    return (
      <>
        <div className="form-container" style={{marginTop:"5vmax"}}>
          <div className="company-info">
            <div className="logo-container">
              <img src={logo} alt="Logo" className="company-logo"  style={{marginTop:'2vmax'}}/>
            </div>
            <div className="company-address">
              <p style={{ color: 'black' }}>Nav Bharat Niwas</p>
              <p style={{ color: 'black' }}>
                3rd floor, Shayama building, B-92, 63, Sector 62 Noida Uttar Pradesh - 201301
              </p>
            </div>
          </div>

          <div className="form-details">
            <div className="profile-container">
              {image && <img src={image} alt="User" className="profile-image" />}
            </div>
            
            <table className="form-table">
              <tbody>
                {[
                  ["Ticket ID", _id],
                  ["User ID", userId],
                  ["Name", name],
                  ["Phone Number", phoneNo],
                  ["Occupation", occupation],
                  ["Aadhaar No", AdhaarNo],
                  ["PAN No", PANno],
                  ["Father's Name", fatherName],
                  ["Address", address],
                  ["Status", status],
                  ["Date of Birth", DOB ? new Date(DOB).toLocaleDateString() : ''],
                  ["Payment Plan", paymentPlan],
                  ["Preference", preference],
                  ["Plot Size", plotSize],
                  ["Project", project],
                  ["Nationality", nationality],
                  ["Opening Date", openingDate ? new Date(openingDate).toLocaleDateString() : ''],
                  ["Date of Filling", createdAt ? new Date(createdAt).toLocaleDateString() : '']
                ].map(([label, value]) => (
                  <tr key={label} style={{ color: 'black' }}>
                    <td style={{ color: 'black' }}><strong>{label}:</strong></td>
                    <td style={{ color: 'black' }}>{value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </>
    );
};

export default Form;

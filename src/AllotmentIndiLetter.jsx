import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getformbyID } from './Actions/siteActions';
import { createIndiAllotment } from './Actions/formAction';
import './AllotmentIndiLetter.css'; // Import CSS file
import { toast } from 'react-toastify';

const AllotmentIndiLetter = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const { loading, error, draw } = useSelector(state => state.form);

  const {message , Error}  = useSelector(state=>state.createAllotL);

  useEffect(()=>{
    if(message){
      toast.success(message);
    }

    if(Error){
      toast.error(Error);
    }
  },[message, Error]);

  useEffect(() => {
    dispatch(getformbyID(id));
  }, [dispatch, id]);

  // State for form inputs
  const [formData, setFormData] = useState({
    name: '',
    swdo: '',
    phoneNumber: '',
    dob: '',
    image: '',
    nationality: '',
    emailId: '',
    aadhaarNo: '',
    panNo: '',
    profession: '',
    address: '',
    uniqueId: '',
    developmentCharge: '',
    area: '',
    unitNo: '',
    plc: '',
    paymentPlan: '',
    changeinPP: '',
    date: '',
    plcAmount: '',
    registrationAmount: '',
    totalCost: '',
    modeOfPayment: '',
    chequeNoDDNo: '',
    bankName: '',
    amount: '',
    chequeDateDDDate: '',
    transactionId: '',
  });

  // Auto-fill fields from draw if available
  useEffect(() => {
    if (draw) {
      setFormData((prev) => ({
        ...prev,
        name: draw.name || '',
        phoneNumber: draw.phoneNo || '',
        dob: draw.DOB || '',
        swdo: draw.fatherName || '',
        image: draw.image || '',
        nationality: draw.nationality || '',
        aadhaarNo: draw.AdhaarNo || '',
        panNo: draw.PANno || '',
        profession: draw.occupation || '',
        address: draw.address || '',
        paymentPlan: draw.paymentPlan || '',
        
      }));
    }
  }, [draw]);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createIndiAllotment(formData));
  };

  return (
    <div className="container">
      <h2>Allotment Individual Letter</h2>
      <form onSubmit={handleSubmit}>
        {/* Applicant Details Section */}
        <div className="form-section">
          <h3>Applicant Details</h3>
          <div className="input-group"><label>Name</label><input type="text" name="name" value={formData.name} onChange={handleChange} /></div>
          <div className="input-group"><label>Father's Name</label><input type="text" name="swdo" value={formData.swdo} onChange={handleChange} /></div>
          <div className="input-group"><label>Phone Number</label><input type="text" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} /></div>
          <div className="input-group"><label>Date of Birth</label><input type="date" name="dob" value={formData.dob} onChange={handleChange} /></div>
          <div className="input-group"><label>Nationality</label><input type="text" name="nationality" value={formData.nationality} onChange={handleChange} /></div>
          <div className="input-group"><label>Email ID</label><input type="email" name="emailId" value={formData.emailId} onChange={handleChange} /></div>
          <div className="input-group"><label>Aadhaar No.</label><input type="text" name="aadhaarNo" value={formData.aadhaarNo} onChange={handleChange} /></div>
          <div className="input-group"><label>PAN No.</label><input type="text" name="panNo" value={formData.panNo} onChange={handleChange} /></div>
          <div className="input-group"><label>Profession</label><input type="text" name="profession" value={formData.profession} onChange={handleChange} /></div>
          <div className="input-group"><label>Address</label><input type="text" name="address" value={formData.address} onChange={handleChange} /></div>
          <div className="input-group"><label>Unique ID</label><input type="text" name="uniqueId" value={formData.uniqueId} onChange={handleChange} /></div>
        </div>

        {/* Booking Details Section */}
        <div className="form-section">
          <h3>Booking Details</h3>
          <div className="input-group"><label>Development Charge</label><input type="text" name="developmentCharge" value={formData.developmentCharge} onChange={handleChange} /></div>
          <div className="input-group"><label>Plot Size</label><input type="text" name="area" value={formData.area} onChange={handleChange} /></div>
          <div className="input-group"><label>Unit No.</label><input type="text" name="unitNo" value={formData.unitNo} onChange={handleChange} /></div>
          <div className="input-group"><label>PLC</label><input type="text" name="plc" value={formData.plc} onChange={handleChange} /></div>
          <div className="input-group"><label>Payment Plan</label><input type="text" name="paymentPlan" value={formData.paymentPlan} onChange={handleChange} /></div>
          <div className="input-group"><label>Change in Payment Plan</label><input type="text" name="changeinPP" value={formData.changeinPP} onChange={handleChange} /></div>
          <div className="input-group"><label>PLC Amount</label><input type="text" name="plcAmount" value={formData.plcAmount} onChange={handleChange} /></div>
          <div className="input-group"><label>Registration Amount</label><input type="text" name="registrationAmount" value={formData.registrationAmount} onChange={handleChange} /></div>
          <div className="input-group"><label>Total Cost</label><input type="text" name="totalCost" value={formData.totalCost} onChange={handleChange} /></div>
          <div className="input-group"><label>Mode of Payment</label><input type="text" name="modeOfPayment" value={formData.modeOfPayment} onChange={handleChange} /></div>
        </div>

        <button type="submit" className="submit-btn">Submit</button>
      </form>
    </div>
  );
};

export default AllotmentIndiLetter;

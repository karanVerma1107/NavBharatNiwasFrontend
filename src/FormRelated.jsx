import React, { useState, useEffect } from 'react';
import './form.css';
import { useDispatch, useSelector } from 'react-redux';  // Importing useDispatch and useSelector hooks
import { makeIsallow } from './Actions/formAction';
import { toast } from 'react-toastify';  // Importing toast
import SearchDraw from './SearchDraw';
import Findalldraw from './Findalldraw';
import SearchCompanyFill from './SearchCompanyFill';

const FormRelated = () => {
  const dispatch = useDispatch();

  // State to store the form data
  const [formData, setFormData] = useState({
    formName: '',
    formOpeningDate: '',
    isEnabled: false,
  });

  // Get loading, error, and message from Redux state
  const { loading, error, message } = useSelector(state => state.makeform);

  // Handle change in form fields
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Create a new FormData instance to append form fields
    const data = new FormData();

    // Append data from form fields to the FormData object
    data.append('formName', formData.formName);
    data.append('formOpeningDate', formData.formOpeningDate);
    data.append('isEnabled', formData.isEnabled ? 'true' : 'false'); // Convert boolean to string

    // Dispatch the action with the FormData
    dispatch(makeIsallow(data)); // Dispatch the form data for submission
  };

  // Use Effect hook to show toast notifications on success or error
  useEffect(() => {
    if (message) {
      toast.success(message);  // Show success toast if there's a success message
    }

    if (error) {
      toast.error(error);  // Show error toast if there's an error message
    }
  }, [message, error]);  // Dependencies are message and error to trigger on change

  return (<>
    <div className="createdraw" style={{ marginTop: '5.2vmax' }}>
      <h2>Create New Draw Form</h2>
      
      {/* Show loading message */}
      {loading && <p>Loading...</p>}

      <form onSubmit={handleSubmit}>
        {/* Form Name */}
        <div className="form-group">
          <label htmlFor="formName">Form Name</label>
          <input
            type="text"
            id="formName"
            name="formName"
            value={formData.formName}
            onChange={handleChange}
            required
          />
        </div>

        {/* Form Opening Date */}
        <div className="form-group">
          <label htmlFor="formOpeningDate">Form Opening Date</label>
          <input
            type="date"
            id="formOpeningDate"
            name="formOpeningDate"
            value={formData.formOpeningDate}
            onChange={handleChange}
            required
          />
        </div>

        {/* Is Enabled (Checkbox) */}
        <div className="form-group">
          <label htmlFor="isEnabled">Is Enabled</label>
          <input
            type="checkbox"
            id="isEnabled"
            name="isEnabled"
            checked={formData.isEnabled}
            onChange={handleChange}
          />
        </div>

        {/* Submit Button */}
        <button className='createdrawbutton' type="submit">Create Draw</button>
      </form>
    </div>
    
    <SearchDraw/>

    <SearchCompanyFill/>


   <Findalldraw/>


    </>
  );
};

export default FormRelated;

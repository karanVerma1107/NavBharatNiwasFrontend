import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addSite } from './Actions/siteActions';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Carousel } from 'react-responsive-carousel';
import ImageModal from './ImageModal';
import './Addsite.css';

const Addsite = () => {
  const [name, setName] = useState('');
  const [ytlink, setYtlink] = useState('');
  const [charges, setCharges] = useState('');
  const [description, setDescription] = useState('');
  const [current, setCurrent] = useState('ongoing');
  const [formYes, setFormYes] = useState(false);
  const [images, setImages] = useState([]);
  const [imageError, setImageError] = useState('');
  const [modalImage, setModalImage] = useState(null);
  const [state, setState] = useState('');
  const [city, setCity] = useState('');
  const [unit, setUnit] = useState('');
  const [paymentPlan, setPaymentPlan] = useState([]);
  const [paymentInput, setPaymentInput] = useState('');

  const dispatch = useDispatch();
  const { loading, site, error, message } = useSelector(state => state.addsite);

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
    if (message) {
      toast.success(message);
    }
  }, [error, message]);

  const handleImageChange = (e) => {
    const selectedImages = Array.from(e.target.files);
    if (selectedImages.length > 5) {
      setImageError('You can only upload up to 5 images.');
      toast.error('You can only upload up to 5 images.');
    } else {
      setImages(selectedImages);
      setImageError('');
    }
  };

  const addPaymentPlan = () => {
    if (paymentInput.trim() === '') return;
    setPaymentPlan([...paymentPlan, paymentInput.trim()]);
    setPaymentInput('');
  };

  const removePaymentPlan = (index) => {
    setPaymentPlan(paymentPlan.filter((_, i) => i !== index));
  };

  const submitHandler = (e) => {
    e.preventDefault();
    const siteData = {
      name,
      ytlink,
      charges,
      description,
      current,
      formYes,
      images,
      state,
      city,
      unit,
      PaymentPlan: paymentPlan
    };
    dispatch(addSite(siteData));
  };

  const openModal = (image) => setModalImage(image);
  const closeModal = () => setModalImage(null);

  return (
    <div className="addsite-container">
      <h2>Add a New Site</h2>
      <form onSubmit={submitHandler}>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} required />
        </div>

        <div className="form-group">
          <label htmlFor="ytlink">YouTube Link</label>
          <input type="text" id="ytlink" value={ytlink} onChange={(e) => setYtlink(e.target.value)} />
        </div>

        <div className="form-group">
          <label htmlFor="charges">Draw Charges</label>
          <input type="text" id="charges" value={charges} onChange={(e) => setCharges(e.target.value)} required />
        </div>

        <div className="form-group">
          <label htmlFor="state">State</label>
          <input type="text" id="state" value={state} onChange={(e) => setState(e.target.value)} required />
        </div>

        <div className="form-group">
          <label htmlFor="city">City</label>
          <input type="text" id="city" value={city} onChange={(e) => setCity(e.target.value)} required />
        </div>

        <div className="form-group">
          <label htmlFor="unit">Units</label>
          <input type="text" id="unit" value={unit} onChange={(e) => setUnit(e.target.value)} required />
        </div>

        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea id="description" value={description} onChange={(e) => setDescription(e.target.value)} required></textarea>
        </div>

        <div className="form-group">
          <label htmlFor="current">Current</label>
          <select id="current" value={current} onChange={(e) => setCurrent(e.target.value)} required>
            <option value="ongoing">Ongoing</option>
            <option value="testimonial">Testimonial</option>
            <option value="upcoming">Upcoming</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="formYes">Form Yes</label>
          <input type="checkbox" id="formYes" checked={formYes} onChange={(e) => setFormYes(e.target.checked)} />
        </div>

        <div className="form-group">
          <label htmlFor="images">Images (Max 5)</label>
          <input type="file" id="images" multiple onChange={handleImageChange} required />
          {imageError && <p className="error-message">{imageError}</p>}
        </div>

        {images.length > 0 && (
          <div className="carousel-container">
            <Carousel showThumbs={false} infiniteLoop autoPlay interval={3000} showArrows>
              {images.map((image, index) => (
                <div key={index} onClick={() => openModal(image)}>
                  <img
                    src={URL.createObjectURL(image)}
                    alt={`Slide ${index}`}
                    style={{ width: '32vmax', height: '29vmax', borderRadius: '1vmax', cursor: 'pointer' }}
                  />
                </div>
              ))}
            </Carousel>
          </div>
        )}

        {/* Payment Plan Input */}
        <div className="form-group">
          <label htmlFor="paymentPlan">Payment Plan</label>
          <div style={{ display: 'flex', gap: '1rem' }}>
            <input
              type="text"
              value={paymentInput}
              onChange={(e) => setPaymentInput(e.target.value)}
              placeholder="Enter a payment plan"
            />
            <button type="button" onClick={addPaymentPlan}>Add</button>
          </div>
          {paymentPlan.length > 0 && (
            <ul className="payment-plan-list">
              {paymentPlan.map((plan, index) => (
                <li key={index}>
                  {plan}
                  <button type="button" onClick={() => removePaymentPlan(index)}>x</button>
                </li>
              ))}
            </ul>
          )}
        </div>

        <button type="submit" className="submit-button" disabled={loading}>
          {loading ? 'Adding...' : 'Add Site'}
        </button>
      </form>
      <ImageModal image={modalImage} onClose={closeModal} />
    </div>
  );
};

export default Addsite;

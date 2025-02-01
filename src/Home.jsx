import React, { useEffect, useState } from 'react';
import './home.css';
import Loading from './Loading';
import { getImages } from './Actions/siteActions';
import { useDispatch, useSelector } from 'react-redux';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Carousel } from 'react-responsive-carousel';
import ShowStatusSites from './ShowStatusSites';
import pay from './payment.jpeg';
import aff from './afford.jpg';
import { toast } from 'react-toastify';
import grow from './growth.png';
import app from './app.png';
import Searching from './Searching';
import { faqform } from './Actions/formAction';
import LuckyDrawForm from './LuckyDrawForm';
import CompanyFillForm from './CompanyFillForm'; // Import the CompanyFillForm

const Home = () => {
  const dispatch = useDispatch();
  const { loading, data, error } = useSelector((state) => state.images);
  const { process, text } = useSelector((state) => state.faq);

  useEffect(() => {
    dispatch(getImages());
  }, [dispatch]);

  const [formData, setFormData] = useState({
    name: '',
    phoneNo: '',
    city: '',
    budget: '',
  });

  const [showLuckyDrawOptions, setShowLuckyDrawOptions] = useState(false); // State to show options
  const [showLuckyDrawForm, setShowLuckyDrawForm] = useState(false); // State to show LuckyDrawForm
  const [showCompanyFillForm, setShowCompanyFillForm] = useState(false); // State to show CompanyFillForm

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { name, phoneNo, city, budget } = formData;

    if (!name || !phoneNo || !city || !budget) {
      alert('Please fill in all fields.');
      return;
    }

    const allowedBudgets = [
      '10 lakh to 20 lakh',
      '30 lakh to 40 lakh',
      '3 crore to 4 crore',
    ];

    if (!allowedBudgets.includes(budget)) {
      alert('Please select a valid budget.');
      return;
    }

    dispatch(faqform(formData));
  };

  useEffect(() => {
    toast.success(text);
  }, [text]);

  const goto = (id) => {
    window.open(`/site/${id}`, '_blank');
  };

  // Handle Lucky Draw button click
  const handleLuckyDrawClick = () => {
    setShowLuckyDrawOptions(true); // Show the options modal
  };

  // Handle Individual Fill selection
  const handleIndividualFill = () => {
    setShowLuckyDrawOptions(false); // Hide options
    setShowLuckyDrawForm(true); // Show LuckyDrawForm
    setShowCompanyFillForm(false); // Ensure CompanyFillForm is hidden
  };

  // Handle Company Fill selection
  const handleCompanyFill = () => {
    setShowLuckyDrawOptions(false); // Hide options
    setShowCompanyFillForm(true); // Show CompanyFillForm
    setShowLuckyDrawForm(false); // Ensure LuckyDrawForm is hidden
  };

  return (
    <>
      <div className="slider">
        {loading ? (
          <Loading />
        ) : error ? (
          <p>{error}</p>
        ) : (
          <Carousel
            showThumbs={false}
            infiniteLoop={true}
            autoPlay={true}
            interval={2500}
            showArrows={true}
            showIndicators={false}
          >
            {data &&
              data.length > 0 &&
              data.map((site, index) =>
                site.images.map((image, imgIndex) => (
                  <div key={`${index}-${imgIndex}`} className="carousel-slide">
                    <img
                      src={image}
                      alt={`Slide ${index}-${imgIndex}`}
                      style={{ width: '100%', height: '35vmax' }}
                    />
                    <div className="carousel-caption">
                      <h1>{site.name}</h1>
                      <h2 style={{ color: 'white' }}>{site.current}</h2>
                      <p>Exclusively by Nav Bharat Niwas</p>
                      <button
                        className="view-details-button"
                        onClick={() => goto(site._id)}
                      >
                        View Details
                      </button>
                    </div>
                  </div>
                ))
              )}
          </Carousel>
        )}
      </div>

      <div className="overview">
        <div className="overviewText" style={{ borderRight: '1.5px solid gray' }}>
          <img src={aff} alt="Affordable" />
        </div>
        <div className="overviewText">
          <img src={pay} alt="Payment" />
        </div>
        <div className="overviewText" style={{ borderLeft: '1.5px solid gray' }}>
          <img src={app} alt="App" />
        </div>
        <div className="overviewText" style={{ borderLeft: '1.5px solid gray' }}>
          <img src={grow} alt="Growth" />
        </div>
      </div>

      <div className="how">
        <h1>How to Apply</h1>
        <div className="video-container">
          <iframe
            width="100%"
            height="26vmax"
            src="https://www.youtube-nocookie.com/embed/6BDaicmindM?si=qVs6yJg1Ri2Wx3_V?rel=0$autoplay=1&controls=1&showinfo=0"
            title="How to Apply - YouTube"
            frameBorder="0"
            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>

        <div className="call-form-container">
          <h2>Get a Call from Us</h2>
          <form onSubmit={handleSubmit}>
            <div className="input-group">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                placeholder="Enter your name"
              />
            </div>

            <div className="input-group">
              <label htmlFor="phoneNo">Phone Number</label>
              <input
                type="tel"
                id="phoneNo"
                name="phoneNo"
                value={formData.phoneNo}
                onChange={handleChange}
                required
                placeholder="Enter your phone number"
              />
            </div>

            <div className="input-group">
              <label htmlFor="city">City</label>
              <input
                type="text"
                id="city"
                name="city"
                value={formData.city}
                onChange={handleChange}
                required
                placeholder="Enter your city"
              />
            </div>

            <div className="input-group">
              <label htmlFor="budget">Budget</label>
              <select
                id="budget"
                name="budget"
                value={formData.budget}
                onChange={handleChange}
                required
              >
                <option value="">Select your budget</option>
                <option value="10 lakh to 20 lakh">10 lakh to 20 lakh</option>
                <option value="30 lakh to 40 lakh">30 lakh to 40 lakh</option>
                <option value="3 crore to 4 crore">3 crore and Above</option>
              </select>
            </div>

            <button type="submit" className="submit-btn">
              Submit
            </button>
          </form>
        </div>
      </div>

      <div
        className="ongoing"
        style={{
          margin: '1vmax 0vmax',
          width: '100%',
          height: 'auto',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          padding: '1vmax',
        }}
      >
        <h2 style={{ fontSize: '2.3vmax', textDecoration: 'underline' }}>
          Ongoing projects
        </h2>
        <ShowStatusSites status="ongoing" />
      </div>

      <div
        className="ongoing"
        style={{
          margin: '1vmax 0vmax',
          width: '100%',
          height: 'auto',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          padding: '1vmax',
        }}
      >
        <h2 style={{ fontSize: '2.3vmax', textDecoration: 'underline' }}>
          Upcoming projects
        </h2>
        <ShowStatusSites status="upcoming" />
      </div>

      <div
        className="ongoing"
        style={{
          margin: '1vmax 0vmax',
          width: '100%',
          height: 'auto',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          padding: '1vmax',
        }}
      >
        <h2 style={{ fontSize: '2.3vmax', textDecoration: 'underline' }}>
          Delivered projects
        </h2>
        <ShowStatusSites status="testimonial" />
      </div>

      <div className="about-us-container">
        <div className="about-us-content">
          <h4 className="about-us-title">About Us</h4>
          <p className="about-us-description">
            Nav Bharat Niwas is a trusted real estate company based in Noida,
            Uttar Pradesh, located in Sector 63 near the metro station. We
            specialize in providing premium land sales to help you secure valuable
            investments. Our team is dedicated to offering transparent, reliable,
            and affordable real estate solutions. Whether you are looking for
            residential or commercial land, we offer properties with high growth
            potential. Join us at Nav Bharat Niwas and take the first step towards
            building a secure future with prime land investments.
          </p>
        </div>
      </div>

      {/* Lucky Draw Button */}
      <div className="lucky-draw-btn-container">
        <button
          className="lucky-draw-btn"
          onClick={handleLuckyDrawClick}
          style={{
            fontSize: '1.5vmax',
            padding: '1vmax 2vmax',
            backgroundColor: '#2e3c52',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
          }}
        >
          Fill Lucky Draw
        </button>
      </div>

      {/* Lucky Draw Options Modal */}
      {showLuckyDrawOptions && (
        <div
          style={{
            position: 'fixed',
            top: '0',
            left: '0',
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 1000,
          }}
        >
          <div
            style={{
              backgroundColor: 'white',
              padding: '2vmax',
              borderRadius: '10px',
              textAlign: 'center',
            }}
          >
            <h3 style={{ fontSize: '1.5vmax', marginBottom: '1vmax' }}>
              Choose an option:
            </h3>
            <button
              onClick={handleIndividualFill}
              style={{
                fontSize: '1.5vmax',
                padding: '1vmax 2vmax',
                backgroundColor: '#2e3c52',
                color: 'white',
                border: 'none',
                borderRadius: '5px',
                cursor: 'pointer',
                margin: '0.5vmax',
              }}
            >
              Individual Fill
            </button>
            <button
              onClick={handleCompanyFill}
              style={{
                fontSize: '1.5vmax',
                padding: '1vmax 2vmax',
                backgroundColor: '#2e3c52',
                color: 'white',
                border: 'none',
                borderRadius: '5px',
                cursor: 'pointer',
                margin: '0.5vmax',
              }}
            >
              Company Fill
            </button>
          </div>
        </div>
      )}

      {/* Render LuckyDrawForm or CompanyFillForm based on selection */}
      {showLuckyDrawForm && <LuckyDrawForm />}
      {showCompanyFillForm && <CompanyFillForm />}
    </>
  );
};

export default Home;
import React, { useEffect, useState } from 'react';
import './home.css';
import Loading from './Loading';
import { getImages, getSitesByStateCity } from './Actions/siteActions';
import { useDispatch, useSelector } from 'react-redux';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Carousel } from 'react-responsive-carousel';
import ShowStatusSites from './ShowStatusSites';
import pay from './payment.jpeg';
import aff from './afford.jpg';
import { toast } from 'react-toastify';
import grow from './growth.png';
import p1 from './pox1.jpg';
import p2 from './pox2.webp';
import p3 from './pox3.webp';
import p4 from './pox4.webp';
import app from './app.png';
import Searching from './Searching';
import cvpic from './introvideo.mp4'
import cloud from './cloud3.png'
import qq from './enq2.png'
import { faqform } from './Actions/formAction';
import LuckyDrawForm from './LuckyDrawForm';
import CompanyFillForm from './CompanyFillForm'; // Import the CompanyFillForm
import Siteshows from './Siteshows';
import { useNavigate } from 'react-router-dom';
import jojo from './jojo.jpg'




const statsData = [
  { label: 'States Covered', value: 4 },
  { label: 'Trusted Clients', value: 200 },
  { label: 'Our Team', value: 25 },
  { label: 'Experience', value: 7, suffix: ' years' },
];






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
  const [formVisible, setFormVisible] = useState(false);

  const [othersiteVisible, setothersiteVisible] = useState(false);


  const navigate = useNavigate();
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };





  const [counters, setCounters] = useState(statsData.map(() => 0));

  useEffect(() => {
    const interval = setInterval(() => {
      setCounters((prev) =>
        prev.map((count, i) => {
          const target = statsData[i].value;
          if (count < target) {
            const step = Math.ceil(target / 80); // adjust speed here
            return Math.min(count + step, target);
          }
          return count;
        })
      );
    }, 50); // every 50ms

    return () => clearInterval(interval);
  }, []);


  const [stateInput, setStateInput] = useState('');
  const [cityInput, setCityInput] = useState('');

  const { isFetching, fetchedSites, fetchError } = useSelector(
    state => state.appsu
  );

  const handleStateChange = (e) => {
    const value = e.target.value;
    setStateInput(value);
    dispatch(getSitesByStateCity(value, cityInput));
  };

  
  const handleCityChange = (e) => {
    const value = e.target.value;
    setCityInput(value);
    dispatch(getSitesByStateCity(stateInput, value));
  };




  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://static.elfsight.com/platform/platform.js";
    script.async = true;
    document.body.appendChild(script);
  }, []);





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
         
                  <div className="carousel-slide hover-video-wrapper" style={{ width: '100%', height: '39vmax', position: 'relative' }}>
 <video
    src={cvpic}
    autoPlay
    muted
    preload='auto'
    loop
    playsInline
    poster={jojo}
    className="hover-video"
    style={{
      width: '100%',
      height: '100%',
      objectFit: 'cover', // Or use 'fill' if you want full stretch even if it distorts
    }}
  />
  
  <div className="hover-overlay" />
  
  <div className="carousel-caption">
    <p className="caption-text" style={{fontSize:'1.8vmax'}}>Exclusively by Nav Bharat Niwas</p>

    <div className="caption-line" />

    <p className="caption-text" style={{fontSize:'1.8vmax'}}>Your Trust Our Commitment</p>
<button 

  style={{ 
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    border: '0.15vmax solid rgba(255, 255, 255, 0.7)',
    borderRadius: '0.4vmax',
    color: 'rgba(255, 255, 255, 0.9)',
    fontSize: '1.5vmax',
    padding: '0.8vmax 1.5vmax',
    cursor: 'pointer',
    transition: 'all 0.2s ease-in-out',
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    letterSpacing: '0.05vmax',
    textTransform: 'uppercase',
    backdropFilter: 'blur(0.3vmax)'
  }}
  onMouseOver={(e) => {
    e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.3)';
    e.target.style.color = 'rgba(255, 255, 255, 1)';
    e.target.style.borderColor = 'rgba(255, 255, 255, 1)';
  }}
  onMouseOut={(e) => {
    e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.2)';
    e.target.style.color = 'rgba(255, 255, 255, 0.9)';
    e.target.style.borderColor = 'rgba(255, 255, 255, 0.7)';
  }}
  onClick={() => window.location.href = '#target-section'}
>
  View Properties
</button>

  </div>
   <div class="custom-height-div">

   <div className="form-container1" style={{width:'100%', borderRadius:'none', padding:'1vmax', backdropFilter:'blur(0.3vmax)', backgroundColor:'whitesmoke', border:'0.1vmax solid rgba(255, 255, 255, 0.7)'}}>
    <div className="form-group1">
      <label htmlFor="propertyType" style={{fontSize:"1vmax", color:"green" }}>Property Type</label>
      <input
        type="text"
        id="propertyType"
        placeholder="Plot, Villa, etc."
        style={{ fontSize: '1vmax' }}
      />
    </div>

    <div className="form-group1">
      <label htmlFor="budget" style={{fontSize:"1vmax", color:"green" }}>Budget</label>
      <select
        id="budget"
        style={{ fontSize: '1vmax' }}
      >
        <option value="">Select Budget</option>
        <option value="10-20">10-20 Lakh</option>
        <option value="30-40">30-40 Lakh</option>
        <option value="3cr+">3 Crore+</option>
      </select>
    </div>

    <div className="form-group1">
      <label htmlFor="location" style={{fontSize:"1vmax", color:"green" }}>Location</label>
      <input
  type="text"
  id="location"
  placeholder="Enter Location"
  value={cityInput} // optional but good for controlled input
  onChange={handleCityChange}
  style={{ fontSize: '1vmax' }}
/>
    </div>
  </div>
   </div>
</div>
 
        )}
       
      </div>


      
      <div className='overview'>
      {isFetching && <p>Loading...</p>}
      {fetchError && <p style={{ color: 'red' }}>{fetchError}</p>}
      {!isFetching && !fetchError && fetchedSites.length === 0 && (
        <p></p>
      )}

      {fetchedSites && <Siteshows sites={fetchedSites} />}
      </div>
     
<p
  style={{
    fontSize: '1.3vmax',
    fontWeight: 600,
    color: 'black',
    textShadow: '0 0 8px rgba(0, 0, 0, 0.7)',
    padding: '1.5rem',
    lineHeight: 1.8,
    
    borderRadius: '1vmax',
    maxWidth: '90%',
    margin: '2vmax auto',
    backdropFilter: 'blur(4px)',
  }}
>
  We at NavBharat Niwas 🏡 are proud to serve you with the best and most affordable plots and homes across India 🇮🇳. Whether you're looking for residential, commercial, or investment opportunities — we’ve got you covered! ✅
  Our properties are government-verified, legally clear, and delivered with trust and transparency 🤝.
  Join hands with one of the top builders in India and take a confident step toward your dream home today! 🌟
</p>


    

<div className='overview1'>


{statsData.map((stat, index) => (
        <div key={index} className="stat-box">
          <h2 className="stat-number">
            {counters[index]}+{stat.suffix || ''}
          </h2>
          <p className="stat-label">{stat.label}</p>
        </div>
      ))}
</div>


      <div className="overview">
      <img
    src={qq}
    alt="Overview"
  />
  <button

    className='enquire-btn'
    onClick={() => setFormVisible(true)}
  >
    Enquire Now ➡
  </button>


  {formVisible && (
        <div className="modal-overlay">
          <div className="call-form-container">
            <button className="close-btn" onClick={() => setFormVisible(false)}>
              &times;
            </button>

            <div className="call-form-container animated-glass-form">
  <h2 className="form-title" style={{color:'white'}}>Get a Call from Us</h2>
  <form onSubmit={handleSubmit}>
    <div className="input-group animated-group">
      <label htmlFor="name" style={{color:'white'}}>Name</label>
      <input
        type="text"
        id="name"
        name="name"
        value={formData.name}
        onChange={handleChange}
        required
        placeholder="Enter your name"
        style={{width:'30vmax'}}
      />
    </div>

    <div className="input-group animated-group">
      <label htmlFor="phoneNo" style={{color:'white'}}>Phone Number</label>
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

    <div className="input-group animated-group">
      <label htmlFor="city" style={{color:'white'}}>City</label>
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

    <div className="input-group animated-group">
      <label htmlFor="budget" style={{color:'white'}}>Budget</label>
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

    <button type="submit" className="submit-btn animated-submit">
      Submit
    </button>
  </form>
</div>

          </div>
        </div>
      )}

      </div>

      

      <div className="how">
       

       
      </div>

      <div
        className="ongoing"
        id="target-section"
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

    

   
      <div className="about-us-container" id="about-section">
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

          <h2 style={{color:'#2e3c52'}}>
            We Serve 
          </h2>
         
           <ul>
            <li style={{fontSize:'1.4vmax', margin:'1vmax', color:'#2e3c52'}}>End-to-end real estate consultancy for investors and homebuyers.</li>
            <li style={{fontSize:'1.4vmax', margin:'1vmax', color:'#2e3c52'}}>No hidden charges – full disclosure of pricing, layout, and specifications.</li>
            <li style={{fontSize:'1.4vmax', margin:'1vmax', color:'#2e3c52'}}>Land titles that are verified and legally acquired with proper documentation.</li>
           </ul>

           <button className="read-blog-btn" onClick={() => setothersiteVisible(true)}>
  See Delivered and Upcoming projects
</button>
          


        </div>
      </div>

      {othersiteVisible && (
  <>
    <div className="overview">
      <button className="close-btn" onClick={() => setothersiteVisible(false)}>
        &times;
      </button>
      <p>Delivered and upcoming project content here.</p>
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
        Testimonials
      </h2>
      <ShowStatusSites status="testimonial" />
    </div>
  </>
)}


<div style={{width:'100%', height:'auto', margin:'2.7vmax 0vmax'}}>
<div className="elfsight-app-59056ef6-6aa8-4aa1-9b7c-d0a0c5b3e2ac" data-elfsight-app-lazy></div>
</div>

<button
  style={{
    fontSize: '1.6vmax',
    backgroundColor: '#ffccbc',
    color: '#4e342e',
    border: 'none',
    padding: '0.8vmax 2vmax',
    borderRadius: '2vmax',
    cursor: 'pointer',
    boxShadow: '0 0.4vmax 1vmax rgba(0, 0, 0, 0.2)',
    transition: 'all 0.3s ease-in-out',
    display: 'block',
    margin: '1.1vmax auto'
  }}
  onMouseOver={(e) => e.target.style.backgroundColor = '#ffe0b2'}
  onMouseOut={(e) => e.target.style.backgroundColor = '#ffccbc'}
  onClick={() => navigate('/allblogs')}
>
  📚 Read Our Blogs
</button>


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
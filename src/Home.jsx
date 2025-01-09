import React, { useEffect, useState } from 'react';
import './home.css';
import Loading from './Loading';
import { getImages } from './Actions/siteActions';
import { useDispatch, useSelector } from 'react-redux';
import 'react-responsive-carousel/lib/styles/carousel.min.css'; // Import carousel styles
import { Carousel } from 'react-responsive-carousel';
import ShowStatusSites from './showStatusSites';
import pay from './payment.jpeg'
import aff from './afford.jpg'
import grow from './growth.png'
import app from './app.png'
import Searching from './Searching';
import LuckyDrawForm from './LuckyDrawForm';


const Home = () => {
  const dispatch = useDispatch();

  const { loading, data, error } = useSelector((state) => state.images);

  useEffect(() => {
    dispatch(getImages());
  }, [dispatch]);



  const [formData, setFormData] = useState({
    name: '',
    phoneNo: '',
    city: ''
  });

  // Handle form data change
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // Handle form submit
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData); // You can replace this with actual form submission logic
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
            {data && data.length > 0 && data.map((site, index) => (
              site.images.map((image, imgIndex) => (
                <div key={`${index}-${imgIndex}`} className="carousel-slide">
                  <img
                    src={image}
                    alt={`Slide ${index}-${imgIndex}`}
                    style={{ width: '100%', height: '35vmax' }}
                  />
                  <div className="carousel-caption">
                    <h1>{site.name}</h1> {/* Access the name property of each site */}
                    <p>Exclusively by Nav Bharat Niwas  </p>
                    <button className="view-details-button">View Details</button>
                  </div>
                </div>
              ))
            ))}
          </Carousel>
        )}
      </div>

<Searching/>

<div className='overview'>
<div className='overviewText' style={{borderRight:'1.5px solid gray'}}>
<img  src={aff} />

</div>

<div className='overviewText'>

<img  src={pay} />
</div>

<div className='overviewText'style={{borderLeft:'1.5px solid gray'}}>
<img  src={app} />

</div>
<div className='overviewText'style={{borderLeft:'1.5px solid gray'}}>
<img  src={grow} />

</div>
</div>


<div className='how'>
      <h1>How to Apply</h1>
      <div className="video-container">
        <iframe
          width="100%"
          height="26vmax"
          src="https://www.youtube.com/embed/o03ceKisYVU"
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

        <button type="submit" className="submit-btn">Submit</button>
      </form>
    </div>


    </div>

<div className='ongoing' style={{margin:"1vmax 0vmax", width:'100%', height:'auto', display:'flex', flexDirection:'column', justifyContent:'center', alignItems:'center', padding:'1vmax'}}>
<h2 style={{fontSize:'2.3vmax' , textDecoration:'underline'}}>Ongoing projects</h2>
<ShowStatusSites status="ongoing"/>
</div>

<div className='ongoing' style={{margin:"1vmax 0vmax", width:'100%', height:'auto', display:'flex', flexDirection:'column', justifyContent:'center', alignItems:'center', padding:'1vmax'}}>
<h2 style={{fontSize:'2.3vmax', textDecoration:'underline'}}>Upcomming projects</h2>
<ShowStatusSites status="upcoming"/>
</div>

<div className='ongoing' style={{margin:"1vmax 0vmax", width:'100%', height:'auto', display:'flex', flexDirection:'column', justifyContent:'center', alignItems:'center', padding:'1vmax'}}>
<h2 style={{fontSize:'2.3vmax', textDecoration:'underline'}}>Delivered projects</h2>
<ShowStatusSites status="testimonial"/>
</div>


<div className="about-us-container">
  <div className="about-us-content">
    <h4 className="about-us-title">About Us</h4>
    <p className="about-us-description">
      Nav Bharat Niwas is a trusted real estate company based in Noida, Uttar Pradesh, located in Sector 63 near the metro station. We specialize in providing premium land sales to help you secure valuable investments. Our team is dedicated to offering transparent, reliable, and affordable real estate solutions. Whether you are looking for residential or commercial land, we offer properties with high growth potential. Join us at Nav Bharat Niwas and take the first step towards building a secure future with prime land investments.
    </p>

    <button className="contact-us-btn">Contact Us</button>
  </div>
</div>

<LuckyDrawForm/>
      
    </>
  );
};

export default Home;
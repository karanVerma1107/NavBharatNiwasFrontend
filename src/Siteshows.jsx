import React from 'react'
import './showSiteStatus.css'
import { Carousel } from 'react-responsive-carousel';
import ImageShowFull from './ImageShowFull';

import { Link } from 'react-router-dom';

const Siteshows = ({sites}) => {

    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString(undefined, options);
      };
    
    
       // Display a message if there are no sites available
       if (sites.length === 0) {
        return <p className="no-sites-message"> Welcome</p>;
      }
  return (
    <>
     
     <div className="amazon-style-container">
     {sites && sites.map((site) => (
       <div key={site._id} className="amazon-site-card">
         <div className="image-container">
           <Carousel showThumbs={false} infiniteLoop autoPlay interval={3000} showArrows={false} showStatus={false} showIndicators={false}>
             {site.images.map((image, index) => (
               <div key={index} onClick={() => openModal(image)}>
                 <img src={image} alt={`Site ${index}`} />
               </div>
             ))}
           </Carousel>
         </div>
         
         <div className="site-info">
           <h2 className="site-name">{site.name}</h2>
           
           <p className={`site-status ${site.formYes ? 'luckydraw' : 'premium'}`}>
             {site.formYes ? '🎉 Lucky Draw Available' : '🌟 Premium'}
           </p>
   
           <p className="site-unit">🏠 Units: {site.unit}</p>
           <p className="site-location">📍 {site.city}, {site.state}</p>
           <p className="site-posted">Posted on: {formatDate(site.createdAt)}</p>
   
           <Link to={`/site/${site._id}`} target="_blank" rel="noopener noreferrer">
             <button className="view-button">View Portfolio</button>
           </Link>
         </div>
       </div>
     ))}
   </div>
   
   
   
   
        
        
       </>
  )
}

export default Siteshows
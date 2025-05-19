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
    
    

  return (
    <>
     
        <div className="sites-grid-container">
             {sites.map((site) => (
               <div key={site._id} className="site-card">
                 <div className="image-container">
                   <Carousel
       showThumbs={false}
       infiniteLoop={false}
       autoPlay={false}
       interval={3000}
       showArrows={false}
       showStatus={false}
       showIndicators={false}
       selectedItem={0} // Always show first slide
       swipeable={false} // Optional: disables swipe
       emulateTouch={false} // Optional: disables touch gestures
     >
       {site.images.length > 0 && (
         <div onClick={() => openModal(site.images[0])}>
           <img src={site.images[0]} alt="Site 0" />
         </div>
       )}
     </Carousel>
     
                 </div>
     
                 <div className="site-content">
                   <div>
                     
                     <h3 className="site-name">{site.name}</h3>
                     
                     <div className="site-details">
                       <div className="detail-item">
                         🏠
                         <span> {site.unit} Units</span>
                       </div>
                       <div className="detail-item">
                         📍
                         <span>{site.city}, {site.state}</span>
                       </div>
                        <span className={`status-badge ${site.formYes ? 'luckydraw' : 'premium'}`}>
                       {site.formYes ? '🎉 Lucky Draw' : '🌟 Premium'}
                     </span>
                       <div className="detail-item">
                         📅 {formatDate(site.createdAt)}
                       </div>
                        
                     </div>
                    <Link 
       to={`/site/${site._id}`} 
       className="view-portfolio-btn"
       
     >
       View Portfolio
     </Link>
                   </div>
     
     
                 </div>
               </div>
             ))}
           </div>
     
   
   
        
        
       </>
  )
}

export default Siteshows
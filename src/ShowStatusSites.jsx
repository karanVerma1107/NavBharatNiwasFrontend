import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getOngoingSites, getUpcomingSites, getTestimonialSites } from './Actions/siteActions';

import 'react-responsive-carousel/lib/styles/carousel.min.css'; // Import carousel styles
import { Carousel } from 'react-responsive-carousel';
import ImageShowFull from './ImageShowFull';
import './showSiteStatus.css'
import { FaStarOfLife,  } from "react-icons/fa";
import { Link } from 'react-router-dom';
import { TiTick } from "react-icons/ti";
import { useNavigate } from 'react-router-dom';

const ShowStatusSites = ({ status }) => {
  const [page, setPage] = useState(1);
  const [modalImage, setModalImage] = useState(null);

  const dispatch = useDispatch();

  const { error, sites, loading, pages } = useSelector((state) => {
    switch (status) {
      case 'ongoing':
        return state.ongoing;
      case 'upcoming':
        return state.upcoming;
      case 'testimonial':
        return state.testimonial;
      default:
        return { loading: false, sites: [], error: null, pages: 1 };
    }
  });

  const navigate = useNavigate();


  useEffect(() => {
    switch (status) {
      case 'ongoing':
        dispatch(getOngoingSites(page));
        break;
      case 'upcoming':
        dispatch(getUpcomingSites(page));
        break;
      case 'testimonial':
        dispatch(getTestimonialSites(page));
        break;
      default:
        break;
    }
  }, [dispatch, status, page]);

 
  const openModal = (image) => {
    setModalImage(image);
  };

  const closeModal = () => {
    setModalImage(null);
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };


   // Display a message if there are no sites available
   if (sites.length === 0) {
    return <p className="no-sites-message">No sites available at the moment. Please check back later.</p>;
  }

  
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



<div className="pagination-container">
        <button
          onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
          disabled={page === 1}
          className="pagination-btn"
        >
          ⬅ Prev
        </button>
        {Array.from({ length: pages }, (_, i) => (
          <button
            key={i}
            onClick={() => setPage(i + 1)}
            className={`pagination-number ${page === i + 1 ? 'active' : ''}`}
          >
            {i + 1}
          </button>
        ))}
        <button
          onClick={() => setPage((prev) => Math.min(prev + 1, pages))}
          disabled={page === pages}
          className="pagination-btn"
        >
          Next ➡
        </button>
      </div>
     
      {modalImage && (
        <ImageShowFull image={modalImage} onClose={closeModal} />
      )}
    
    </>
  );
};

export default ShowStatusSites;
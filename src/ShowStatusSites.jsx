import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getOngoingSites, getUpcomingSites, getTestimonialSites } from './Actions/siteActions';
import './showStatusSites.css';
import 'react-responsive-carousel/lib/styles/carousel.min.css'; // Import carousel styles
import { Carousel } from 'react-responsive-carousel';
import ImageShowFull from './imageShowFull';
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
  
      <div className='parent' style={{borderBottom:'1px solid gray'}} >
        {sites.map((site) => (
          <div key={site._id} className="status-sites"   >
            <div className="site-card">
              <div className='imgSite'>
                <Carousel showThumbs={false} infiniteLoop={true} autoPlay={true} interval={2500} showArrows={true} showStatus={false} showIndicators={false} >
                  {site.images.map((image, index) => (
                    <div key={index} onClick={() => openModal(image)}>
                      <img src={image} alt={`Slide ${index}`}  style={{width: '39vmax', height: '28vmax'}}/>
                    </div>
                  ))}
                </Carousel>
              </div>
              <div className='details' >
                <h1>{site.name}</h1>
                <h3><FaStarOfLife style={{fontSize:'0.9vmax'}}/> {site.current}</h3>
                {site.formYes && <h3>  <TiTick/>  lucky draw</h3>}
                <button className="unique-button"><a href={`/site/${site._id}`} target="_blank" rel="noopener noreferrer" style={{ color: 'white' }}>
  View portfolio
</a>
</button>
                <p >Posted on: {formatDate(site.createdAt)}</p>
               
              </div>
            </div>
          
          </div>
             ))}


<div className="pagination" >
        <button onClick={() => setPage(page - 1)} disabled={page === 1}>
          Previous
        </button>
        {Array.from({ length: pages }, (_, index) => (
          <button key={index + 1} onClick={() => setPage(index + 1)} className={page === index + 1 ? 'active' : ''}>
            {index + 1}
          </button>
        ))}
        <button onClick={() => setPage(page + 1)} disabled={page === pages}>
          Next
        </button>
      </div>

      </div>
     
      {modalImage && (
        <ImageShowFull image={modalImage} onClose={closeModal} />
      )}
    
    </>
  );
};

export default ShowStatusSites;
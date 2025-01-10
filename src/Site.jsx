import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getSitebyID } from './Actions/siteActions';
import 'react-responsive-carousel/lib/styles/carousel.min.css'; // Import carousel styles
import { Carousel } from 'react-responsive-carousel';
import ImageShowFull from './imageShowFull';
import './siteStyles.css';  // We'll define styles in this file
import { TiTick } from "react-icons/ti";

const Site = () => {
  const { id } = useParams();
  const [modalImage, setModalImage] = useState(null);

  const { loading, error, site } = useSelector(state => state.getsite);
  const dispatch = useDispatch();

  const openModal = (image) => {
    setModalImage(image);
  };

  const closeModal = () => {
    setModalImage(null);
  };

  // Helper function to wrap text inside quotes with a <span> for bold styling
  const boldTextInsideQuotes = (text) => {
    const regex = /"([^"]*)"/g; // Regular expression to match text inside quotes
    const parts = [];
    let lastIndex = 0;

    // Replace all occurrences of quoted text with a <span> element
    text.replace(regex, (match, p1, offset) => {
      // Push text before the quoted portion
      if (offset > lastIndex) {
        parts.push(text.slice(lastIndex, offset));
      }
      // Push the quoted portion wrapped in <span> for bold styling
      parts.push(<span key={offset} className="bold-text">{p1}</span>);
      lastIndex = offset + match.length;
    });

    // Push any remaining text after the last quoted portion
    if (lastIndex < text.length) {
      parts.push(text.slice(lastIndex));
    }

    return parts; // Return an array of text and JSX elements
  };

  useEffect(() => {
    dispatch(getSitebyID(id));
  }, [dispatch, id]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  // Check if site is available before rendering the details
  if (!site) return <p>No site data available</p>;

  return (
    <>
      <div style={{ marginTop: '6.6vmax' }}>
        <h1 style={{ alignSelf: 'center', textAlign: 'center' }}>{site.name}</h1>
      </div>
      <div className="site-container">

        {/* Image Section */}
        <div className="site-image">
          <Carousel showThumbs={false} infiniteLoop={true} autoPlay={true} interval={2500} showArrows={true} showStatus={false} showIndicators={true}>
            {site.images.map((image, index) => (
              <div key={index} onClick={() => openModal(image)}>
                <img src={image} alt={`Slide ${index}`} style={{ width: '42vmax', height: '34vmax' }} />
              </div>
            ))}
          </Carousel>
        </div>

        {/* Details Section */}
        <div className="site-details">
          <p className="site-description" style={{ fontWeight: 'bolder' }}>{site.current}</p>
          {site.formYes && <p className="site-description"><TiTick /> lucky draw</p>}
          <p className="site-description">
            {boldTextInsideQuotes(site.description)} {/* Apply bold styling to text inside quotes */}
          </p>
        </div>

        {/* Modal for Image */}
        {modalImage && <ImageShowFull image={modalImage} onClose={closeModal} />}
      </div>
    </>
  );
};

export default Site;

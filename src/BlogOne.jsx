import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getBlogById } from './Actions/siteActions';
import { useParams } from 'react-router-dom';

const BlogOne = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { processing, entry, problem } = useSelector((state) => state.getblog);

  useEffect(() => {
    dispatch(getBlogById(id));
  }, [dispatch, id]);

   // Load Instagram embed script once
    useEffect(() => {
      const script = document.createElement('script');
      script.src = 'https://www.instagram.com/embed.js';
      script.async = true;
      document.body.appendChild(script);
    }, []);
  
    // Reprocess embeds when articles are loaded
    useEffect(() => {
      if (window.instgrm) {
        window.instgrm.Embeds.process();
      }
    }, [entry]);
  

  return (
    <div
      style={{
        maxWidth: '70vmax',
        margin: '7vmax auto',
        minHeight: '50vmax',
        padding: '2vmax',
        backgroundColor: '#fdfdfd',
        borderRadius: '1.5vmax',
        boxShadow: '0 0.6vmax 1.5vmax rgba(0,0,0,0.1)',
        fontFamily: 'Arial, sans-serif',
      }}
    >
      {processing ? (
        <p style={{ fontSize: '2vmax', textAlign: 'center' }}>⏳ Loading...</p>
      ) : problem ? (
        <p style={{ fontSize: '2vmax', color: 'red', textAlign: 'center' }}>⚠️ {problem}</p>
      ) : entry ? (
        <>
          <h1
            style={{
              fontSize: '3vmax',
              marginBottom: '1vmax',
              color: '#2c3e50',
              textAlign: 'center',
            }}
          >
            {entry.heading}
          </h1>

          
          {entry.instagramEmbedLink && (
            <div
              style={{
                margin: '2vmax auto',
                width: '100%',
                textAlign: 'center',
              }}
            >
              <blockquote
                className="instagram-media"
                data-instgrm-permalink={entry.instagramEmbedLink}
                data-instgrm-version="14"
                style={{
                  background: '#fff',
                  border: 0,
                  borderRadius: '1vmax',
                  margin: '1vmax auto',
                  width: '30vmax',
                  height: window.innerWidth <= 768 ? '56vmax' : '40vmax',
                  boxShadow: '0 0.4vmax 1vmax rgba(0,0,0,0.1)',
                }}
              />
            </div>
          )}

          <p
            style={{
              fontSize: '1.5vmax',
              lineHeight: '2.4vmax',
              whiteSpace: 'pre-wrap',
              color: '#444',
              textAlign:'left',
              marginBottom: '2vmax',
            }}
          >
            {entry.content}
          </p>

        </>
      ) : null}
    </div>
  );
};

export default BlogOne;

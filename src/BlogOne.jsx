import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getBlogById } from './Actions/siteActions';
import { useParams } from 'react-router-dom';


const styles = {
  container: {
    maxWidth: '69vmax',
    margin: '6vmax auto',
    padding: '2.5vmax',
    backgroundColor: '#ffffff',
    borderRadius: '1.2vmax',
    boxShadow: '0 0.6vmax 2vmax rgba(0,0,0,0.06)',
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    color: '#2e2e2e',
    lineHeight: '1.6',
    display: 'flex',
    flexDirection: 'column',
    gap: '3vmax',
  },
  loadingText: {
    fontSize: '2vmax',
    color: '#666',
    textAlign: 'center',
  },
  errorText: {
    fontSize: '2vmax',
    color: '#d9534f',
    textAlign: 'center',
  },
  heading: {
    fontSize: '3vmax',
    fontWeight: 700,
    color: '#1a1a1a',
    borderBottom: '0.3vmax solid #e0e0e0',
    paddingBottom: '1vmax',
    marginBottom: '1.5vmax',
  },
  block: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    gap: '1.5vmax',
    textAlign: 'left',
    alignItems: 'flex-start', // <- ensures child elements align to the left
    padding: '2vmax',
    borderRadius: '1vmax',
    backgroundColor: '#fafafa',
    boxShadow: '0 0.3vmax 1vmax rgba(0,0,0,0.04)',
  },
  image: {
    width: '100%',
    maxHeight: '40vmax',
    objectFit: 'cover',
    borderRadius: '0.8vmax',
    boxShadow: '0 0.4vmax 1.2vmax rgba(0,0,0,0.06)',
  },
  content: {
    fontSize: '1.4vmax',
    color: '#3b3b3b',
    
    textAlign: 'left',
  },
};

const BlogOne = () => {
  const dispatch = useDispatch();
  const { permalink } = useParams();
  const { processing, entry, problem } = useSelector((state) => state.getblog);

  useEffect(() => {
    dispatch(getBlogById(permalink));
  }, [dispatch, permalink]);

  const addAlignmentToParagraphs = (htmlContent) => {
    return htmlContent.replace(/<p>/g, '<p style="text-align: left;">');
  };

  return (
    <div
      style={{
        maxWidth: '70vmax',
        margin: '5vmax auto',
        display: 'flex',
        alignItems: 'flex-start',
        flexDirection: 'column',
        padding: '3vmax',
        backgroundColor: '#f8f9fa',
        borderRadius: '1.5vmax',
        boxShadow: '0 0.5vmax 1.5vmax rgba(0,0,0,0.08)',
        fontFamily: 'Segoe UI, sans-serif',
        textAlign: 'left',
      }}
    >
      {processing ? (
        <p style={{ fontSize: '1.8vmax', textAlign: 'center', color: '#555' }}>⏳ Loading...</p>
      ) : problem ? (
        <p style={{ fontSize: '1.8vmax', color: 'red', textAlign: 'center' }}>⚠️ {problem}</p>
      ) : entry ? (
        <>
          <h2
            style={{
              fontSize: '2.6vmax',
              marginBottom: '2vmax',
              color: '#222',
              borderBottom: '0.3vmax solid #ddd',
              paddingBottom: '1vmax',
            }}
          >
            {entry.heading}
          </h2>

          {entry.block?.map((item, index) => (
            <div
              key={index}
              style={{
                marginBottom: '4vmax',
                padding: '2vmax',
                backgroundColor: '#ffffff',
                borderRadius: '1.2vmax',
                boxShadow: '0 0.4vmax 1.2vmax rgba(0,0,0,0.05)',
                textAlign: 'left',
              }}
            >
              <img
                src={item.pic}
                alt={`block-img-${index}`}
                style={{
                  width: '100%',
                  borderRadius: '1vmax',
                  marginBottom: '2vmax',
                  objectFit: 'cover',
                  boxShadow: '0 0.3vmax 0.8vmax rgba(0,0,0,0.04)',
                }}
              />

              <div
                style={{
                  fontSize: '1.4vmax',
                  lineHeight: '2.4vmax',
                  color: '#333',
                }}
                dangerouslySetInnerHTML={{
                  __html: addAlignmentToParagraphs(item.content),
                }}
              />
            </div>
          ))}
        </>
      ) : null}
    </div>
  );
};

export default BlogOne;

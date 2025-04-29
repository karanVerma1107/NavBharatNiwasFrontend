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
  const { id } = useParams();
  const { processing, entry, problem } = useSelector((state) => state.getblog);

  useEffect(() => {
    dispatch(getBlogById(id));
  }, [dispatch, id]);

  return (
    <div style={styles.container}>
      {processing ? (
        <p style={styles.loadingText}>⏳ Loading...</p>
      ) : problem ? (
        <p style={styles.errorText}>⚠️ {problem}</p>
      ) : entry ? (
        <>
          <h2 style={styles.heading}>{entry.heading}</h2>
          {entry.block?.map((item, index) => (
            <div key={index} style={styles.block}>
              {item.pic && (
                <img
                  src={item.pic}
                  alt={`block-img-${index}`}
                  style={styles.image}
                />
              )}
              <div
                style={styles.content}
                dangerouslySetInnerHTML={{ __html: item.content }}
              />
            </div>
          ))}
        </>
      ) : null}
    </div>
  );
};

export default BlogOne;

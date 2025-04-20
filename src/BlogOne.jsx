import React, { useEffect } from 'react';
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

  return (
    <div
      style={{
        maxWidth: '70vmax',
        margin: '7vmax auto',
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
              marginBottom: '2vmax',
              color: '#2c3e50',
              textAlign: 'center',
              borderBottom: '0.4vmax solid #ccc',
              paddingBottom: '1vmax',
            }}
          >
            {entry.heading}
          </h1>
          {entry.block?.map((item, index) => (
  <div
    key={index}
    style={{
      margin: '3vmax 0',
      padding: '2vmax',
      backgroundColor: '#ffffff',
      borderRadius: '1.2vmax',
      boxShadow: '0 0.4vmax 1.2vmax rgba(0,0,0,0.08)',
    }}
  >
    <img
      src={item.pic}
      alt={`block-img-${index}`}
      style={{
        width: '100%',
        maxHeight: '56vmax',
        borderRadius: '1vmax',
        marginBottom: '1.5vmax',
        boxShadow: '0 0.4vmax 1vmax rgba(0,0,0,0.05)',
      }}
    />
    <div
      style={{
        fontSize: '1.6vmax',
        lineHeight: '2.5vmax',
        color: '#333',
        textAlign: 'left',
      }}
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

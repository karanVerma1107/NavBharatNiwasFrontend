import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUserFromToken } from './Actions/authActions';
import { addBlog, getBlogById, getAllBlogs } from './Actions/siteActions';
import { Link } from 'react-router-dom';

import './last.css'




const AllBlogs = () => {
  const [showPopup, setShowPopup] = useState(false);
  const dispatch = useDispatch();

  const { user } = useSelector(state => state.user);
  const { busy, mistake, article = [] } = useSelector(state => state.getallblog);

  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  

  useEffect(() => {
    dispatch(getUserFromToken());
    dispatch(getAllBlogs());
  }, [dispatch]);



  const [blocks, setBlocks] = useState([{ content: '', pic: '' }]); // Initial block structure

  

  const handleAddBlock = () => {
    setBlocks([...blocks, { content: '', pic: '' }]);
  };

  const handleRemoveBlock = (index) => {
    const updatedBlocks = blocks.filter((_, i) => i !== index);
    setBlocks(updatedBlocks);
  };

  const handleBlockChange = (e, index) => {
    const updatedBlocks = [...blocks];
    if (e.target.name === 'pic') {
      updatedBlocks[index].pic = e.target.files[0]; // Store actual File object
    } else {
      updatedBlocks[index][e.target.name] = e.target.value;
    }
    setBlocks(updatedBlocks);
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    const heading = e.target.heading.value;
  
    const blockData = blocks.map(block => ({
      content: block.content,
      pic: block.pic, // This is a File object or undefined
    }));
  
    dispatch(addBlog({ heading }, blockData));
    setShowPopup(false); // close popup after submit
  };




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
  }, [article]);

  const togglePopup = () => setShowPopup(!showPopup);



  return (
    <>
      <div
        style={{
          width: '100%',
          minHeight: '50vmax',
          display: 'flex',
          flexDirection: 'column',
          margin: '6vmax auto',
        }}
      >
        {busy ? (
          <p>Loading blogs...</p>
        ) : mistake ? (
          <p style={{ color: 'red' }}>Error loading blogs: {mistake}</p>
        ) : (
          article.map((blog, index) => (
            <div
              key={index}
              style={{
                width: '42vmax',
                backgroundColor: 'peachpuff',
                margin: '2vmax auto',
                borderRadius: '1vmax',
                boxShadow: '0 0.5vmax 1.5vmax rgba(0, 0, 0, 0.1)',
                padding: '2vmax',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '1vmax',
              }}
            >
              <h2 style={{ margin: 0, color: '#4e342e', fontSize: '1.7vmax' }}>
                {blog.heading}
              </h2>

              {blog.instagramEmbedLink && (
  <div style={{ margin: '1vmax auto', width: '100%', textAlign: 'center', alignSelf: 'center' }}>
    <blockquote
      className="instagram-media"
      data-instgrm-permalink={blog.instagramEmbedLink}
      data-instgrm-version="14"
      style={{
        background: '#FFF',
        border: 0,
        margin: '1vmax auto',
        width: '26vmax',
        height: window.innerWidth <= 768 ? '56vmax' : '40vmax', // Responsive height
      }}
    />
  </div>
)}

<Link
  to={`/blog/${blog._id}`}
  style={{
    display: 'inline-block',
    textDecoration: 'none',
    color: 'white',
    backgroundColor: '#4e342e',
    padding: '0.8vmax 2vmax',
    fontSize: '1.2vmax',
    borderRadius: '1vmax',
    marginTop: '1vmax',
    boxShadow: '0 0.3vmax 0.8vmax rgba(0, 0, 0, 0.2)',
    transition: 'background-color 0.3s',
  }}
  onMouseEnter={e => (e.target.style.backgroundColor = '#6d4c41')}
  onMouseLeave={e => (e.target.style.backgroundColor = '#4e342e')}
>
  📖 Read Full Blog
</Link>
              <p style={{ fontSize: '0.9vmax', color: 'gray' }}>
                Posted on:{' '}
                {new Date(
                  parseInt(blog.createdAt?.$date?.$numberLong || Date.now())
                ).toLocaleDateString()}
              </p>

              
            </div>
          ))
        )}
      </div>

      {/* Popup Modal */}
      {showPopup && (
        <div
          style={{
            position: 'fixed',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            backgroundColor: '#fff',
            width: '45vmax',
            height: '40vmax',  // Set a fixed height for the popup
            overflowY: 'auto', // Enables scrolling when content exceeds height
            padding: '2vmax',
            borderRadius: '1vmax',
            boxShadow: '0 0 1vmax rgba(0,0,0,0.2)',
            zIndex: 1000,
            textAlign: 'center',
          }}
        >
          <button
            onClick={togglePopup}
            style={{
              background: 'transparent',
              border: 'none',
              fontSize: '1.4vmax',
              position: 'absolute',
              top: '1vmax',
              right: '1vmax',
              cursor: 'pointer',
            }}
          >
            ❌
          </button>
          <p style={{ fontSize: '1.6vmax', marginBottom: '1vmax' }}>Post a Blog</p>

          <form className="popup-form" onSubmit={handleSubmit}>

        <input name="heading" placeholder="Heading" required />
        
        {blocks.map((block, index) => (
          <div key={index} style={{ marginBottom: '1vmax' }}>
            <textarea
              name="content"
              placeholder="Content"
              value={block.content}
              onChange={(e) => handleBlockChange(e, index)}
              required
            />
           
           <input
  type="file"
  name="pic"
  accept="image/*"
  onChange={(e) => handleBlockChange(e, index)}
/>

            <button type="button" onClick={() => handleRemoveBlock(index)}  style={{ marginTop: '0.5vmax', backgroundColor: '#ffccbc', color: '#4e342e', border: 'none', padding: '0.5vmax 1vmax', borderRadius: '1vmax', cursor: 'pointer' }}>
              Remove Block
            </button>
          </div>
        ))}

        <button type="button" onClick={handleAddBlock} style={{backgroundColor:'blueviolet'}}>
          Add Another Block
        </button>
        <button type="submit">Submit Blog</button>
      </form>
        </div>
      )}

      {/* Add Blog Button for Executives */}
      {user && user.role === 'executive' && (
        <button
          onClick={togglePopup}
          style={{
            position: 'fixed',
            bottom: '2vmax',
            right:'2vmax',
            transform: 'translateX(-50%)',
            fontSize: '1.6vmax',
            backgroundColor: '#ffccbc',
            color: '#4e342e',
            border: 'none',
            padding: '0.8vmax 2vmax',
            zIndex: 1000,
            borderRadius: '2vmax',
            cursor: 'pointer',
            boxShadow: '0 0.4vmax 1vmax rgba(0, 0, 0, 0.2)',
          }}
        >
          ⬆️ Add Blog
        </button>
      )}
    </>
  );
};

export default AllBlogs;
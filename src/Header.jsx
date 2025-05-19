import React, { useEffect, useState } from 'react'
import './header.css'
import pic from './logoimg - Copy.jpg'
import { FaBars, FaUser, FaTimes } from 'react-icons/fa' // Importing hamburger and cross icons from react-icons
import Auth from './Auth'
import { getUserFromToken } from './Actions/authActions';
import Loading from './Loading'
import UserShow from './userShow'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom' // Importing Link for navigation


const Header = () => {
  const [showLogin, setShowLogin] = useState(false);
  const [showUserShow, setShowUserShow] = useState(false); // State to toggle UserShow
  const [isMenuOpen, setIsMenuOpen] = useState(false); // State for hamburger menu toggle

  const { loading, user, auth, error } = useSelector(state => state.user);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUserFromToken());
  }, [dispatch]);

  const openLogin = () => {
    setShowLogin(!showLogin);
  }

  const closeLogin = () => {
    setShowLogin(false);
    setTimeout(() => {
      window.location.reload();
      setTimeout(() => {
        window.location.reload();
      }, 1000); // Refresh the page again after 1 second
    }, 2000); // Refresh the page after 2 seconds
  }

  const toggleUserShow = () => {
    setShowUserShow(!showUserShow);
  }

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen); // Toggle the hamburger menu open/close state
  }


  const isMobile = window.innerWidth < 600;
const spanStyle = {
  margin: '0 auto',
  fontSize: isMobile ? '1vmax' : '1.2vmax',
  cursor: 'pointer',
};

const handleScroll = () => {
    const section = document.getElementById('about-section');
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <div className="header">
        <div className="logo" >
          <img src={pic} alt="Logo" className="logo-img" style={{ height: '5.7vmax', width: '16vmax' , marginTop: '6.8vmax'}} />
        </div>
          <div style={{display:'flex', flexDirection:'row', width:'49vmax', justifyContent:'center',  alignItems:'center'}}>
            <span style={spanStyle} onClick={handleScroll}>About Us</span>
             <span style={spanStyle}><a href='/allblogs' style={{textDecoration:'none', color:'black'}}>Blogs</a></span>
              <span style={spanStyle}><a href="https://wa.me/919971488477" target="_blank" rel="noopener noreferrer" style={{textDecoration:'none', color:'black'}}>
  Contact Us
</a></span>
          </div>
        <div className="rightSide">
          <div className="hamburger-container" onClick={toggleMenu}>
            {isMenuOpen ? (
              <FaTimes className="hamburger-icon" style={{ fontSize: '2vmax', cursor: 'pointer' }} />
            ) : (
              <FaBars className="hamburger-icon" style={{ fontSize: '2vmax', cursor: 'pointer' }} />
            )}
          </div>
          <div className="vertical-line"></div>
          <div className="login-container">
            {auth ? (
              <FaUser className="userr-icon" style={{ fontSize: '1.9vmax', cursor: 'pointer' , color:'#2e3c52'}} onClick={toggleUserShow} />
            ) : (
              <button className="login-button" onClick={openLogin}>Login</button>
            )}
          </div>
        </div>
      </div>

      {showLogin && <Auth closeLogin={closeLogin} />}
      {showUserShow && <UserShow toggleUserShow={toggleUserShow} />} {/* Conditionally render UserShow */}

      {/* Dropdown Menu */}
      {isMenuOpen && (
        <div className="dropdown-menu">
          <ul>
            <li>
              <Link to="/" onClick={toggleMenu}>Home</Link> {/* Adding Home link in the dropdown */}
            </li>
            {/* Add other menu items here as needed */}
          </ul>
        </div>
      )}
    </>
  )
}

export default Header;

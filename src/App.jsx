import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Home';
import Header from './Header';
import './App.css';
import Addsite from './Addsite';
import Callnow from './Callnow';
import Footer from './Footer';
import FormRelated from './FormRelated';
import Site from './Site';
import Form from './Form';
import Result from './Result';
import T from './T';

function App() {
  const [cookiesAllowed, setCookiesAllowed] = useState(false);
  const [showCookieBanner, setShowCookieBanner] = useState(true);

  useEffect(() => {
    // Check if the user has already consented
    const consent = localStorage.getItem('cookiesAllowed');
    if (consent === 'true') {
      setCookiesAllowed(true);
      setShowCookieBanner(false); // Hide banner if consented
    }
  }, []);

  const handleAllowCookies = () => {
    // Save user preference and hide the consent banner
    localStorage.setItem('cookiesAllowed', 'true');
    setCookiesAllowed(true);
    setShowCookieBanner(false); // Hide the banner
  };

  const handleCloseBanner = () => {
    // Hide the banner without saving preference
    setShowCookieBanner(false);
  };

  return (
    <>
      <Router>
        <Header />
        <Callnow />

        {/* Cookie Consent Banner */}
        {showCookieBanner && (
          <div id="cookieConsent" className="cookie-consent">
            <p>
              This website uses cookies to improve your experience.
              <button onClick={handleAllowCookies}>Allow Cookies</button>
              <button onClick={handleCloseBanner}>Close</button>
            </p>
          </div>
        )}

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path='/ADD-SITE' element={<Addsite />} />
          <Route path='/form-related' element={<FormRelated />} />
          <Route path='/site/:id' element={<Site />} />
          <Route path='/draw/:id' element={<Form />} />
          <Route path='/result/:formId' element={<Result />} />
          <Route path='/T' element={<T />} />
        </Routes>

        <Footer />
      </Router>
    </>
  );
}

export default App;
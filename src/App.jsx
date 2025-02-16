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
import CompanyFormFull from './CompanyFormFull';
import AdvancedStuff from './AdvancedStuff';
import ResIsallow from './ResIsallow';
import WelcomeLetter from './WelcomeLetter';
import WelcomeCletter from './WelcomeCletter';
import CompanyAllotment from './CompanyAllotment';

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

    // Check if cookies are blocked in the browser (using test cookie)
    if (document.cookie.indexOf('testCookie') === -1) {
      // Cookies are likely blocked
      setShowCookieBanner(true); // Show consent banner if cookies are blocked
    }
  }, []);

  const handleAllowCookies = () => {
    // Set a test cookie to confirm cookies can be set
    document.cookie = "testCookie=test; path=/; SameSite=None; Secure; HttpOnly;";
    
    // Save user preference and hide the consent banner
    localStorage.setItem('cookiesAllowed', 'true');
    setCookiesAllowed(true);
    setShowCookieBanner(false); // Hide the banner
    alert('Cookies have been allowed for login purposes.');
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

      

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path='/ADD-SITE' element={<Addsite />} />
          <Route path='/form-related' element={<FormRelated />} />
          <Route path='/afterResult' element={<AdvancedStuff />} />
          <Route path='/site/:id' element={<Site />} />
          <Route path='/draw/:id' element={<Form />} />
          <Route path='/Cdraw/:id' element={<CompanyFormFull />} />
          <Route path='/result/:formId' element={<Result />} />
          <Route path='/WelcomeForm/:id' element={<WelcomeLetter />} />
          <Route path='/WelcomeCForm/:id' element={<WelcomeCletter />} />
          <Route path='/AllotmentCForm/:id' element={<CompanyAllotment />} />
          <Route path='/getar/:id' element={<ResIsallow />} />
          <Route path='/T' element={<T />} />
        </Routes>

        <Footer />
      </Router>
    </>
  );
}

export default App;
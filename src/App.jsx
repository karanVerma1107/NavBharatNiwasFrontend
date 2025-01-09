import React from 'react'
import {BrowserRouter as Router,Route,Routes} from 'react-router-dom'
import Home from './Home'
import Header from './Header'
import './App.css'
import Addsite from './Addsite'
import Callnow from './Callnow'
import Footer from './Footer'
import FormRelated from './FormRelated'
import Site from './Site'
import Form from './Form'
import Result from './Result'

function App() {
 

  return (
    <>
      <Router>
<Header/>
<Callnow/>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path='/ADD-SITE' element={<Addsite/>}/>
          <Route path='/form-related' element={<FormRelated/>}/>
          <Route path='/site/:id' element={<Site/>}/>
          <Route path='/draw/:id' element={<Form/>}/>
          <Route path='/result/:formId' element={<Result/>}/>
         
        </Routes>
        <Footer/>
      </Router> 
    </>
  )
}

export default App

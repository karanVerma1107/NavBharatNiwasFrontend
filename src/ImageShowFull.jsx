import React from 'react'
import './imgs.css'

const ImageShowFull = ({ image, onClose }) => {
    if (!image) return null;
  return (
    <div className="modal" onClick={onClose}>
    <span className="close">&times;</span>
    <img className="modal-content" src={image} alt="Modal" />
  </div>
  )
}

export default ImageShowFull
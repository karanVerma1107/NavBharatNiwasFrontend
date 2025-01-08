import React from 'react';
import './ImageModal.css';

const ImageModal = ({ image, onClose }) => {
  if (!image) return null;

  return (
    <div className="modal" onClick={onClose}>
      <span className="close">&times;</span>
      <img className="modal-content" src={URL.createObjectURL(image)} alt="Modal" />
    </div>
  );
};

export default ImageModal;
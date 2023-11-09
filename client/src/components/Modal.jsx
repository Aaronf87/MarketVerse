import React from "react";
import "../styles/Modal.css"; // Assume you will create a corresponding CSS file for styling

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        {children}
        <button className="modal-close-button" onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default Modal;

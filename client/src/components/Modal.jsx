// Modal.jsx
import React from "react";
import "../styles/Modal.css"; // Ensure this is the correct path to your CSS file

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        {children}
        {/* The close button is removed from here */}
      </div>
    </div>
  );
};

export default Modal;



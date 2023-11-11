const Modal = ({ isModalOpen, handleToggleModal, children }) => {
  if (!isModalOpen) return null;

  return (
    <div className="modal-overlay" onClick={handleToggleModal}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        {children}
      </div>
    </div>
  );
};

export default Modal;

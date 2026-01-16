import React from "react";

const Modal = ({ isOpen, onClose, children }) => {
  return isOpen ? (
    <div>
      <div className="overlay-style" onClick={onClose}>
        <div className="modal-style">{children}</div>
      </div>
    </div>
  ) : null;
};

export default Modal;

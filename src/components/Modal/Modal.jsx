import React, { useEffect } from 'react';
import { Overlay, ModalImg } from './Modal.styled';

export const Modal = ({ closeModal, modalImage }) => {
  useEffect(() => {
    const handleKeyDown = event => {
      if (event.code === 'Escape') {
        closeModal();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [closeModal]);

  const handleBackdropClick = evt => {
    if (evt.currentTarget === evt.target) {
      closeModal();
    }
  };

  return (
    <Overlay onClick={handleBackdropClick}>
      <ModalImg>
        <img src={modalImage} alt="modalImage" />
      </ModalImg>
    </Overlay>
  );
};

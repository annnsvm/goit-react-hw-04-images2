import React, { useEffect } from 'react';
import css from './modal.module.css';
import PropTypes from 'prop-types';

export function Modal({ largeImageURL, onModalClose }) {
  useEffect(() => {
    window.addEventListener('keydown', onKeyDown);

    return () => {
      window.removeEventListener('keydown', onKeyDown);
    };
  });

  const onOverlayClick = e => {
    if (e.currentTarget === e.target) {
      onModalClose();
    }
  };
  const onKeyDown = e => {
    if (e.keyCode === 27) {
      onModalClose();
    }
  };

  return (
    <div className={css.overlay} onClick={onOverlayClick}>
      <div className={css.modal}>
        <img src={largeImageURL} alt="" />
      </div>
    </div>
  );
}

export default Modal;

Modal.propTypes = {
  largeImageURL: PropTypes.string.isRequired,
  onModalClose: PropTypes.func.isRequired,
};

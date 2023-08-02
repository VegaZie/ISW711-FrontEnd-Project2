import React from 'react';
import PropTypes from 'prop-types';
import './successMessage.scss';

const SuccessMessage = ({ message, onAccept }) => {
  return (
    <div className="success-message-overlay">
      <div className="success-message">
        <p className="message">{message}</p>
        <button className="accept-button" onClick={onAccept}>
          Aceptar
        </button>
      </div>
    </div>
  );
};

SuccessMessage.propTypes = {
  message: PropTypes.string.isRequired,
  onAccept: PropTypes.func.isRequired,
};

export default SuccessMessage;

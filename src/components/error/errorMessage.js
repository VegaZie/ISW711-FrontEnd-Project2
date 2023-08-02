import React from 'react';
import PropTypes from 'prop-types';
import './errorMessage.scss';

const ErrorMessage = ({ message, onAccept }) => {
  return (
    <div className="error-message-overlay">
      <div className="error-message">
        <p className="message">{message}</p>
        <button className="accept-button" onClick={onAccept}>
          Aceptar
        </button>
      </div>
    </div>
  );
};

ErrorMessage.propTypes = {
  message: PropTypes.string.isRequired,
  onAccept: PropTypes.func.isRequired,
};

export default ErrorMessage;
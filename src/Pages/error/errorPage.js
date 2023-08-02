import React from 'react';
import ErrorMessage from '../../components/error/errorMessage';
import './errorPage.scss';

const ErrorPage = () => {
  return (
    <div className="error-page">
      <ErrorMessage
        title="Error 404"
        message="Oops! The page you're looking for doesn't exist."
      />
    </div>
  );
};

export default ErrorPage;

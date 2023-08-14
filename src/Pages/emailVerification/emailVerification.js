import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";

import SuccessMessage from "../../components/successMessage/successMessage";
import ErrorMessage from "../../components/error/errorMessage";

const EmailVerificationPage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Manejo de mensajes de errores
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  // Manejo de mensaje de éxito
  const [success, setSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    console.log(location);
    const token = new URLSearchParams(location.search).get("token");
    console.log(token);
    if (token) {
      axios
        .post(process.env.REACT_APP_EMAIL_VERIFICATION + `?token=${token}`)
        .then((response) => {
          if (response.status === 200) {
            setSuccessMessage(response.data.message);
            setSuccess(true);
          } else {
            setErrorMessage(response.data.error);
            setError(true);
          }
        })
        .catch((error) => {
          console.error("Email verification error:", error);
          setErrorMessage("Error en la verificación de correo electrónico. ");
          setError(true);
        });
    }
  }, [location.search]);

  const handleAcceptError = () => {
    setError(false);
  };

  const handleAcceptSuccess = () => {
    setSuccess(false);
    navigate("/");
  };

  return (
    <div>
      {success && (
        <SuccessMessage
          message={successMessage}
          onAccept={handleAcceptSuccess}
        />
      )}
      {error && (
        <ErrorMessage message={errorMessage} onAccept={handleAcceptError} />
      )}
    </div>
  );
};

export default EmailVerificationPage;

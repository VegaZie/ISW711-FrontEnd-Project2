import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import Button from "../../components/button/button";
import ErrorMessage from "../../components/error/errorMessage";
import "./twoStepVerificationPage.scss";

const TwoStepVerificationPage = () => {
  const [otp, setOtp] = useState("");
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

  const token = sessionStorage.getItem("token");

  const handleVerifyOtp = () => {
    axios
      .post(
        process.env.REACT_APP_TWO_STEP_VERIFICATION,
        { otp: otp },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        // Verificación exitosa
        navigate("/home");
      })
      .catch((error) => {
        console.error(error);
        setErrorMessage("La verificación del OTP ha fallado. " + error);
        setError(true);
      });
  };

  const handleAcceptError = () => {
    setError(false);
  };

  return (
    <div className="otp-verification-page">
      <div className="otp-container">
        <h2>Verificación de OTP</h2>
        <label>Por favor, ingresa el OTP que recibiste vía sms:</label>
        <input
          type="text"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
        />
        <Button onClick={handleVerifyOtp}>Verificar OTP</Button>
        {error && (
          <ErrorMessage message={errorMessage} onAccept={handleAcceptError} />
        )}
      </div>
    </div>
  );
};

export default TwoStepVerificationPage;

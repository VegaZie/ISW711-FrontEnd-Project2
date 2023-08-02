import React, { useState } from "react";
import axios from "axios";

import FormInput from "../../components/formInput/formInput";
import Button from "../../components/button/button";
import ErrorMessage from "../../components/error/errorMessage";
import SuccessMessage from "../../components/successMessage/successMessage";
import "./registrationPopup.scss";

const RegistrationPopup = ({ onClose, onSucess }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [success, setSuccess] = useState(false);

  const handleRegister = (event) => {
    event.preventDefault();

    // Validar que los campos no estén vacíos
    if (!name || !email || !password || !confirmPassword) {
      setErrorMessage("Por favor, complete todos los campos.");
      setError(true);
      return;
    }

    // Validar que las contraseñas coincidan
    if (password !== confirmPassword) {
      setErrorMessage("Las contraseñas no coinciden.");
      setError(true);
      return;
    }

    const data = {
      name,
      email,
      password,
      role: "user",
      verified: false,
    };

    axios
      .post(process.env.REACT_APP_USER, data)
      .then((response) => {
        setSuccess(true);
      })
      .catch((errorM) => {
        console.log(errorM);
        setErrorMessage("Registro de usuario fallido.");
        setError(true);
      });
  };

  const handleAcceptError = () => {
    setError(false);
  };

  const handleAcceptSuccess = () => {
    setSuccess(false);
    onSucess();
    onClose(); 
  };

  const handleCancel = () => {
    onClose();
  };

  return (
    <div className="registration-popup">
      <div className="registration-container">
        <h2>AI Promts Register</h2>
        <form>
          <FormInput
            type="name"
            label="Nombre"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <FormInput
            type="email"
            label="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <FormInput
            type="password"
            label="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <FormInput
            type="password"
            label="Confirmar contraseña"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
          <Button onClick={handleRegister}>Registrarse</Button>
          <Button onClick={handleCancel}>Cancelar</Button>
        </form>
        {success && (
          <SuccessMessage
            message={"Registro de usuario exitoso"}
            onAccept={handleAcceptSuccess}
          />
        )}
        {error && (
          <ErrorMessage
            message={errorMessage}
            onAccept={handleAcceptError}
          />
        )}
      </div>
    </div>
  );
};

export default RegistrationPopup;
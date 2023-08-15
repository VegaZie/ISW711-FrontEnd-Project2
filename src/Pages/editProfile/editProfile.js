import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import FormInput from "../../components/formInput/formInput";
import Button from "../../components/button/button";
import ErrorMessage from "../../components/error/errorMessage";
import SuccessMessage from "../../components/successMessage/successMessage";
import "./editProfilePage.scss";

const EditProfilePage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isTwoStepEnabled, setIsTwoStepEnabled] = useState(false);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [success, setSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const navigate = useNavigate();

  const token = sessionStorage.getItem("token");
  const userID = sessionStorage.getItem("id");

  useEffect(() => {
    axios
      .get(process.env.REACT_APP_USER + `?_id=${userID}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(function (response) {
        setName(response.data.name);
        setEmail(response.data.email);
        setPhoneNumber(response.data.phoneNumber);
        setIsTwoStepEnabled(response.data.twoStepVerification);
      })
      .catch(function (error) {
        setErrorMessage("Algo ha salido mal: " + error);
        setError(true);
      });
  }, [userID, token]);

  const handleUpdateProfile = () => {
    let data = {};

    if (password.length > 0 || confirmPassword.length > 0) {
      // Validar que las contraseñas coincidan
      if (password !== confirmPassword) {
        setErrorMessage("Las contraseñas no coinciden.");
        setError(true);
        return;
      }
      data = {
        name: name,
        email: email,
        twoStepVerification: isTwoStepEnabled,
        password: password,
      };
    } else {
      data = {
        name: name,
        email: email,
        twoStepVerification: isTwoStepEnabled,
      };
    }

    // Crear el objeto de datos para la actualización del perfil

    // Realizar la solicitud de actualización
    axios
      .patch(process.env.REACT_APP_USER + `?id=${userID}`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        sessionStorage.setItem("name", data.name);
        setSuccess(true);
        setSuccessMessage("Perfil actualizado exitosamente.");
      })
      .catch((error) => {
        console.error(error);
        setErrorMessage("Error al actualizar el perfil. " + error);
        setError(true);
      });
  };

  const handleAcceptError = () => {
    setError(false);
  };

  const handleAcceptSuccess = () => {
    setSuccess(false);
    navigate("/home");
  };

  const handleCancelEdit = () => {
    navigate("/home");
  };

  return (
    <div className="edit-profile-page">
      <div className="edit-profile-container">
        <h2>Editar Perfil</h2>
        <div className="div">
          <FormInput
            type="text"
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
            type="tel"
            label="Número de telefono"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
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
          <label className="checkbox-label">
            <input
              type="checkbox"
              checked={isTwoStepEnabled}
              onChange={() => setIsTwoStepEnabled(!isTwoStepEnabled)}
            />
            {isTwoStepEnabled
              ? "Verificación en dos pasos activada"
              : "Verificación en dos pasos desactivada"}
          </label>
          <div className="buttons-container">
            <Button onClick={handleUpdateProfile}>Actualizar Perfil</Button>
          </div>
          <div className="buttons-container">
            <Button onClick={handleCancelEdit}>
              Cancelar edición de perfil
            </Button>
          </div>
        </div>
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
    </div>
  );
};

export default EditProfilePage;

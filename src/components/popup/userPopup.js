import React, { useState } from "react";
import axios from "axios";

import ErrorMessage from "../../components/error/errorMessage";
import SuccessMessage from "../../components/successMessage/successMessage";
import Button from "../button/button";

import "./popup.scss";

const UserEditPopup = ({ data, onClose, token, onSucess }) => {
  const userID = data._id;
  const [editedName, setEditedName] = useState(data.name);
  const [editedEmail, setEditedEmail] = useState(data.email);
  const [editedVerified, setEditedVerified] = useState(data.verified);

  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [success, setSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const handleEdit = () => {
    const data = {
      name: editedName,
      email: editedEmail,
      verified: editedVerified,
    };

    axios
      .patch(process.env.REACT_APP_USER + `?id=${userID}`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setSuccess(true);
        setSuccessMessage("Actualización de usuario exitosa");
      })
      .catch((error) => {
        console.log(error);
        setErrorMessage("Actualización del promt fallido. " + error);
        setError(true);
      });
  };

  const handleDelete = () => {
    axios
      .delete(process.env.REACT_APP_USER + `?id=${userID}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setSuccess(true);
        setSuccessMessage("Eliminación de usuario exitosa");
      })
      .catch((errorM) => {
        console.log(errorM);
        setErrorMessage("Eliminación del promt fallida.");
        setError(true);
      });
  };

  const handleCancel = () => {
    onClose();
  };

  const handleAcceptSuccess = () => {
    setSuccess(false);
    onSucess();
    onClose();
  };

  return (
    <div className="popup">
      <div className="popup__content">
        <h2>Editar usuario</h2>
        <label>Nombre</label>
        <input
          type="text"
          value={editedName}
          onChange={(e) => setEditedName(e.target.value)}
        />
        <label>Email</label>
        <input
          type="email"
          value={editedEmail}
          onChange={(e) => setEditedEmail(e.target.value)}
        />
        <label>Usuario</label>
        <select
          value={editedVerified}
          onChange={(e) => setEditedVerified(e.target.value)}
        >
          <option value={true}>Verificado</option>
          <option value={false}>No verificado</option>
        </select>
        <div className="popup__buttons">
          <Button onClick={handleEdit}>Editar</Button>
          <Button onClick={handleDelete}>Eliminar</Button>
          <Button onClick={handleCancel}>Salir</Button>
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
  );
};

export default UserEditPopup;

import React, { useState } from "react";
import axios from "axios";

import { TagsInput } from "react-tag-input-component";
import Button from "../button/button";
import ErrorMessage from "../../components/error/errorMessage";
import SuccessMessage from "../../components/successMessage/successMessage";

import "./popup.scss";
import "./tags.css";

const PromtCompletionsPopup = ({ data, onClose, token, onSucess }) => {
  const promtID = data._id;
  const [editedName, setEditedName] = useState(data.name);
  const [editedTags, setEditedTags] = useState(data.tags);
  const [editedPromt, setEditedPromt] = useState(data.promt);
  const [editedTemperature, setEditedTemperature] = useState(data.temperature);
  const [editedResponse, setEditedResponse] = useState(data.response);

  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [success, setSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const handleEdit = () => {
    const data = {
      name: editedName,
      promt: editedPromt,
      temperature: editedTemperature,
      tags: editedTags,
      response: editedResponse,
    };

    axios
      .patch(process.env.REACT_APP_PROMTS + `?id=${promtID}`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setSuccess(true);
        setSuccessMessage("Actualización de promt exitosa");
      })
      .catch((error) => {
        console.log(error);
        setErrorMessage("Actualización del promt fallido. " + error);
        setError(true);
      });
  };

  const handleDelete = () => {
    axios
      .delete(process.env.REACT_APP_PROMTS + `?id=${promtID}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setSuccess(true);
        setSuccessMessage("Eliminación del promt exitosa");
        onClose();
      })
      .catch((error) => {
        console.log(error);
        setErrorMessage("Eliminación del promt fallida. ");
        setError(true);
      });
  };

  const handleAcceptSuccess = () => {
    setSuccess(false);
    onSucess();
    onClose();
  };

  const handleCancel = () => {
    onClose();
  };

  const handleAcceptError = () => {
    setError(false);
  };

  const executePromt = () => {
    const data = {
      model: "text-davinci-003",
      promt: editedPromt,
      temperature: editedTemperature,
    };

    axios
      .post(process.env.REACT_APP_OPEN_COMPLETIONS, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setEditedResponse(response.data.choices[0].text);
      })
      .catch((errorM) => {
        console.log(errorM);
        setErrorMessage("Error al ejecutar el promt");
        setError(true);
      });
  };

  return (
    <div className="popup">
      <div className="popup__content">
        <h2>Correr Promt de Completions</h2>
        <label>Nombre</label>
        <input
          type="text"
          value={editedName}
          onChange={(e) => setEditedName(e.target.value)}
        />
        <label>Promt</label>
        <input
          type="text"
          value={editedPromt}
          onChange={(e) => setEditedPromt(e.target.value)}
        />
        <label>Temperature</label>
        <input
          type="number"
          step="0.1"
          min="0.0"
          max="2.0"
          onChange={(e) => setEditedTemperature(e.target.value)}
          value={editedTemperature}
        />
        <label>Tags</label>
        <TagsInput
          value={editedTags}
          onChange={setEditedTags}
          name="tags"
          placeHolder="agrega tags"
        />
        <label>Respuesta</label>
        <div className="popup__buttons">
          <Button onClick={executePromt}>Correr promt</Button>
        </div>
        <textarea value={editedResponse} readOnly />
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

export default PromtCompletionsPopup;

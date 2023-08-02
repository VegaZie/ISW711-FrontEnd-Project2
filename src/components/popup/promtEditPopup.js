import React, { useState } from "react";
import axios from "axios";

import { TagsInput } from "react-tag-input-component";
import Button from "../button/button";
import ErrorMessage from "../../components/error/errorMessage";
import SuccessMessage from "../../components/successMessage/successMessage";

import "./popup.scss";
import "./tags.css";

const PromtEditPopup = ({ data, onClose, onSucess, token }) => {
  const promtID = data._id;
  console.log(data._id);
  const [editedName, setEditedName] = useState(data.name);
  const [editedInstructions, setEditedInstructions] = useState(
    data.instruction
  );
  const [editedInput, setEditedInput] = useState(data.input);
  const [editedTags, setEditedTags] = useState(data.tags);
  const [editedResponse, setEditedResponse] = useState(data.response);

  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [success, setSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const handleEdit = () => {
    const data = {
      name: editedName,
      input: editedInput,
      instruction: editedInstructions,
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
    const id = data._id;
    axios
      .delete(process.env.REACT_APP_PROMTS + `?id=${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setSuccess(true);
        setSuccessMessage("Eliminación del promt exitosa");
      })
      .catch((errorM) => {
        console.log(errorM);
        setErrorMessage("Eliminación del promt fallida.");
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
      model: "text-davinci-edit-001",
      input: editedInput,
      instruction: editedInstructions,
    };

    axios
      .post(process.env.REACT_APP_OPEN_EDIT, data, {
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
        <h2>Editar Promt</h2>
        <label>Nombre</label>
        <input
          type="text"
          value={editedName}
          onChange={(e) => setEditedName(e.target.value)}
        />
        <label>Entrada</label>
        <input
          type="text"
          value={editedInput}
          onChange={(e) => setEditedInput(e.target.value)}
        />
        <label>Instrucción</label>
        <input
          type="text"
          value={editedInstructions}
          onChange={(e) => setEditedInstructions(e.target.value)}
        />
        <div>
          <label>Tags</label>
          <TagsInput
            value={editedTags}
            onChange={setEditedTags}
            name="tags"
            placeHolder="agrega tags"
          />
        </div>
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

export default PromtEditPopup;

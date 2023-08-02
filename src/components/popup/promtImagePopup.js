import React, { useState } from "react";
import axios from "axios";

import { TagsInput } from "react-tag-input-component";
import Button from "../button/button";
import ErrorMessage from "../../components/error/errorMessage";
import SuccessMessage from "../../components/successMessage/successMessage";

import "./popup.scss";
import "./tags.css";

const PromtImagePopup = ({ data, onSucess, onClose, token }) => {
  const promtID = data._id;
  const [editedName, setEditedName] = useState(data.name);
  const [editedPromt, setEditedPromt] = useState(data.promt);
  const [editedImageType, setEditedImageType] = useState(data.size);
  const [editedImageCount, setEditedImageCount] = useState(data.quantity);
  const [editedTags, setEditedTags] = useState(data.tags);
  const [editedResponse, setEditedResponse] = useState(data.imageresponse);

  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [success, setSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const handleEdit = () => {
    const data = {
      name: editedName,
      promt: editedPromt,
      quantity: editedImageCount,
      size: editedImageType,
      tags: editedTags,
      imageresponse: editedResponse,
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
      prompt: editedPromt,
      quantity: parseInt(editedImageCount),
      size: editedImageType,
    };
    console.log(typeof editedPromt);

    axios
      .post(process.env.REACT_APP_OPEN_IMAGES, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log(response.data.data);
        setEditedResponse(response.data.data);
      })
      .catch((error) => {
        setErrorMessage("Error al ejecutar el promt");
        setError(true);
      });
  };

  return (
    <div className="popup">
      <div className="popup__content">
        <h2>Correr Promt de imagenes</h2>
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
        <label>Tamaño</label>
        <select
          value={editedImageType}
          onChange={(e) => setEditedImageType(e.target.value)}
        >
          <option value="256x256">256x256</option>
          <option value="512x512">512x512</option>
          <option value="1024x1024">1024x1024</option>
        </select>
        <label>Numero de imagenes</label>
        <input
          type="number"
          min="1"
          max="10"
          onChange={(e) => setEditedImageCount(e.target.value)}
          value={editedImageCount}
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
        <div className="scroll-container">
          {editedResponse && editedResponse.length > 0 ? (
            editedResponse.map((item, index) => (
              <img key={index} src={item.url} />
            ))
          ) : (
            <label>No hay imágenes generadas</label>
          )}
        </div>
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

export default PromtImagePopup;
